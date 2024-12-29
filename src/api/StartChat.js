import { service } from '@/utils/request'
import { useConversationStore } from '@/stores/Conversation'
import { useMessageStore } from '@/stores/Message'

export const startChat = async (message) => {
  const conversation = useConversationStore()
  const messageStore = useMessageStore()
  const data = {
    bot_id: '7444616670242717731',
    user_id: '123456789',
    stream: true,
    auto_save_history: true,
    additional_messages: message,
  }
  //这里使用了axios来post，但是axios处理流数据时会有问题，所以下面使用了fetch
  // try {
  //   const response = await service.post(
  //     `/v3/chat?conversation_id=${conversation.conversation_id}`,
  //     data,
  //   )
  //   return response
  // } catch (error) {
  //   console.error('发起对话创建失败', error)
  //   throw error
  // }
  try {
    const response = await fetch(
      `https://api.coze.cn/v3/chat?conversation_id=${conversation.conversation_id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('TOKEN')}`,
        },
        body: JSON.stringify(data),
      },
    )
    if (!response.ok) {
      throw new Error('ReadableStream not support in this browser')
    }
    // console.log('response456 = ', response)
    return response
  } catch (error) {
    console.error('发起对话创建失败', error)
    throw error
  }
}
