import React, { Component } from "react";
import "./Box.css";
import Maps from "./Map";
import Historico from "./History.js";
export default class Box extends Component {
 
  Content(props) {
    if (this.props.contenido === "Home") {
      return <p style={{ "margin-block-start": "0px", padding: "10px" }}></p>;
    } else if (this.props.contenido === "Maps") {
      return (
        <Maps data={this.props.data} realTimeData={this.props.realTime}></Maps>
      );
    } else if (this.props.contenido === "Historico") {
      return <Historico data={this.props.data} realTimeData={this.props.realTime}></Historico>;
    }
  }

  render(props) {
    return <div className="box">{this.Content()}</div>;
  }
}
