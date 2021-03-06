const baseUrl = 'https://murmuring-wave-91310.herokuapp.com/api/v1'
// const baseUrl = 'http://localhost:3000/api/v1'


export default class UserAdapter {
  static all(){
    return fetch(`${baseUrl}/users`,{
      headers: headers(),
    }
  )
    .then( res => res.json() )
  }


  static createUser(userParams){
    return fetch(`${baseUrl}/users`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        user: userParams
      })
    })
    .then( response => response.json() )
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
