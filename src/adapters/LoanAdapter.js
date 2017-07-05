const baseUrl = 'http://localhost:3000/api/v1'

export default class LoanAdapter {
  static all(){
    return fetch(`${this.url()}`, {
      headers: headers()
      }
    )
    .then( res => res.json() )
  }

  static createLoan(giver_id, taker_id, book_id){
    console.log("creating loan")
    return fetch(`${this.url()}`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        giver_id: giver_id,
        taker_id: taker_id,
        book_id: book_id
      })
    })
    .then( res => res.json() )
  }


  static deleteUserBook(userBook){
    return fetch(`${baseUrl}/userbooks/${userBook.id}`, {
      method: 'DELETE',
      headers: headers(),
      body: JSON.stringify({
        userbook: userBook
      })
    })
    .then( res => res.json() )
  }


  static url(){
    return `${baseUrl}/loans`
  }
}

function headers(){
  return {
    'content-type': 'application/json',
    'accept': 'application/json'
  }
}
