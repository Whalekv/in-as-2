<script lang="ts" setup>
import { Setting } from '@element-plus/icons-vue'
import { useAsideStore } from '../stores/aside'
import { useRouter } from 'vue-router'
import { createConversation } from '@/api/CreateConversation'
import { useConversationStore } from '@/stores/Conversation'

const aside = useAsideStore()
const router = useRouter()
const conversation = useConversationStore()

const toSetting = () => {
  router.push('/setting')
}

// 处理创建新对话按钮点击事件
const handleCreateConversation = async () => {
  try {
    const response = await createConversation() // 调用 createConversation 方法
    console.log('createConverstation_response = ', response)
    conversation.getConverstationId(response)
  } catch (error) {
    console.error('创建对话失败', error)
  }
}
</script>

<template>
  <el-aside v-if="!aside.isCollapse" class="sidebar">
    <div class="header">
      <el-button plain class="createNewConversation" @click="handleCreateConversation">
        <h2>新建对话</h2>
      </el-button>
    </div>
    <!-- 历史消息列表 -->

    <div class="message-history">
      <el-scrollbar>
        <el-card shadow="hover">历史消息1</el-card>
        <el-card shadow="hover">历史消息2</el-card>
        <el-card shadow="hover">历史消息3</el-card>
        <el-card shadow="hover">历史消息1</el-card>
        <el-card shadow="hover">历史消息2</el-card>
        <el-card shadow="hover">历史消息3</el-card>
        <el-card shadow="hover">历史消息1</el-card>
        <el-card shadow="hover">历史消息2</el-card>
        <el-card shadow="hover">历史消息3</el-card>
        <el-card shadow="hover">历史消息1</el-card>
        <el-card shadow="hover">历史消息2</el-card>
        <el-card shadow="hover">历史消息3</el-card>
      </el-scrollbar>
    </div>
    <!-- 操作区 -->
    <div class="operation-area">
      <!-- 设置按钮 -->
      <el-button
        @click="toSetting"
        type="primary"
        color="#181818"
        :icon="Setting"
        class="setting-button"
        circle
      />
    </div>
  </el-aside>
</template>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  padding: 10px 15px;
}
.createNewConversation {
  width: 100%;
  height: 100%;
  border-radius: 7px;
  background-color: rgb(24, 24, 24);
  h2 {
    color: rgb(255, 255, 255);
    letter-spacing: 5px;
  }
}

.message-history {
  flex: 1; /* 使菜单占据剩余空间 */
  overflow-y: auto; /* 允许菜单内容滚动 */
}

.el-card {
  margin: 0px 15px 10px 10px;
  background-color: rgba(234, 234, 234, 0.811);
  cursor: pointer;
}

.operation-area {
  display: flex;
  height: 60px;
  align-items: center;
  justify-content: center;
}
</style>
