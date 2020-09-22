<template>
  <div class="chat">
    <div class="chat__buttons">
      <div
        :class="[
          selectedComponent === 'History' ? 'chat__button_active' : '',
          'chat__button',
        ]"
        @click="selectedComponent = 'History'"
      >
        Ход выступления
      </div>
      <div
        :class="[
          selectedComponent === 'MessagesBox' ? 'chat__button_active' : '',
          'chat__button',
        ]"
        @click="selectedComponent = 'MessagesBox'"
      >
        Задать вопрос
      </div>
    </div>
    <div class="chat__page">
      <div class="chat__messages">
        <MessageTemplate v-bind:posts="posts"></MessageTemplate>
      </div>
    </div>
    <div class="chat__submit" @click="sendRandomMessage">Задать вопрос</div>
  </div>
</template>

<script>
import MessageTemplate from './components/MessageTemplate'
import MessagesBox from './components/MessagesBox'
import History from './components/History'
import {mapGetters} from 'vuex'
import {mapActions} from 'vuex'
export default {
  name: 'App',
  data() {
    return {
      selectedComponent: 'MessagesBox',
      posts: [],
    }
  },
  components: {
    MessagesBox,
    History,
    MessageTemplate,
  },
  computed: {
    ...mapGetters({
      getPost: 'getPost',
    }),
  },
  methods: {
    ...mapActions({
      msgType: 'messageTypeRandom',
      msgRandom: 'messageRandom',
      usrRnd: 'userRandom',
      quoteUsr: 'quoteUser',
      quoteMsg: 'quoteMessage',
      replyMsg: 'replyMessage',
      replyUsr: 'replyUser',
      time: 'time',
      rndMain: 'rndMainUser',
    }),
    getPosts() {
      this.posts.push(this.getPost)
    },
    sendRandomMessage() {
      //генерируем моки
      const date = new Date()
      const hour = date.getHours()
      const min = date.getMinutes()
      const time = {hour, min}
      const messageTypeChoice = Math.round(Math.random() * 2)
      const message = Math.round(Math.random() * 7)
      const user = Math.round(Math.random() * 5)
      const quoteUser = Math.round(Math.random() * 5)
      const replyMessage = Math.round(Math.random() * 7)
      const quoteMessage = Math.round(Math.random() * 7)
      const replyUser = Math.round(Math.random() * 5)
      const mainPerson = Math.random() >= 0.5

      this.msgType(messageTypeChoice)
      this.msgRandom(message)
      this.usrRnd(user)
      this.quoteUsr(quoteUser)
      this.quoteMsg(quoteMessage)
      this.replyMsg(replyMessage)
      this.replyUsr(replyUser)
      this.time(time)
      this.rndMain(mainPerson)

      this.getPosts()
    },
  },
}
</script>

<style scoped></style>
