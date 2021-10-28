import React, { useState, useEffect } from "react";
import { Row, Col, DatePicker, Button, Select } from "antd";
import "./Map.css";
import imagen from "./parada-de-taxi.png";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Circle,
  Polyline,
  InfoWindow,
} from "@react-google-maps/api";
import moment from "moment";
import { on } from "../Server";
import { position } from "../service/feathers";

export default function Map(props) {
  const { RangePicker } = DatePicker;
 
  const [markerInfo, setMarkerInfo] = useState(false);
  const [markerInfo2, setMarkerInfo2] = useState(false);
  const { Option } = Select;

 
  console.log(Range);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAjxpJcSdf7dnbP8rj6bPFku1uFUHgNwco",
  });

  return isLoaded ? (
    <>
      <Row gutter={[16, 24]}>
        <Col>
          {" "}
          <b></b>{" "}
        </Col>
        <Col className="gutter-row" span={24}>
          <Select
            defaultValue="Vehículo 1"
            style={{ width: 120 }}
            onChange={handleChange}
          >
            <Option value="Vehículo 1">Vehículo 1</Option>
            <Option value="Vehículo 2">Vehículo 2</Option>
            <Option value="Ambos">Ambos</Option>
          </Select>
        </Col>
      </Row>
      <GoogleMap
        mapContainerClassName="mapa"
        center={PollyneData[1]}
        zoom={14}
        onClick={}
        id="map"
      >
      {/*Vehiculo 1*/}        
      <Polyline
          path={ }
          options={{
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.35,
            clickable: true,
            draggable: false,
            editable: false,
            visible: ,
            radius: 30000,
            paths:  ,
            zIndex: 1,
          }}
          
          >
        

        </Polyline>
        
        
        <Marker
        icon={imagen}
        position={
            
        }
        options={{
          clickable:,
          visible:

        }}
        
        onClick={()=> {

          setMarkerInfo(!markerInfo)
        }}
        
        >{markerInfo?(<InfoWindow 
            position={
              
            } > 
        
            <div>
            <h3>
              Vehículo 1
            </h3>
    
              <p>{"Lng: "+}</p>
                <p>{ "Lat: " }
                </p>
                <p>{ "Date: "}
                </p>
            </div>
    
            </InfoWindow>):null}
        
        </Marker>
        {/*Vehiculo 2*/}
        <Polyline
          path={}
          options={{
            strokeColor: "#0000FF",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#0000FF",
            fillOpacity: 0.35,
            clickable: true,
            draggable: false,
            editable: false,
            visible: ,
            radius: 30000,
            paths: ,
            zIndex: 1,
          }}
        ></Polyline>  
        <Marker
        icon={imagen}
        position={history? PollyneData[PollyneData.length - 1]:null
            
        }
        options={{
          clickable:,
          visible:

        }}
        
        onClick={()=> {

          setMarkerInfo2(!markerInfo2)
        }}
        
        >{markerInfo2?(<InfoWindow 
            position={
              history
                ? PollyneData[PollyneData.length - 1]
                : null
            } > 
        
            <div>
            <h3>
              Vehículo 2
            </h3>
    
                <p>{"Lng: "+}</p>
                <p>{ "Lat: " }
                </p>
                <p>{ "Date: "}
                </p>
            </div>
    
            </InfoWindow>):null}
        
        </Marker>

      </GoogleMap>
      <br></br>
    </>
  ) : (
    <></>
  );
}
