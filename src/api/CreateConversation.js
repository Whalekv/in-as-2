import { service } from '@/utils/request'

export const createConversation = async () => {
  try {
    const response = await service.post('/v1/conversation/create')
    if (response) {
      return response.id
    }
  } catch (error) {
    console.error('创建对话失败:', error)
    throw error // 抛出错误，以便调用方处理
  }
}
