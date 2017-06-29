import React from 'react'

export default function GoogleResult (props) {
  const { title } = props.result.volumeInfo
  const { thumbnail } = props.result.volumeInfo.imageLinks

  return(
    <div className="googleBook" id={props.result.id} onClick={props.handleClick}>
      <img src={thumbnail} alt={title} />
    </div>
  )
}
