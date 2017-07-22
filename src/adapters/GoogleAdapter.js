const googleUrl = 'https://www.googleapis.com/books/v1/volumes?q='
const baseUrl = 'https://morning-cliffs-63985.herokuapp.com/api/v1'

export default class GoogleAdapter{
  static searchBooks(searchTerm){
    return fetch(googleUrl + searchTerm + '&maxResults=40', {
      headers: headers()
      }
    )
    .then(res => res.json() )
  }

  static createLocalBooks(reshapedBooks){
    console.log("in google")
      return fetch(`${baseUrl}/books`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'accept': 'application/json',
          'Authorization': localStorage.getItem('user_id')
        },
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
