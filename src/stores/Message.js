import { defineStore } from 'pinia'
import { ref } from 'vue'
import { startChat } from '@/api/StartChat'

export const useMessageStore = defineStore('messageStore', () => {
  const message = ref([])
  const tempString = ref('')
  console.log('store = ', message.value)
  async function messageProcessing() {
    try {
      const response = await startChat(message.value)
      //处理返回的数据
      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let done = false
      // Add a placeholder for the streaming message
      message.value.push({
        role: 'assistant',
        content: '',
        content_type: 'text',
      })
      while (!done) {
        const { value, done: readerDone } = await reader.read()
        done = readerDone
        const chunk = decoder.decode(value, { stream: !done })
        // console.log('chunk = ', chunk)
        const events = chunk.split('\n\n').filter(Boolean)
        events.forEach((eventStr) => {
          const lines = eventStr.split('\n')
          const eventLine = lines.find((line) => line.startsWith('event:'))
          // console.log('eventLine = ', eventLine)
          const dataLine = lines.find((line) => line.startsWith('data:'))
          // console.log('dataLine = ', dataLine)
          if (eventLine && dataLine) {
            const event = eventLine.split(':')[1].trim()
            // console.log('event =', event)
            const data = dataLine.split(':').slice(1).join(':').trim()
            // console.log('data =', data)
            if (event === 'conversation.message.delta') {
              // console.log('进入conversation.message.delta')
              const messageData = JSON.parse(data)
              // console.log('data是', messageData)
              if (messageData.role === 'assistant' && messageData.content) {
                tempString.value += messageData.content
                // console.log('tempString.value = ', tempString.value)
                message.value[message.value.length - 1].content = tempString.value
              }
            }
          }
        })
      }
      // Ensure the final '=====' is included on a new line
      if (!tempString.value.endsWith('\n=====')) {
        tempString.value += '\n====='
        message.value[message.value.length - 1].content = tempString.value
      }
      console.log(tempString.value)
      tempString.value = ''
    } catch (error) {
      console.error('发起对话创建失败', error)
      throw error
    }
  }
  return { message, tempString, messageProcessing }
})
