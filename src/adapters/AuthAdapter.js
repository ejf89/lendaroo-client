const baseUrl = 'https://whispering-sands-72095.herokuapp.com/api/v1/'

export default class AuthAdapter {

  static logIn(loginParams) {
    return fetch(`${baseUrl}/auth`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(loginParams)
    }).then(response => response.json())

  }

  static currentUser(user_id) {
    return fetch(`${baseUrl}/users/` + user_id, {headers: headers()}).then(response => response.json())
  }

}

function headers() {
  return {'content-type': 'application/json', 'accept': 'application/json', 'Authorization': localStorage.getItem('user_id')}
}
