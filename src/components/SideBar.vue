<script lang="ts" setup>
import { Setting } from '@element-plus/icons-vue'
import { useAsideStore } from '../stores/aside'

const aside = useAsideStore()
</script>

<template>
  <el-aside v-if="!aside.isCollapse" class="sidebar">
    <div class="header">
      <h3>历史消息</h3>
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
      <el-button type="primary" color="#181818" :icon="Setting" class="setting-button" circle />
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
