import React from "react";

import "../styles/components/Banner.css";

import HappyLogo from "../images/Logotipo.png";

export default function Banner() {
  return (
    <div className="login-logo">
      <img src={HappyLogo} alt="Happy Logo"  />
      <div className="location">
        <strong>Rio Grande do Norte</strong>
        <span>Mossoró</span>
      </div> 
    </div>
  )
}
