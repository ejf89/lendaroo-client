import React from 'react'

export default function GoogleResult (props) {
  const { title } = props.result.volumeInfo
  const { thumbnail } = props.result.volumeInfo.imageLinks

  return(
    <div className="googleBook">
      <img src={thumbnail} />
    </div>
  )
}
