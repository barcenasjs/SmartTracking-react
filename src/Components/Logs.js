import React, { Component } from 'react'
import "./Log.css"

export default class Logs extends Component {
    

    render() {
        return (
            <div className="grid">
                <div className="a"></div>
                
                
                <div className="b"></div>
                <div className="subgrid">
                    <ul>
                        <li >Latitud</li>
                        <li >
                            <textarea>

                            </textarea>
                        </li>
                    </ul>
                </div>
                <div className="c"></div>
                <div className="subgrid">
                    <ul>
                        <li >Longuitud</li>
                        <li >
                            <textarea>

                            </textarea>
                        </li>
                    </ul>
                    </div>
                
                
                <div className="subgrid"></div>
                
                <div className="subgrid">
                    <ul>
                        <li >Fecha</li>
                        <li >
                            <textarea>
                            
                            </textarea>
                        </li>
                    </ul>
                </div>
                
                <div className="subgrid">
                    <ul>
                        <li >Hora</li>
                        <li >
                            <textarea>

                            </textarea>
                        </li>
                    </ul>
                </div>
                
                
            </div>
        )
    }
}
