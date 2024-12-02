<script setup>
import { UserFilled } from '@element-plus/icons-vue'
import { useAsideStore } from '../stores/aside'
const aside = useAsideStore()
// 折叠按钮方法
const handleCollapse = () => {
  aside.toggleCollapse()
  console.log('aside.isCollapse:', aside.isCollapse)
}
</script>

<template>
  <div class="top-nav">
    <el-button type="primary" color="#181818" @click="handleCollapse" class="collapse-btn">
      历史消息
    </el-button>
    <el-dropdown placement="top" trigger="click">
      <el-button type="primary" color="#181818" :icon="UserFilled" class="account-btn" circle />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>登出</el-dropdown-item>
          <el-dropdown-item>The Action 2st</el-dropdown-item>
          <el-dropdown-item>The Action 3st</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style scoped>
.top-nav {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
