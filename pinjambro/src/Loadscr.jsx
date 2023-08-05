import React from 'react'

import {ReactComponent as Loader} from './comp/preloader.svg';

const Loadscr = () => {
  return (
    <div style={{width:'100%', height:'100vh', overflow:'hidden', display:'flex', justifyContent:'center', alignItems:'center'}}>
        <Loader />
    </div>
  )
}

export default Loadscr