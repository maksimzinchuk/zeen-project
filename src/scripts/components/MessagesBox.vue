<template>
  <div class="chat__page">
    <div class="chat__messages">
      <MessageTemplate :posts="posts"></MessageTemplate>
    </div>
  </div>
</template>

<script>
 import MessageTemplate from './MessageTemplate'
export default {
  name: 'messagesBox',
  props: ['posts'],
  components: {
     MessageTemplate
  }
}
</script>

<style scoped></style>
