import React, { Component } from 'react'
import "./Map.css"

export default class Map extends Component {
    render(props) {
        return (
            <div>
                <iframe 
                className="mapa" 
                title="mapa" 
                frameborder="0" 
                src={"https://www.google.com/maps/embed/v1/place?key=AIzaSyAjxpJcSdf7dnbP8rj6bPFku1uFUHgNwco&q="+this.props.data._geoloc.lat+","+this.props.data._geoloc.lng+"&zoom=15"}
                allowfullscreen>

                </iframe>
            </div>
        )
    }
}
