import axios from 'axios'
import authHeader from './auth-header'

const API_URL = 'http://127.0.0.1:8000/api'

class PostsService {
  getPosts() {
    return axios.get(API_URL + '/posts', { headers: authHeader() }).then((response) => {
      return response.data
    })
  }

  getPost(id) {
    return axios.get(API_URL + `/posts/${id}`, { headers: authHeader() }).then((response) => {
      console.log('service', response)
      return response.data
    })
  }
}

export default new PostsService()
