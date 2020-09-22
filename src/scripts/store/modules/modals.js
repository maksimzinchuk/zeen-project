export default {
  namespaced: true,
  state: {
    activeModal: 'registration',
    isChooseLanguage: false,
    recoverEmail: '',
  },
  mutations: {
    openModal(state, modalId) {
      console.log('modalId', modalId)
      state.activeModal = modalId
    },
    closeModal(state) {
      state.activeModal = ''
      state.recoverEmail = ''
    },
    startShowLanguage(state) {
      if (!state.isChooseLanguage) {
        state.activeModal = ''
      }
    },
    setUserEmailForRecover(state, email) {
      state.recoverEmail = email
    },
    finishShowLanguage(state) {
      state.isChooseLanguage = true
    },
  },
  actions: {},
  getters: {
    activeModal: state => {
      console.log(state)
      return state.activeModal
    },
    email: state => state.recoverEmail,
  },
}
