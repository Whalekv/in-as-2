import { service } from '@/utils/request'

export const createConversation = async () => {
  try {
    const response = await service.post('/v1/conversation/create')
    return response // 确保返回正确的响应
  } catch (error) {
    console.error('创建对话失败:', error)
    throw error // 抛出错误，以便调用方处理
  }
}
