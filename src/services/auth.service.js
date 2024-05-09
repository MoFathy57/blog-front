import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000/api'

class AuthService {
  login(user) {
    let config = {
      headers: {
        Accept: 'application/json'
      }
    }
    return axios
      .post(
        API_URL + '/login',
        {
          username: user.username,
          password: user.password
        },
        config
      )
      .then((response) => {
        console.log(response)
        if (response.data.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data.data))
        }

        return response.data
      })
  }

  logout() {
    localStorage.removeItem('user')
  }
}

export default new AuthService()
