//LENDLENDLENDLER
const baseUrl = 'http://localhost:3000/api/v1'
const googleUrl = 'https://www.googleapis.com/books/v1/volumes?q='

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
  }

  static url(){
    return `${baseUrl}/books`
  }
}

export class GoogleAdapter{
  static searchBooks(searchTerm){
    return fetch(googleUrl + searchTerm + '&maxResults=30', {
      headers: headers()
      }
    )
    .then(res => res.json() )
  }

  static createLocalBooks(reshapedBooks){
      return fetch(`${baseUrl}/books`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({
           books: reshapedBooks
        })
      })
      .then( res => res.json())
  }

}

function headers(){
  return {
    'content-type': 'application/json',
    'accept': 'application/json'
  }
}
