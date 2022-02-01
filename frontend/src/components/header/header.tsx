import React from "react";
import Input from "../UI/input/input"

const Header = () => {

  return (
    <div className="app__header">
      <div className="app__header-wrapper">
        <a className="app__logo">
          <img src="image/logo2.png" width="130" height="50" alt="logo"/>
        </a>
        <div className="app__header-input">
          <Input id="bpm" type="number"/>
          <Input id="beats" type="number"/>
        </div>
      </div>
    </div>
  )
}

export default Header
