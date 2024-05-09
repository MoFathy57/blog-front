import PostsService from '../services/posts.service'

// const user = JSON.parse(localStorage.getItem('user'))
const initialState = {
  posts: [],
  post: null
}

export const posts = {
  namespaced: true,
  state: initialState,
  actions: {
    getPosts({ commit }) {
      return PostsService.getPosts().then(
        (data) => {
          commit('postsSuccess', data)
          return Promise.resolve(data)
        },
        (error) => {
          commit('postsFailure')
          return Promise.reject(error)
        }
      )
    },
    getPost({ commit }, id) {
      return PostsService.getPost(id).then(
        (data) => {
          commit('postSuccess', data)
          console.log('module', data.post)
          return Promise.resolve(data)
        },
        (error) => {
          commit('postsFailure')
          return Promise.reject(error)
        }
      )
    }
  },
  mutations: {
    postsSuccess(state, data) {
      state.posta = data.posts
    },
    postsFailure(state) {
      state.message = ''
    },
    postSuccess(state, data) {
      state.post = data.post
    }
  }
}
