import React, { Component } from 'react'
import GoogleResult from './GoogleResult'

export default class GoogleSearch extends Component{
  constructor(props){
    super(props)
    this.state = {
      searchTerm: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.addSelectionsToStagedBooks = this.addSelectionsToStagedBooks.bind(this)
  }

  handleChange(e){
    this.setState({
      searchTerm: e.target.value
    })
  }

  handleSubmit(e){
    e.preventDefault()
    console.log('search = ' + this.state.searchTerm)
    this.props.fireSearch(this.state.searchTerm)
    this.setState({ searchTerm: '' })
  }

  handleClick(e){
    let gDiv = e.target.parentElement
    if (gDiv.className !== "googleBook selected"){
      gDiv.className = "googleBook selected"
    } else {
      gDiv.className = "googleBook"
    }
    this.addSelectionsToStagedBooks(gDiv)
  }

  addSelectionsToStagedBooks(gDiv){
    let searchResults = this.props.searchResults
    const gBookIndex = searchResults.findIndex( el => el.id === gDiv.id)
    this.props.stagedBooks.push(searchResults[gBookIndex])
    console.log(this.props.stagedBooks)
  }

  render(){
    return(
      <div>
        <h1>Search Dem Gyoogal</h1>
        <button onClick={this.props.onCreate} className="btn btn-primary">Add Selections!</button>
        <div id="g-search" className="input-group">
            <input type="text" className="form-control" name="searchTerm" onChange={this.handleChange} value={this.state.searchTerm} placeholder="Search Books to Add to your collection!" />
            <span className="input-group-btn">
          <button onClick={this.handleSubmit}className="btn btn-secondary" type="button">Go!</button>
        </span>
        </div>

        <div className="row">
          {this.props.searchResults.map( result => <GoogleResult key={result.id} result={result} handleClick={this.handleClick}/> )}
        </div>
      </div>
    )
  }
}
