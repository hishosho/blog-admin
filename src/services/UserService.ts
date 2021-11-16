import axios from './index'

type User = {
  userName: string,
  password: string
}

const UserService = {
  // getPublicKey: () => {
  //   return axios.get('users/publicKey')
  // },
  login: (user: User ) => {
    return axios.post('users/login', user)
  }
}

export default UserService