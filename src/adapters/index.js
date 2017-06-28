//LENDLENDLENDLER
const baseUrl = 'http://localhost:3000/api/v1'

export class BooksAdapter {
  static all(){
    return fetch(`${this.url()}`, {
      headers: headers()
      }
    )
    .then( res => res.json() )
  }

  static fetchUserBooks(id){
      return fetch(`${baseUrl}/users/${id}`,{
        headers: headers()
      }
    )
    .then(res => res.json() )
  }

  static addUserBook(userbook){

    return fetch(`${baseUrl}/userbooks`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        userbook: userbook
      })
    })
    .then( res => res.json())
    .then(console.log)
  }

  static url(){
    return `${baseUrl}/books`
  }
}

function headers(){
  return {
    'content-type': 'application/json',
    'accept': 'application/json'
  }
}
