import React from 'react'
// import {} from "react-icons/bi";
import "./Button.css"


export const ButtonOne = (props) => {
  return (
    <div>
       <div onClick={props.onClick} className='login-btn'> <div className="button-logo">{props.logo}</div>{props.title}</div>
    </div>
  )
}

export const ButtonTwo = (props) => {
  return (
    <div>
       <div onClick={props.onClick} className='clear-btn'> <div className="button-logo">{props.logo}</div>{props.title}</div>
    </div>
  )
}
