const googleUrl = 'https://www.googleapis.com/books/v1/volumes?q='
const baseUrl = 'http://localhost:3000/api/v1'

export default class GoogleAdapter{
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
