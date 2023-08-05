import React from 'react'
import {ReactComponent as Loader} from './comp/preloader.svg';
import './Loading.css'

const LoadingOverlay = ({errstat}) => {
  return (
    <div className="loading-overlay">
        <div className="loading-container">
            <Loader />
           {
            errstat ? 
            <p style={{color:'white', fontFamily:'quantico', textAlign:'center'}}>server error : bruh moment 500</p> :
            <p style={{color:'white', fontFamily:'quantico'}}>l o a d i n g...</p>
           }
        </div>
    </div>
  )
}

export default LoadingOverlay