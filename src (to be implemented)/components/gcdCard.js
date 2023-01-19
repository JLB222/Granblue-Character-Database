import React from "react"

function gcdCard(props) {
    return <div>
      <h2>{props.Name}</h2>
      <h3>{props.Element}</h3>
      <h3>{props.Rarity}</h3>
      <h4>{props.Specialty1}</h4>
      <h4>{props.Specialty2}</h4>
    </div>
  }


  export default gcdCard