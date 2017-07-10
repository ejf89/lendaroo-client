import React, { Component } from 'react'
import GoogleResult from './GoogleResult'
import { Row, Col } from 'react-bootstrap'



export default class GoogleSearch extends Component{
  constructor(props){
    super(props)
    this.state = {
      searchTerm: '',
      highLightedDivs: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.storeHighLightedDivs = this.storeHighLightedDivs.bind(this)
    this.addSelectionsToStagedBooks = this.addSelectionsToStagedBooks.bind(this)
    this.createAndResetHighLightedDivs = this.createAndResetHighLightedDivs.bind(this)
  }

  handleChange(e){
    this.setState({
      searchTerm: e.target.value
    })
  }

  handleSubmit(e){
    if (this.state.searchTerm === ''){
      return alert('Please enter a search term')
    }
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
    this.storeHighLightedDivs(gDiv)
  }

  storeHighLightedDivs(gDiv){
    this.setState( (previousState) => {
      return {
        highLightedDivs: [...previousState.highLightedDivs, gDiv]
      }
    })
  }

  createAndResetHighLightedDivs(){
    this.props.onCreate()
    this.state.highLightedDivs.forEach( div => div.className = "googleBook")
  }

  addSelectionsToStagedBooks(gDiv){
    let searchResults = this.props.searchResults
    const gBookIndex = searchResults.findIndex( el => el.id === gDiv.id)
    this.props.stagedBooks.push(searchResults[gBookIndex])
    console.log(this.props.stagedBooks)
  }

  render(){
    return(
      <div id="googleSearchContainer">
        <h1>Search The Whole Internet</h1>
        <button onClick={this.createAndResetHighLightedDivs} className="btn btn-lg btn-block addGButton">Add Selections!</button>
        <form onSubmit={this.handleSubmit}>
        <div id="g-search" className="input-group">
            <input type="text" className="form-control" name="searchTerm" onChange={this.handleChange} value={this.state.searchTerm} placeholder="Search Books to Add to your collection!" />
            <span className="input-group-btn">
          <button onClick={this.handleSubmit}className="btn btn-secondary searchGo" type="submit">Go!</button>
        </span>
        </div>
      </form>

        <Row>
          <Col md={12} >
            {this.props.searchResults.map( result => <GoogleResult key={result.id} result={result} handleClick={this.handleClick}/> )}
          </Col>
        </Row>
      </div>
    )
  }
}
