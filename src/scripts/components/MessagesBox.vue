<template>
  <div>
    <!--    <div class="chat__page">-->
    <!--      <div class="chat__messages">-->
    <!--        <MessageTemplate v-bind:posts="posts"></MessageTemplate>-->
    <!--      </div>-->
    <!--    </div>-->

    <!--    <div class="chat__submit" @click="sendRandomMessage">Задать вопрос</div>-->
  </div>
</template>

<script>
// import MessageTemplate from './MessageTemplate'
// import { mapGetters } from "vuex";
// import { mapActions } from 'vuex'
export default {
  name: 'messagesBox',
  data() {
    return {
      posts: [],
    }
  },
  components: {
    // MessageTemplate
  },
  // computed: {
  //   ...mapGetters({
  //     getPost: 'getPost'
  //   })
  // },
  // methods: {
  //   ...mapActions({
  //     msgType: 'messageTypeRandom',
  //     msgRandom: 'messageRandom',
  //     usrRnd: 'userRandom',
  //     quoteUsr: 'quoteUser',
  //     quoteMsg: 'quoteMessage',
  //     replyMsg: 'replyMessage',
  //     replyUsr: 'replyUser'
  //   }),
  //   getPosts() {
  //     this.posts.push(this.getPost);
  //   },
  //   sendRandomMessage() {
  //     //генерируем моки
  //     const date = new Date();
  //     const min = date.getMinutes();
  //     const messageTypeChoice = Math.round(Math.random()*2);
  //     const message = Math.round(Math.random()*7);
  //     const user = Math.round(Math.random()*5);
  //     const quoteUser = Math.round(Math.random()*5);
  //     const replyMessage = Math.round(Math.random()*7);
  //     const quoteMessage = Math.round(Math.random()*7);
  //     const replyUser = Math.round(Math.random()*5);
  //
  //     this.msgType(messageTypeChoice);
  //     this.msgRandom(message);
  //     this.usrRnd(user);
  //     this.quoteUsr(quoteUser);
  //     this.quoteMsg(quoteMessage);
  //     this.replyMsg(replyMessage);
  //     this.replyUsr(replyUser);
  //
  //     this.getPosts();
  //
  //
  //
  //
  //   }
  // }
}
</script>

<style scoped></style>
