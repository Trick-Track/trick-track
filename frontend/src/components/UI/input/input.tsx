import React from 'react';
import {InputType} from '../../../data/types';

const Input = (props) => {
  let {id, className, label,  ...attrs} = props

  let classNames;


  return (
    <div className='input-fieldset'>
      <input
        name={id}
        className={classNames}
        {...attrs}
      />
      {label &&
        <label className='input-label' htmlFor={id}>{label}</label>}
    </div>
  )
}

export default Input
