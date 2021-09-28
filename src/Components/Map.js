import React,{ useState,useEffect} from 'react'
import { Row, Col,DatePicker}  from 'antd';
import "./Map.css"
import  { GoogleMap, useJsApiLoader ,Marker,InfoWindow,Polyline} from '@react-google-maps/api';


export default function Map(props) {
    
    const [infoWindowVisible, setInfoWindowVisible] = useState(false);
    const { RangePicker } = DatePicker;
    const [PollyneData,setPollyneData]=useState([]);
    const [Range,setRange]=useState([]);
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
    const fecha= (m,ds )=>{
      setRange(ds)//Async
      console.log(Range)//Sync
    }
    console.log(Range)
    const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: "AIzaSyAjxpJcSdf7dnbP8rj6bPFku1uFUHgNwco"
    })
   
    

  
    return isLoaded ? (
      <>
        
       
      
  

        <GoogleMap
          mapContainerClassName="mapa"
          center={PollyneData[0]}
          zoom={14}
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
        </GoogleMap>
        <br>
        </br>

        <Row gutter={[16, 24]}>
      <Col className="gutter-row" span={12}>
          <ul>
            <li className="lista">Latitud</li>
            <li  className="lista">
              <div className="faketextArea" ></div>
            </li>
          </ul>
      </Col>
      <Col className="gutter-row" span={12}>
          <ul>
            <li className="lista">Longuitud</li>
            <li className="lista">
              <div className="faketextArea" ></div>
            </li>
          </ul>
      </Col>
      <Col className="gutter-row" span={12}>
          <ul>
            <li className="lista">Fecha</li>
            <li className="lista">
              <div className="faketextArea" ></div>
            </li>
          </ul>
      </Col>
      <Col className="gutter-row" span={12}>
          <ul>
            <li className="lista">Hora</li>
            <li className="lista">
              <div className="faketextArea" ></div>
            </li>
          </ul>
      </Col>
      <Col className="gutter-row" span={24}>
        
        <RangePicker
          showTime={{ format: 'HH:mm' }}
          format="YYYY-MM-DD HH:mm"
          onChange={fecha}
          
        />
      </Col>
   
    </Row>


      </>
    ) : <></>
  }



           
               