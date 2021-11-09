import React, { useState, useEffect } from "react";
import { Row, Col, DatePicker, Button, Select } from "antd";
import "./History.css";
import imagen from "./parada-de-taxi.png";
import imagen2 from "./parada-de-taxi_2.png";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Circle,
  Polyline,
  InfoWindow,
} from "@react-google-maps/api";
import { position } from "../service/feathers";

export default function Historico(props) {
  const { RangePicker } = DatePicker;
  const [historyCount, setHistoryCount] = useState([]); 
  const [markerInfo, setMarkerInfo] = useState(false);
  const [carCount, setCarCount] = useState("1");
  const [markers, setMarkers] = useState([]);
  const [select, setSelect] = useState(null);

  //new data
  const [dataCar1, setDataCar1] = useState([]);
  const [dataCar2, setDataCar2] = useState([]);

  useEffect(() => {
    position
      .find({
        query: { $limit: 10000 },
      })
      .then((res) => {
        const car1 = res.data
          .filter((el) => el.user_id === 1)
          .map((el) => {
            return { lat: parseFloat(el.lat), lng: parseFloat(el.lng) ,date:el.date};
          });
        const car2 = res.data
          .filter((el) => el.user_id === 9)
          .map((el) => {
            return { lat: parseFloat(el.lat), lng: parseFloat(el.lng) ,date:el.date};
          });

        setDataCar1(car1);
        setDataCar2(car2);
      })
      .catch((e) => {
        alert(e);
      });
  }, []);

  useEffect(() => {
    if (props?.data[0]?.position && historyCount.length === 0) {
      const positions = props.data.map((el) => {
        const objPositions = JSON.parse(el.position);

        return {
          lat: objPositions._geoloc.lat,
          lng: objPositions._geoloc.lng,
          date: objPositions._geoloc.date,
        };
      });
      setHistoryCount([positions[positions.length - 1]]);
    }
  }, [props.data]);

  const getDataFiltered = (Range) => {
    position.find({ query: { $limit: 10000 } }).then((res) => {
      const car1 = res.data
        .filter((el) => el.user_id === 1)
        .map((el) => {
          return { lat: parseFloat(el.lat), lng: parseFloat(el.lng) ,date:el.date};
        })
        .filter((el) => {
          return new Date(Range[0]).getTime() < new Date(el.date).getTime();
        })
        .filter((el) => {
          return new Date(el.date).getTime() < new Date(Range[1]).getTime();
        });

      const car2 = res.data
        .filter((el) => el.user_id === 9)
        .map((el) => {
          return { lat: parseFloat(el.lat), lng: parseFloat(el.lng) ,date:el.date};
        })
        .filter((el) => {
          return new Date(Range[0]).getTime() < new Date(el.date).getTime();
        })
        .filter((el) => {
          return new Date(el.date).getTime() < new Date(Range[1]).getTime();
        });
      setDataCar1(car1);
      setDataCar2(car2);
    });
  };

  const { Option } = Select;
  function handleChange(value) {
    setCarCount(value);
    console.log(`selected ${value}`);
  }
  function longuitud(a,b){
    let R = 6378137;
    let dLat = (b.lat- a.lat)*Math.PI/180;
    let dLong = (b.lng - a.lng)*Math.PI/180;
    let d = Math.sin(dLat / 2)
            *
            Math.sin(dLat / 2) 
            +
            Math.cos(a.lat*Math.PI/180) 
            * 
            Math.cos(a.lat*Math.PI/180) 
            *
            Math.sin(dLong / 2) 
            * 
            Math.sin(dLong / 2);

    let c = 2 * Math.atan2(Math.sqrt(d), Math.sqrt(1 - d));
    let distance = R * c;
    return distance;
  }

function punto2(q){
  if (carCount == "1") {
    var fechas=""
    
    dataCar1.forEach((element) => {
      if(Math.abs(longuitud(q,element))<50){
          fechas=fechas+","+element.date
      }})
    if (fechas==""){
      fechas=" El vehículo no ha pasado por acá"
    }  
    return(fechas)
  } else if(carCount == "2"){
    var fechas=""
    
    dataCar2.forEach((element) => {
      if(Math.abs(longuitud(q,element))<50){
          fechas=fechas+","+element.date
      }})
    if (fechas==""){
      fechas=" El vehiculo no ha pasado por acá"
    }  
    return(fechas)
  }else{
    var fechas=""
    var fechas2=""
    dataCar1.forEach((element) => {
      if(Math.abs(longuitud(q,element))<50){
          fechas=fechas+","+element.date
      }})
    dataCar2.forEach((element) => {
        if(Math.abs(longuitud(q,element))<50){
            fechas2=fechas2+","+element.date
      }})
    if (fechas==""){
        fechas=" El vehiculo no ha pasado por acá"
    }
    if (fechas2==""){
      fechas2=" El vehiculo no ha pasado por acá"

  }
    return(<><p>Vehículo 1 {fechas}
      </p>
      <p>Vehículo 2 {fechas2}
      </p></>)
  }
  
}


  
  const fecha = (m, ds) => {
    if (ds[1] == "") {
    } else {
      getDataFiltered(ds);
      console.log(Range); //Sync
      
    }
  };

  
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAjxpJcSdf7dnbP8rj6bPFku1uFUHgNwco",
  });

  return isLoaded ? (
    <>
      <br></br>
      <Row gutter={[16, 24]}>
        <Col className="gutter-row" span={8}>
          <RangePicker
            showTime={{ format: "HH:mm" }}
            format="YYYY-MM-DD HH:mm"
            onChange={fecha}
            
          />
        </Col>
        <Col className="gutter-row" span={8}>
          <Select
            defaultValue={`Vehículo ${carCount}`}
            style={{ width: 120 }}
            onChange={handleChange}
          >
            <Option value="1">Vehículo 1</Option>
            <Option value="2">Vehículo 2</Option>
            <Option value="3">Ambos</Option>
          </Select>
        </Col>
        <Col className="gutter-row" span={8}>
          <Button onClick={()=>{setMarkers([])}}>Limpiar Markers</Button>
          
        </Col>
      </Row>
      <GoogleMap
        mapContainerClassName="mapa"
        center={carCount === "1"
        ? dataCar1[dataCar1.length - 1]
        : carCount === "2"
        ? dataCar2[dataCar2.length - 1]
        : null}
        options={{clickable:true,
                  disableDefaultUI:true,
                  zoomControl:true,
                  styles:[{
                    featureType: "poi",
                    elementType: "labels",
                    stylers: [{ visibility: "off" }]},
                    {
                      featureType: "administrative", 
                      elementType: "labels",
                      stylers: [{ visibility: "off" }]}
                  
                  ]
                }}
        onClick={(event)=>{
          setMarkers([...markers,{
            
            lng: event.latLng.lng() ,
            lat: event.latLng.lat(),
            id: markers.length+1
          }])
        }}
        zoom={14}
        id="map"
      >
        {carCount === "2" || carCount === "3" ? (
          <Marker
            icon={imagen2}
            position={dataCar2[dataCar2.length - 1]}
            clickable
            onClick={() => {
              setMarkerInfo(!markerInfo);
            }}
          >
            {markerInfo ? (
              <InfoWindow
                position={dataCar2[dataCar2.length - 1]}
                shouldFocus={false}
              >
                <div>
                  <h3>Vehículo 2</h3>

                  <p>{"Lng: " + dataCar2[dataCar2.length - 1].lng }</p>
                  <p>{"Lat: " + dataCar2[dataCar2.length - 1].lat}</p>
                  <p>{"Fecha: " + dataCar2[dataCar2.length - 1].date}</p>
                  <p>{"RPM: " + "null"}</p>
                </div>
              </InfoWindow>
            ) : null}
          </Marker>
        ) : null}

        {carCount === "1" || carCount === "3" ? (
          <Marker
            icon={imagen}
            position={dataCar1[dataCar1.length - 1]}
            clickable
            onClick={() => {
              setMarkerInfo(!markerInfo);
            }}
          >
            {markerInfo ? (
              <InfoWindow
                position={dataCar1[dataCar1.length - 1]}
                shouldFocus={false}
              >
                <div>
                  <h3>Vehículo 1</h3>
                  <p>{"Lng: " + dataCar1[dataCar1.length - 1].lng}</p>
                  <p>{"Lat: " + dataCar1[dataCar1.length - 1].lat}</p>
                  <p>{"Fecha: " + dataCar1[dataCar1.length - 1].date}</p>
                  <p>{"RPM: " + "null"}</p>
                </div>
              </InfoWindow>
            ) : null}
          </Marker>
        ) : null}

        {carCount === "2" || carCount === "3" ? (
          <Polyline
            path={dataCar2}
            options={{
              strokeColor: "#006400",
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: "#006400",
              fillOpacity: 0.35,
              clickable: true,
              draggable: false,
              editable: false,
              visible: true,
              radius: 30000,
              paths: dataCar2,
              zIndex: 1,
            }}
          ></Polyline>
        ) : null}

        {carCount === "1" || carCount === "3" ? (
          <Polyline
            path={dataCar1}
            options={{
              strokeColor: "#FF0000",
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: "#FF0000",
              fillOpacity: 0.35,
              clickable: true,
              draggable: false,
              editable: false,
              visible: true,
              radius: 30000,
              paths: dataCar1,
              zIndex: 1,
            }}
          ></Polyline>
        ) : null}

            {markers.map((marker)=>{return(<><Marker 
            key={marker.id} 
            position={{lat:marker.lat,lng:marker.lng}}
            onClick={()=>{setSelect(marker)}}
            
            >
            </Marker>
            <Circle 
            center={{lat:marker.lat,lng:marker.lng}} 
            
            options={{strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            clickable: false,
            draggable: false,
            editable: false,
            visible: true,
            radius: 50,
            zIndex: 1}}>
              </Circle></>)})}

              {select?(
                <InfoWindow position={{lat:select.lat,lng:select.lng}}
                onCloseClick={()=>{setSelect(null)}}>
                  <div>
                    {punto2(select)}
                  </div>
                  
                </InfoWindow>
                
                
                
                
                ):null}





      </GoogleMap>
      <br></br>
    </>
  ) : (
    <></>
  );
}
