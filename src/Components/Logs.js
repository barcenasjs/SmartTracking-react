import React, { Component } from "react";
import "./Log.css";
import moment from "moment";

export default class Logs extends Component {
  render() {
    const date = new Date();

    return (
      <div className="grid">
        <div className="a"></div>

        <div className="b"></div>
        <div className="subgrid">
          <ul>
            <li>Latitud</li>
            <li>
              <textarea>{"Lat: " + this.props.data._geoloc.lat}</textarea>
            </li>
          </ul>
        </div>
        <div className="c"></div>
        <div className="subgrid">
          <ul>
            <li>Longuitud</li>
            <li>
              <textarea>{"Lng: " + this.props.data._geoloc.lng}</textarea>
            </li>
          </ul>
        </div>

        <div className="subgrid"></div>

        <div className="subgrid">
          <ul>
            <li>Fecha</li>
            <li>
              <textarea>{moment(date).format("YYYY-MM-DD")}</textarea>
            </li>
          </ul>
        </div>

        <div className="subgrid">
          <ul>
            <li>Hora</li>
            <li>
              <textarea>{moment(date).format("HH:mm:ss")}</textarea>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
