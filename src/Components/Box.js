import React, { Component } from 'react'
import Aboutus  from './Aboutus';
import Logs from './Logs';
import Maps from './Map';
export default class Box extends Component {
    Boxstyle(){
        return{
            "background-color": "rgba(19, 161, 180, 0.876)",
            margin: "30px 60px",
            height: "800px",
            top: "-50px",
            "border-radius": "20px",

        }
    }
    Content(props){
        if (this.props.contenido === "Home"){
            return <p style={{"margin-block-start": "0px",
        padding: "10px"}}></p>
        }else if(this.props.contenido === "Maps"){
            return <Maps data={this.props.data}></Maps>
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


