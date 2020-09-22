import {
  analyticRequest,
  loginRequest,
  registrationRequest,
  loadUserInformation,
  updateProfile,
  updateUserPhoto,
  resetPasswordOne,
  resetPasswordThree,
} from '../../api/api'
import router from '../../router'
import Vue from 'vue'

/*
{
  "status": "success",
  "sign_token": "st10843380398ffcdb8dfe8ad946fe80c7",
  "user_id": 100,
  "temp_user": true,
  "user_data": {
    "id": 0,
    "email": "string",
    "first_name": "string",
    "middle_name": "string",
    "last_name": "string",
    "number_chk": "string",
    "status": "string",
    "country": "string",
    "city": "string",
    "picture": { },
    "points_balance": 100,
    "is_vip": true
  }
}
*/
const user = {
  namespaced: true,
  state: {
    isNew: true,
    user: {},
    watchTime: 0,
  },
  mutations: {
    setUserPoints(state, points_balance) {
      state.user.user_data.points_balance = points_balance
    },
    watchVideo(state) {
      state.watchTime++
    },
    watchedModal(state) {
      state.isNew = false
    },
    logOut(state) {
      state.user = {}
    },
    loginSuccess(state, user) {
      state.user = user
    },
    updateUserPhoto(state, picture) {
      state.user.user_data.picture.url = picture.url
    },
    updateUserData(state, full_name) {
      state.user.full_name = full_name
    },
    updateUserProfile(state, user) {
      state.user.user_data = {...state.user.user_data, ...user}
    },
  },
  actions: {
    logOut({commit}) {
      commit('logOut')
      router.push('/')
    },
    login({rootGetters, commit}, data) {
      return new Promise((resolve, reject) => {
        //данные есть делаем запрос
        loginRequest(rootGetters.streamId, data)
          .then(data => {
            this.loadingLogin = false
            /*"status": "success",
              "sign_token": "stf0a4f27d7f110dec383cc39fe52dee46",
              "user_id": 1505,
              "full_name": "ser evd"*/
            if (data.status === 'success') {
              //сохранили в память
              commit('loginSuccess', data)
              resolve(data)
              analyticRequest('auth', {
                useragent: navigator.userAgent,
              })
            } else {
              //ошибка авторизации
              return Promise.reject(data)
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    registration({rootGetters, commit}, userData) {
      return new Promise((resolve, reject) => {
        registrationRequest(rootGetters.streamId, userData)
          .then(data => {
            if (data.status === 'success') {
              commit('loginSuccess', data)

              // analyticRequest('registration', {
              //   useragent: navigator.userAgent,
              // })

              resolve(data)
            } else {
              return Promise.reject(data)
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    updateProfile({commit}, profile) {
      updateProfile(profile)
        .then(({data}) => {
          if (data.status === 'success') {
            commit('updateUserProfile', profile)
            console.log('Профиль обновлен')
            // TODO: изменить на адекватные уведомления
          } else {
            alert('Ошибка обновления профиля')
            // TODO: изменить на адекватные уведомления
          }
        })
        .catch(e => {
          alert('Ошибка обновления профиля')
          // TODO: изменить на адекватные уведомления
        })
    },
    updatePicture({commit}, image) {
      updateUserPhoto(image).then(data => {
        console.log(data)
        commit('updateUserPhoto', data.picture)
      })
    },
    upgradeInformation({commit}) {
      loadUserInformation()
        .then(data => {
          if (data.status === 'success') {
            commit('loginSuccess', data)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    resetPasswordOne({commit}, resetData) {
      return new Promise((resolve, reject) => {
        resetPasswordOne(resetData)
          .then(data => {
            if (data.status === 'success') {
              resolve(data)
            } else {
              let message = ''

              switch (data.message) {
                case 'not_valid':
                  message = 'errors.user_not_found'
                  break
                case 'missing_required_fields':
                  message = 'errors.user_not_found'
                  break
              }

              reject({message})
            }
          })
          .catch(err => {
            console.log(err)
          })
      })
    },
    requestUpdatePassword({commit}, data) {
      return new Promise((resolve, reject) => {
        resetPasswordThree(data)
          .then(data => {
            if (data.status === 'success') {
              resolve(data)
            } else {
              let message = ''

              switch (data.message) {
                case 'password_min_6':
                  message = 'errors.password_less_6'
                  break
                case 'not_valid':
                  message = 'errors.not_valid_token'
                  this.success = false
                  break
                case 'missing_required_fields':
                  message = 'errors.missing_required_fields'
                  break
                default:
                  message = 'errors.title'
              }

              reject({
                message,
              })
            }
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    userOnSite({rootGetters, dispatch}) {
      const activeSpeech = rootGetters['streams/activeSpeech']
      const speech_id = activeSpeech ? activeSpeech.id : 0

      analyticRequest('view', {
        speech_id,
      }).then(({online}) => {
        if (online) {
          dispatch('streams/upgradeOnline', online, {root: true})
        }
        // this.onlineCount = online
      })
    },
  },
  getters: {
    getWatchVideo(state) {
      return state.watchTime
    },
  },
}

export default user
