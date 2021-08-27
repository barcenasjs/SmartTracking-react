import React, { Component } from 'react'
import Aboutus  from './Aboutus';
import Logs from './Logs';
export default class Box extends Component {
    Boxstyle(){
        return{
            "background-color": "rgba(19, 161, 180, 0.876)",
            margin: "30px 60px",
            height: "500px",
            top: "-50px",
            "border-radius": "20px",

        }
    }
    Content(props){
        if (this.props.contenido === "Home"){
            return <p style={{"margin-block-start": "0px",
        padding: "10px"}}>Este proyecto esta elaborado por los estudiantes tlataltal con el fin 
        de visualizar los datos de la ubicación geografica enviados desde los dispositivos gps</p>
        }else if(this.props.contenido === "Maps"){
            return <p style={{"margin-block-start": "0px",
            padding: "10px"}}>Este proyecto esta elaborado por los estudiantes tlataltal con el fin 
            de visualizar los datos de la ubicación geografica enviados desde los dispositivos gps</p>
        }else if(this.props.contenido === "Log"){
            return <Logs></Logs>
        }else if(this.props.contenido === "About us"){
            return  <Aboutus></Aboutus>
        }
    }

    render(props) {
        return (
            <div style={this.Boxstyle()}>
                {this.Content()}
            </div>
        )
    }
}


