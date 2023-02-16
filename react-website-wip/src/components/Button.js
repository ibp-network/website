import React from 'react'
import {Link} from "react-router-dom";


export default function Button({content, link}) {
  return(
    <Link to={link}>
      <div>
        <div className={"button"}>
            <h4 className={"alt"}>{content}</h4>
        </div>
      </div>
    </Link>
  )
}
