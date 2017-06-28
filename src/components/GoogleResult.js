import React from 'react'

export default function GoogleResult (props) {
  return(
    <div>{props.result.volumeInfo.title}</div>
  )
}
