<script setup>
import { Top } from '@element-plus/icons-vue'
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import { useMessageStore } from '@/stores/Message'

import UploadingBtn from './UploadingBtn.vue'
import SpeechBtn from './SpeechBtn.vue'
import RecordingBtn from './RecordingBtn.vue'

//调用 useMessageStore
const messageStore = useMessageStore()
// 存储textarea的内容
const text = ref('')
// 引用textarea元素
const textareaEl = ref(null)
// 存储textarea的基础滚动高度（单行高度）
const baseScrollHeight = ref(0)
// 存储textarea的当前滚动高度
const currentScrollHeight = ref(0)
// 标记是否发生过换行
const hasLineBreak = ref(false)

// 计算textarea的样式
const textareaStyle = computed(() => ({
  // 当内容超过4行时，显示滚动条；否则隐藏
  overflow: currentScrollHeight.value > baseScrollHeight.value * 4 ? 'auto' : 'hidden',
  // 禁用手动调整大小
  resize: 'none',
  // 设置最小高度为基础高度（确保至少显示一行）
  minHeight: `${baseScrollHeight.value}px`,
  // 设置最大高度为基础高度的4倍（最多显示4行）
  maxHeight: `${baseScrollHeight.value * 4}px`,
}))

// 调整textarea的高度
const adjustHeight = () => {
  const textarea = textareaEl.value
  if (!textarea) return

  // 如果文本框内容为空，或者还没有发生换行，保持最小高度
  if (
    text.value.length === 0 ||
    (!hasLineBreak.value && textarea.scrollHeight <= textarea.clientHeight)
  ) {
    textarea.style.height = '24px' // 保持最小高度
    hasLineBreak.value = false //删除完最后一个字符后，更新hasLineBreak.value
    return
  }

  // 如果文本已经换行，直接调整高度
  if (!hasLineBreak.value && textarea.scrollHeight > textarea.clientHeight) {
    hasLineBreak.value = true
  }

  // 先将高度设为auto，以便正确计算scrollHeight
  textarea.style.height = 'auto'

  // 将高度设置为内容的实际高度
  textarea.style.height = `${textarea.scrollHeight}px`

  // 更新当前滚动高度
  currentScrollHeight.value = textarea.scrollHeight
}

// 组件挂载后执行
onMounted(() => {
  // 获取textarea元素
  textareaEl.value = document.getElementById('auto-growing-textarea')
  // 在下一个DOM更新周期执行
  nextTick(() => {
    // 设置基础滚动高度（单行高度）
    baseScrollHeight.value = textareaEl.value.scrollHeight
    // 初始调整高度
    adjustHeight()
  })
  // 添加回车键监听事件
  textareaEl.value.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey && text.value.trim() !== '') {
      event.preventDefault() // 阻止默认的回车行为（换行）
      handleSend()
    }
  })
})

// 监听文本变化，调整高度
watch(text, () => {
  adjustHeight()
})

// 发送消息
const handleSend = () => {
  //呈现用户输入的消息
  messageStore.message.push({
    role: 'user',
    content: text.value,
    content_type: 'text',
  })
  console.log('handleSend.message = ', messageStore.message)
  //调用发送消息api
  messageStore.messageProcessing()
  text.value = ''
}
</script>

<template>
  <!-- 输入区 -->
  <div class="input-area">
    <!-- 输入框 -->
    <textarea
      id="auto-growing-textarea"
      v-model="text"
      :style="textareaStyle"
      class="input-box"
    ></textarea>
    <!-- 操作区 -->
    <div class="operation-area">
      <!-- 左侧区域 -->
      <div class="left-area">
        <UploadingBtn />
        <RecordingBtn />
      </div>
      <!-- 右侧区域 -->
      <div class="right-area">
        <!-- 语音按钮 -->
        <SpeechBtn />
        <!-- 发送按钮 -->
        <el-button type="primary" color="#181818" class="sent-button" circle @click="handleSend">
          <el-icon :size="25">
            <Top />
          </el-icon>
        </el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.input-area {
  width: 800px;
  min-height: 75px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 20px;
  margin-bottom: 20px;
  padding: 15px 20px;
  background-color: rgb(244, 244, 244);
}
.input-box {
  width: 100%;
  border: none;
  background: transparent;
  color: rgb(66, 66, 66);
  font-size: 16px;
  line-height: 1.5;
  outline: none;
  padding: 0px;
  transition: height 0.1s ease-out;
}
.input-box::placeholder {
  color: rgba(255, 255, 255, 0.7);
}
.operation-area {
  width: 100%;
  height: 40px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.sent-button {
  margin: 0 20px 0 40px;
}
</style>
