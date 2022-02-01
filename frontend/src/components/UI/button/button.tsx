import React from 'react';


const Button:React.FC = ({children, ...props}) => {

  return (
    <button {...props} className="button">
      {children}
    </button>
  )
}



export default Button
