import {
  loadStreamUrls,
  loadStreamSpeeches,
  loadStreamSlides,
  loadRequestSpeakers,
} from '../../api/api'
import {getPlayer} from '../../helpers/playerHelper'

export default {
  namespaced: true,
  state: {
    current_stream_id: 1,
    current_speech_id: 1,
    live_speech_id: null,
    time_sync: 0,
    time_code: 0,
    streams: [],
    open_speech: null,
  },
  mutations: {
    setOpenSpeech(state, speech) {
      state.open_speech = speech
    },
    setActiveStreamId: (state, stream_id) =>
      (state.current_stream_id = stream_id),
    setTimeCode(state, time_code) {
      state.time_code = time_code
    },
    upgradeStream(state, newStream) {
      let upgrade = false

      state.streams = state.streams.map(stream => {
        if (parseInt(newStream.id) === parseInt(stream.id)) {
          upgrade = true
          return {
            ...stream,
            ...newStream,
          }
        }
        return stream
      })

      if (!upgrade) {
        state.streams.push(newStream)
      }
    },
    upgradeSpeech(state, newSpeech) {
      state.streams = state.streams.map(stream => {
        stream.speeches = stream.speeches.map(speech => {
          if (parseInt(speech.id) === parseInt(newSpeech.id)) {
            return {
              ...speech,
              ...newSpeech,
            }
          }
          return speech
        })

        return stream
      })
    },
    setAllDate(state, data, active_speech_id) {
      state.streams = data.streams
      // if (data.urls) {
      //   this.urls = data.urls
      // }

      state.current_speech_id = data.speech_id
      state.time_sync = data.time_sync

      /*
      if (active_speech_id) {
        this.setActiveSpeech(parseInt(active_speech_id))
        getPlayer().once('ready', () => {
          getPlayer().play()
        })
      } else {
        this.setActiveSpeech(data.speech_id)
      }
      */
    },
    setOnlineCount(state, count) {},
  },
  actions: {
    upgradeSlides({commit, getters}, slidesData) {
      // slideData: {data: [{is_active: false, slide_id: 1, timecode: null}], speech_id: 31, stream_id: 1}
      const speech = getters.getSpeechById(slidesData.speech_id)

      if (Array.isArray(speech.slides)) {
        speech.slides = speech.slides.map(slide => {
          let found = false

          slidesData.data.forEach(newSlide => {
            if (slide.slide_id === newSlide.slide_id) {
              found = {
                ...slide,
                ...newSlide,
              }
            }
          })

          if (found) {
            return found
          } else {
            return slide
          }
        })

        commit('upgradeSpeech', speech)
      }
    },
    upgradeSpeeches({commit}, speeches) {
      speeches.forEach(speech => {
        commit('upgradeSpeech', speech)
      })
    },
    upgradeSpeechesSlides({commit, getters}, slidesData) {
      const speech = getters.getSpeechById(slidesData.speech_id)
      speech.slides = data.slides

      commit('upgradeSpeech', speech)
    },
    loadStreamUrls({getters, rootGetters, commit}, stream_id) {
      loadStreamUrls(stream_id)
        .then(data => {
          if (data.status === 'success') {
            const stream = getters.getOrMakeStreamById(stream_id)
            const languadesData = JSON.parse(data.data)

            //меняем то что пришло с сервера на то что съест плеер
            let urls = languadesData.map((languageObj, index) => {
              return {
                id: index,
                label: languageObj.language,
                urls: [
                  {
                    id: index * 3,
                    label: '1080p',
                    source: languageObj.url_broadcast_fhd,
                  },
                  {
                    id: index * 3 + 1,
                    label: '720p',
                    source: languageObj.url_broadcast_hd,
                  },
                  {
                    id: index * 3 + 2,
                    label: '480p',
                    source: languageObj.url_broadcast_sd,
                  },
                ],
              }
            })
            stream.urls = urls

            commit('upgradeStream', stream)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    loadStreamSpeeches({getters, rootGetters, commit, dispatch}, stream_id) {
      loadStreamSpeeches(stream_id)
        .then(data => {
          if (data.status === 'success') {
            const stream = getters.getOrMakeStreamById(stream_id)
            const speeches = JSON.parse(data.data)

            const newNewSpeeches = []

            speeches.forEach(newSpeech => {
              if (!stream.speeches) {
                stream.speeches = []
              }

              const speechToUpgrade = stream.speeches.find(
                oldSpeech => oldSpeech.id === newSpeech.id,
              )
              if (speechToUpgrade) {
                newNewSpeeches.push({
                  // ...speechToUpgrade,
                  ...newSpeech,
                })
              } else {
                if (!newSpeech.slides) {
                  newSpeech.slides = []
                }
                newNewSpeeches.push(newSpeech)
              }
            })

            stream.speeches = newNewSpeeches

            commit('upgradeStream', stream)

            speeches.forEach((speech, index) => {
              setTimeout(() => {
                dispatch('loadSpeechSlides', {
                  speech_id: speech.id,
                  stream_id,
                })
              }, 500 * index)
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    loadSpeechSlides({getters, rootGetters, commit}, {speech_id}) {
      console.log('loadSpeechSlides')

      loadStreamSlides(speech_id)
        .then(data => {
          if (data.status === 'success') {
            const speech = getters.getSpeechById(speech_id)
            speech.slides = JSON.parse(data.slides)
            commit('upgradeSpeech', speech)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    loadSpeakersStream({commit, getters}, stream_id) {
      loadRequestSpeakers(stream_id).then(data => {
        if (data.status === 'success') {
          const speakers = JSON.parse(data.data)
          const stream = getters.getOrMakeStreamById(stream_id)
          stream.speakers = speakers

          commit('upgradeStream', stream)
        }
      })
    },
    upgradeTheses({getters, rootGetters, commit}, {data, speech_id}) {
      const speech = getters.getSpeechById(speech_id)

      if (speech) {
        speech.theses = speech.theses.map(these => {
          let updateThese = these

          data.forEach(newThese => {
            if (these.id === newThese.id) {
              updateThese = {
                ...these,
                ...newThese,
              }
            }
          })

          return updateThese
        })

        commit('upgradeSpeech', speech)
      }
    },
    upgradeOnline({getters, commit}, onlineString) {
      const stream = getters.activeStream

      if (stream) {
        stream.online = onlineString
        commit('upgradeStream', stream)
      }
    },
  },
  getters: {
    getOpenSpeech: state => state.open_speech,
    getActiveStreamId: state => state.current_stream_id,
    getTimeCode(state) {
      return state.time_code
    },
    getUrls(state, getters) {
      return getters.activeStream ? getters.activeStream.urls : null
    },
    activeStream(state, getters) {
      let activeStream = null

      state.streams.forEach(stream => {
        if (stream.id * 1 === state.current_stream_id * 1) {
          activeStream = stream
        }
      })

      return activeStream
    },
    speeches(state, getters, rootState, rootGetters) {
      if (getters.activeStream) {
        return getters.activeStream.speeches || []
      }

      return []
    },
    slides(state, getters, rootState, rootGetters) {
      if (getters.activeStream) {
        return getters.activeStream.slides
      }
      return []
    },
    online(state, getters, rootState, rootGetters) {
      if (getters.activeStream) {
        return getters.activeStream.online
      }

      return '0'
    },
    getOrMakeStreamById: (state, getters) => stream_id => {
      let streamLoaded = getters.getStreamById(stream_id)

      if (!streamLoaded) {
        streamLoaded = {
          id: stream_id,
        }
      }

      return streamLoaded
    },
    activeSpeech: (state, getters) => {
      let iOS = false
      if (window.navigator) {
        iOS =
          /iPad|iPhone|iPod/.test(window.navigator.userAgent) &&
          !window.MSStream
      }

      if (
        iOS &&
        getPlayer &&
        getPlayer() &&
        getPlayer().core.mediaControl.$el.hasClass('live')
      ) {
        return getters.onlineSpeech
      }

      const speeches = getters.speeches
      const time_code = state.time_code

      let activeSpeech = null
      if (Array.isArray(speeches)) {
        speeches
          .slice()
          .reverse()
          .forEach(function (speech) {
            if (!activeSpeech) {
              if (speech.timecode_begin !== null) {
                if (time_code >= speech.timecode_begin) {
                  activeSpeech = speech
                }
              }
            }
          })
      }

      return activeSpeech
    },
    onlineSpeech: (state, getters) => {
      const speeches = getters.speeches
      let onlineSp = null
      if (Array.isArray(speeches)) {
        speeches
          .slice()
          .reverse()
          .forEach(function (speech) {
            if (speech.status === 'online') {
              onlineSp = speech
            }
          })
      }
      return onlineSp
    },
    getStreamById: state => id => {
      return state.streams.find(stream => stream.id === id)
    },
    getSpeechById: state => id => {
      let neededSpeech = null
      state.streams.find(stream => {
        return stream.speeches.find(speech => {
          if (speech.id === id) {
            neededSpeech = speech
            return true
          }
          return false
        })
      })

      return neededSpeech
    },
  },
}
