import React, { Component } from 'react'

export default class Logs extends Component {
    estilo(a){
        if(a==1){
            return{
                display: "grid",
                "grid-template-columns": "auto auto auto auto  auto",
                padding: "10px"
            }
        }else if(a==2){
            return{
                
                padding: "20px",
                "font-size": "30px",
                "text-align": "center"
            }
        }else if(a==3){
            return{
                "list-style": "none",
                
                "font-size": "25px",
                "text-align": "center"
            }
        }
    }

    render() {
        return (
            <div style={this.estilo(1)}>
                <div style={this.estilo(2)}></div>
                <div style={this.estilo(2)}></div>
                <div style={this.estilo(2)}></div>
                <div style={this.estilo(2)}></div>
                <div style={this.estilo(2)}></div>
                <div style={this.estilo(2)}></div>
                <div style={this.estilo(2)}><ul>
                    <li style={this.estilo(3)}>Latitud</li>
                    <li style={this.estilo(3)}><textarea></textarea></li>
                    </ul></div>
                <div style={this.estilo(2)}></div>
                <div style={this.estilo(2)}><ul>
                    <li style={this.estilo(3)}>Longuitud</li>
                    <li style={this.estilo(3)}><textarea></textarea></li>
                    </ul></div>
                
                
                <div style={this.estilo(2)}></div>
                <div style={this.estilo(2)}></div>
                <div style={this.estilo(2)}><ul>
                    <li style={this.estilo(3)}>Fecha</li>
                    <li style={this.estilo(3)}><textarea></textarea></li>
                    </ul></div>
                <div style={this.estilo(2)}></div>
                <div style={this.estilo(2)}><ul>
                    <li style={this.estilo(3)}>Hora</li>
                    <li style={this.estilo(3)}><textarea></textarea></li>
                    </ul></div>
                
                
            </div>
        )
    }
}
