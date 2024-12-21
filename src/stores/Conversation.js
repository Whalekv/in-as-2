import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useConversationStore = defineStore('conversation', () => {
  const conversation_id = ref('')
  const getConverstationId = (response_id) => {
    conversation_id.value = response_id
    console.log('conversation_id = ', conversation_id.value)
  }
  return { conversation_id, getConverstationId }
})
