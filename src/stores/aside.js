import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAsideStore = defineStore('aside', () => {
  // 折叠历史消息
  const isCollapse = ref(false)
  const toggleCollapse = () => (isCollapse.value = !isCollapse.value)
  return { isCollapse, toggleCollapse }
})
