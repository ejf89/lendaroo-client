const baseUrl = 'https://whispering-sands-72095.herokuapp.com/api/v1'

export default class LoanAdapter {
  static all(){
    return fetch(`${this.url()}`, {
      headers: headers()
      }
    )
    .then( res => res.json() )
  }

  static createLoan(giver_id, taker_id, book_id, title){
    console.log("creating loan")
    return fetch(`${this.url()}`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        giver_id: giver_id,
        taker_id: taker_id,
        book_id: book_id,
        title: title
      })
    })
    .then( res => res.json() )
  }

  static approveLoanRequest(loan_id){
    return fetch(`${this.url() + '/' + loan_id}`, {
      method: 'PATCH',
      headers: headers(),
      body: JSON.stringify({
        loan_id: loan_id,
        status: "approved"
      })
    })
    .then( res => res.json() )
  }

  static completeLoanRequest(loan_id){
    return fetch(`${this.url() + '/' + loan_id}`, {
      method: 'PATCH',
      headers: headers(),
      body: JSON.stringify({
        loan_id: loan_id,
        status: "complete"
      })
    })
    .then( res => res.json() )
  }

  static rejectLoanRequest(loan_id){
    return fetch(`${this.url() + '/' + loan_id}`, {
      method: 'DELETE',
      headers: headers(),
      body: JSON.stringify({
        loan_id: loan_id,
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
