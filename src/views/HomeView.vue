<script setup>
import SideBar from '@/components/SideBar.vue'
import TopNavigation from '@/components/TopNavigation.vue'
import ChatArea from '@/components/ChatArea.vue'
import InputArea from '@/components/InputArea.vue'
</script>

<template>
  <div class="common-layout">
    <!-- 外部容器 -->
    <el-container class="external-container">
      <!-- 侧边历史记录 -->
      <SideBar />
      <!-- 内容容器 -->
      <el-container class="content-container">
        <!-- 顶部导航 -->
        <el-header>
          <TopNavigation />
        </el-header>
        <!-- 聊天区 -->
        <el-main class="main-area">
          <ChatArea />
        </el-main>
        <div class="footer-container">
          <el-footer class="footer">
            <InputArea />
          </el-footer>
        </div>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.common-layout {
  height: 100%;
}
.external-container {
  height: 100%;
}

.content-container {
  display: flex;
  flex-direction: column; /* 使内容容器垂直排列 */
  height: 100%;
}
.el-header {
  height: 70px;
}
.main-area {
  flex: 1; /* 使主区域占据剩余空间 */
  display: flex;
  justify-content: center;
  padding: 0;
}
.footer-container {
  flex-shrink: 0; /* 防止 footer 收缩 */
}
.footer {
  height: auto; /* 允许 footer 根据内容高度自动调整 */
  display: flex;
  justify-content: center;
}
</style>
