<template>
  <div>
    <div class="chat__message" v-for="(post, i) in posts" :key="i">
      <div class="chat__users">
        <div class="chat__top">
          <p :class="[post.main ? 'chat__name_org' : '', 'chat__name']">
            {{ post.user }}
          </p>
          <span class="chat__time">{{ now - post.time.min }} мин</span>
        </div>
        <p class="chat__name-reply" v-if="post.type === 'Reply'">
          {{ post.replyUser }}
        </p>
      </div>
      <div class="chat__quote" v-if="post.type === 'Quote'">
        <p class="chat__quote-name">{{ post.quoteUser }}</p>
        <p class="chat__quote-message">
          {{ post.quoteMessage }}
        </p>
      </div>
      <p class="chat__text">
        {{ post.message }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MessageTemplate',
  props: ['posts'],
  data() {
    return {
      now: ''
    }
  },
  created() {
    setInterval(() => {
      this.now = new Date().getMinutes()
    }, 100)
  },
}
</script>

<style scoped></style>
