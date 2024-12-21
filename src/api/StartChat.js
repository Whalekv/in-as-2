import { service } from '@/utils/request'
import { useConversationStore } from '@/stores/Conversation'

export const startChat = async () => {
  const conversation = useConversationStore()
  const data = {
    bot_id: '7444616670242717731',
    user_id: '123456789',
    stream: true,
    auto_save_history: true,
    additional_messages: [
      {
        role: 'user',
        content: 'vue的生命周期？',
        content_type: 'text',
      },
    ],
  }
  const json_string_data = JSON.stringify(data)
  try {
    const response = await service.post(
      `/v3/chat?conversation_id=${conversation.conversation_id}`,
      json_string_data,
    )
    console.log('start_chat = ', response)
    return response
  } catch (error) {
    console.log('发起对话创建失败')
    throw error
  }
}
