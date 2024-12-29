<script setup>
import { useMessageStore } from '@/stores/Message'
import { ref, onMounted } from 'vue'
import { Parser, HtmlRenderer } from 'commonmark'
import DOMPurify from 'dompurify'

//调用useMessageStore方法
const messageStore = useMessageStore()
// Create a parser and renderer instance
const parser = new Parser()
const renderer = new HtmlRenderer()

// Function to render and sanitize Markdown content
const renderMarkdown = (content) => {
  const parsed = parser.parse(content)
  const dirtyHtml = renderer.render(parsed)
  return DOMPurify.sanitize(dirtyHtml)
}
</script>

<template>
  <div class="chat-container">
    <el-scrollbar>
      <el-card
        class="message-card"
        shadow="always"
        v-for="(item, index) in messageStore.message"
        :key="index"
        :class="['message-card', item.role]"
      >
        <div
          class="message-content"
          :class="{ streaming: item.isStreaming }"
          v-html="renderMarkdown(item.content)"
        ></div>
      </el-card>
    </el-scrollbar>
  </div>
</template>

<style scoped>
.chat-container {
  height: 100%;
  width: 80%;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  /* background-color: rgb(193, 119, 23); */
}
.message-card {
  width: fit-content;
  margin-top: 3px;
  margin-bottom: 15px;
  background-color: rgb(244, 244, 244);
}
.message-card.user {
  margin-left: auto;
  margin-right: 15px;
  max-width: 60%;
}
.message-card.assistant {
  margin-right: auto;
  max-width: 90%;
}
.message-content {
  max-width: 100%;
  word-wrap: break-word;
  white-space: pre-wrap; /* Preserve whitespace and newline characters */
}
.message-content h1,
.message-content h2,
.message-content h3,
.message-content h4,
.message-content h5,
.message-content h6 {
  font-weight: bold;
}
.message-content p {
  margin: 0;
}
.message-content ul,
.message-content ol {
  padding-left: 20px;
}
.message-content li {
  margin-bottom: 5px;
}
.message-content code {
  background-color: #f5f5f5;
  padding: 2px 4px;
  border-radius: 4px;
}
.message-content pre {
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 4px;
  overflow-x: auto;
}
.message-content a {
  color: #007bff;
  text-decoration: none;
}
.message-content a:hover {
  text-decoration: underline;
}
.message-content.streaming {
  font-style: italic;
}
</style>
