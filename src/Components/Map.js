import React,{ useState} from 'react'
import "./Map.css"
import  { GoogleMap, useJsApiLoader ,Marker,InfoWindow} from '@react-google-maps/api';

export default function Map(props) {
    
    const [infoWindowVisible, setInfoWindowVisible] = useState(false);
    const center = {
        lat: props.data._geoloc.lat,
        lng: props.data._geoloc.lng
      };
    
    const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: "AIzaSyAjxpJcSdf7dnbP8rj6bPFku1uFUHgNwco"
    })
   
    
      
    
  
    return isLoaded ? (
        
        <GoogleMap
          mapContainerClassName="mapa"
          center={center}
          zoom={17}
          id="map"
        >
            <Marker
                title={center.lat+","+center.lng}
                position={center}
                onClick={() =>{setInfoWindowVisible(true)}}
                clickable={true}
                animation="DROP"
            >
                {infoWindowVisible&&(<InfoWindow
                    anchor={new window.google.maps.Point(0,-100)}
                    onCloseClick={() =>{setInfoWindowVisible(false)}}
                    >
                        <div className="pop"><p>{center.lat+","+center.lng}</p></div>

                </InfoWindow>)}
            </Marker>  
             <></>
        </GoogleMap>
        
    ) : <></>
  }



           
               