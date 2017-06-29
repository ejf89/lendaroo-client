import React from 'react'

export default function GoogleResult (props) {
  const { title } = props.result.volumeInfo
  const { thumbnail } = props.result.volumeInfo.imageLinks ? props.result.volumeInfo.imageLinks : '/Users/ericfarber/Development/Projects/Lendaroo/lendr_api/app/assets/images/smiley.jpg'

  return(
    <div className="googleBook" id={props.result.id} onClick={props.handleClick}>
      <img src={thumbnail} alt={title} />
    </div>
  )
}
