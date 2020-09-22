import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    messages: [
      'А сколько времени занимает процесс заполнения анкеты?',
      'Нас смотрит уже более 750 человек!',
      'Процесс заполнения анкеты занимает примерно 12 минут',
      'А можно ли как-то изменить анкету?',
      'Примерно 20 минут.',
      'quo vero reiciendis velit similique earum',
      'et fugit eligendi deleniti quidem qui sint nihil autem',
      'repellat consequatur praesentium vel minus molestias voluptatum',
    ],
    users: [
      'Михаил Литвинов',
      'Мария Девятилова',
      'Михаил Хаджабекян',
      'Ervin Howell',
      'Leanne Graham',
      'Clementine Bauch',
    ],
    messageType: ['Reply', 'Quote', 'Simple'],
    randomizeMessage: '',
    randomText: '',
    randomUser: '',
    quoteUser: '',
    replyMessage: '',
    quoteMessage: '',
    replyUser: '',
    time: '',
    mainUser: false,
  },
  mutations: {
    SET_MESSAGE_TYPE(state, randomNumber) {
      state.randomizeMessage = randomNumber
    },
    SET_MESSAGE(state, randomMessage) {
      state.randomText = randomMessage
    },
    SET_USER(state, randomUser) {
      state.randomUser = randomUser
    },
    SET_QUOTE_USER(state, randomUser) {
      state.quoteUser = randomUser
    },
    SET_QUOTE_MESSAGE(state, randomMessage) {
      state.quoteMessage = randomMessage
    },
    SET_REPLY_MESSAGE(state, randomMessage) {
      state.replyMessage = randomMessage
    },
    SET_REPLY_USER(state, randomUser) {
      state.replyUser = randomUser
    },
    SET_TIME(state, time) {
      state.time = time
    },
    SET_MAIN_USER(state, bool) {
      state.mainUser = bool
    },
  },
  actions: {
    messageTypeRandom({commit}, randomNumber) {
      commit('SET_MESSAGE_TYPE', randomNumber)
    },
    messageRandom({commit}, randomMessage) {
      commit('SET_MESSAGE', randomMessage)
    },
    userRandom({commit}, randomUser) {
      commit('SET_USER', randomUser)
    },
    quoteUser({commit}, randomUser) {
      commit('SET_QUOTE_USER', randomUser)
    },
    quoteMessage({commit}, randomMessage) {
      commit('SET_QUOTE_MESSAGE', randomMessage)
    },
    replyMessage({commit}, randomMessage) {
      commit('SET_REPLY_MESSAGE', randomMessage)
    },
    replyUser({commit}, randomUser) {
      commit('SET_REPLY_USER', randomUser)
    },
    time({commit}, time) {
      commit('SET_TIME', time)
    },
    rndMainUser({commit}, bool) {
      commit('SET_MAIN_USER', bool)
    },
  },
  getters: {
    getPost(state) {
      let post = {}
      if (state.messageType[state.randomizeMessage] === 'Reply') {
        post = {
          type: state.messageType[state.randomizeMessage],
          user: state.users[state.randomUser],
          replyUser: state.users[state.replyUser],
          message: state.messages[state.randomText],
          replyMessage: state.messages[state.replyMessage],
          time: state.time,
          main: state.mainUser,
        }
        return post
      } else if (state.messageType[state.randomizeMessage] === 'Quote') {
        post = {
          type: state.messageType[state.randomizeMessage],
          user: state.users[state.randomUser],
          quoteUser: state.users[state.quoteUserUser],
          message: state.messages[state.randomText],
          quoteMessage: state.messages[state.quoteMessage],
          time: state.time,
          main: state.mainUser,
        }
        return post
      } else if (state.messageType[state.randomizeMessage] === 'Simple') {
        post = {
          type: state.messageType[state.randomizeMessage],
          user: state.users[state.randomUser],
          message: state.messages[state.randomText],
          time: state.time,
          main: state.mainUser,
        }
        return post
      }
    },
  },
  modules: {},
  plugins: [new VuexPersistence().plugin],
})

export default store
