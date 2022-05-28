import React, { useEffect } from 'react'

const Alert = ({msg,type,removeAlert,list}) => {
   useEffect(()=>{
    const timeout =setTimeout(() => {
      removeAlert()
    },3000);
   return ()=> clearTimeout(timeout);
   },[list])
    

  return  <div className={`alert alert-${type}`} style={{height:"10px",marginBottom:'10px',display:"flex",justifyContent:'center',alignItems:'center'}}>{msg}</div>
  
}

export default Alert