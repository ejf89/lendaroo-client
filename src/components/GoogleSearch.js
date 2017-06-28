import React, { Component } from 'react'
import GoogleResult from './GoogleResult'

export default class GoogleSearch extends Component{
  constructor(){
    super()
    this.state = {
      searchTerm: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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

  render(){
    return(
      <div>
        <h1>Search Dem Gyoogal</h1>
        <div className="input-group">
            <input type="text" className="form-control" name="searchTerm" onChange={this.handleChange} value={this.state.searchTerm} placeholder="Search Books to Add to your collection!" />
            <span className="input-group-btn">
          <button onClick={this.handleSubmit}className="btn btn-secondary" type="button">Go!</button>
        </span>
        </div>

        {this.props.searchResults.map( result => <GoogleResult result={result} /> )}

      </div>
    )
  }
}
