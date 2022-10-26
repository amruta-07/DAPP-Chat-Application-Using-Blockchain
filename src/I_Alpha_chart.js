import React from 'react'
import "./style.css";

function I_Alpha_chart(props) {
  return (
    <div className="summary">
          <div className=" summary-header">
            <p>Net Change</p>
          </div>
          <div className="summary-text">
            <p>Profit</p>
            <p> {props.profit||0}</p>
          </div>
          <div className="summary-text">
            <p>loss</p>
            <p> {props.loss||0}</p>
          </div>
          <div className="summary-text">
            <p>Net</p>
            <p> {props.net||0}</p>
          </div>
        </div>
  )
}

export default I_Alpha_chart