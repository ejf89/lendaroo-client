const baseUrl = 'http://localhost:3000/api/v1'
const googleUrl = 'https://www.googleapis.com/books/v1/volumes?q='

export default class AuthAdapter {
  static logIn(loginParams){
    return fetch(`${baseUrl}/auth`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(loginParams)
    }).then(response => response.json() )
  }

  static currentUser(user_id){
    return fetch (`${baseUrl}/users/` + user_id, {
      headers: headers()
    })
    .then( response => response.json() )
  }

}

function headers(){
  return {
    'content-type': 'application/json',
    'accept': 'application/json',
    'Authorization': localStorage.getItem('user_id')
  }
}
