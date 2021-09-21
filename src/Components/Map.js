import React,{ useState,useEffect} from 'react'
import "./Map.css"
import  { GoogleMap, useJsApiLoader ,Marker,InfoWindow,Polyline} from '@react-google-maps/api';


export default function Map(props) {
    
    const [infoWindowVisible, setInfoWindowVisible] = useState(false);
    
    const [PollyneData,setPollyneData]=useState([]);
    useEffect(()=>{
      console.log(props.data)
      if(props?.data[0]?._geoloc?.lng){
        setPollyneData([...PollyneData,{lat:props.data[0]._geoloc.lat,lng:props.data[0]._geoloc.lng}])
        console.info(PollyneData)
      }
      
    },[props.data]) 


    try {
      const center = {lat: props.data[1]._geoloc.lat,
        lng: props.data[1]._geoloc.lng,};
    } catch  {
      const center = {lat: 10.5,
        lng: -74}; 
    }
    
    
    const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: "AIzaSyAjxpJcSdf7dnbP8rj6bPFku1uFUHgNwco"
    })
   
    
      
    
  
    return isLoaded ? (
        
        <GoogleMap
          mapContainerClassName="mapa"
          center={PollyneData[0]}
          zoom={12}
          id="map"
        >
            <Marker
            position={PollyneData[PollyneData.length-1]}
            >
            </Marker>

            <Polyline
            path={PollyneData}
            options={{
              strokeColor: '#FF0000',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#FF0000',
              fillOpacity: 0.35,
              clickable: false,
              draggable: false,
              editable: false,
              visible: true,
              radius: 30000,
              paths:PollyneData,
              zIndex: 1}}
            >


            </Polyline>
             <></>
        </GoogleMap>
        
    ) : <></>
  }



           
               