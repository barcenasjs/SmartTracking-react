import React, { useState, useEffect } from "react";
import { Row, Col, DatePicker, Button , Select} from "antd";
import "./History.css";
import imagen from "./parada-de-taxi.png";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Circle,
  Polyline,
  InfoWindow
} from "@react-google-maps/api";
import moment from "moment";

export default function Historico(props) {
  const { RangePicker } = DatePicker;
  const [PollyneData, setPollyneData] = useState([]);
  const [Range, setRange] = useState([]);
  const [history, setHistory] = useState(false);
  const [historyCount, setHistoryCount] = useState([]);
  const [CAR1, setCAR1] = useState(true);
  const [CAR2, setCAR2] = useState(false);
  const [markerInfo,setMarkerInfo]=useState(false);

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



  useEffect(() => {
    if (props?.data[0]?.position) {
      if (Range.length !== 0) {
        const positions = props.data
          .map((el) => {
            const objPositions = JSON.parse(el.position);

            return {
              lat: objPositions._geoloc.lat,
              lng: objPositions._geoloc.lng,
              date: objPositions._geoloc.date,
            };
          })
          .filter((el) => {
            return new Date(Range[0]).getTime() < new Date(el.date).getTime();
          })
          .filter((el) => {
            return new Date(el.date).getTime() < new Date(Range[1]).getTime();
          });

        setPollyneData(positions);
      } else {
        const positions = props.data.map((el) => {
          const objPositions = JSON.parse(el.position);

          return {
            lat: objPositions._geoloc.lat,
            lng: objPositions._geoloc.lng,
            date: objPositions._geoloc.date,
          };
        });
        setPollyneData(positions);
      }
    }
  }, [props.data, Range]);

  const { Option } = Select;
  function handleChange(value) {
    console.log(`selected ${value}`);
  }


  try {
    const center = {
      lat: props.data[1]._geoloc.lat,
      lng: props.data[1]._geoloc.lng,
    };
  } catch {
    const center = { lat: 10.5, lng: -74 };
  }
  const fecha = (m, ds) => {
    if (ds[1] == "") {
    } else {
      setRange(ds); //Async
      console.log(Range); //Sync
      setHistory(true);
    }
  };

  console.log(Range);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAjxpJcSdf7dnbP8rj6bPFku1uFUHgNwco",
  });

  return isLoaded ? (
    <>
        <br></br>
        <Row gutter={[16, 24]}>
            <Col className="gutter-row" span={12}>
            <RangePicker
                showTime={{ format: "HH:mm" }}
                format="YYYY-MM-DD HH:mm"
                onChange={fecha}
            />
            </Col>
            <Col className="gutter-row" span={12}>
            
            <Select defaultValue="Vehículo 1" 
            style={{ width: 120 }} 
            onChange={(value)=>{if (value==="Vehículo 1"){
              setCAR1(true)
              setCAR2(false)

            }else if(value==="Vehículo 2"){
              setCAR1(false)
              setCAR2(true)
            }else{
              setCAR1(true)
              setCAR2(true)
            }
            console.log(value)
            }}
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
        onClick={(e)=>{console.log(e)}}
        id="map"
      >
      {/*Vehiculo 1*/}        
      <Polyline
          path={history ? PollyneData : historyCount }
          options={{
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.35,
            clickable: true,
            draggable: false,
            editable: false,
            visible: CAR1,
            radius: 30000,
            paths: history ? PollyneData : historyCount ,
            zIndex: 1,
          }}
          
          >
        

        </Polyline>
        
        
        <Marker
        icon={imagen}
        position={history? PollyneData[PollyneData.length - 1]:null
            
        }
        options={{
          clickable:CAR1,
          visible:CAR1

        }}
        
        onClick={()=> {

          setMarkerInfo(!markerInfo)
        }}
        
        >{markerInfo?(<InfoWindow 
            position={
              history
                ? PollyneData[PollyneData.length - 1]
                : null
            } > 
        
            <div>
            <h3>
              Vehículo 1
            </h3>
    
              <p>{history
                ? "Lng: "+(PollyneData[PollyneData.length - 1].lng)
                : "Lng: "+(historyCount[historyCount.length - 1].lng) }</p>
                <p>{history
                  ? "Lat: "+(PollyneData[PollyneData.length - 1].lat)
                  : "Lat: "+(historyCount[historyCount.length - 1].lat) }
                </p>
                <p>{history
                  ? "Date: "+(PollyneData[PollyneData.length - 1].date)
                  : "Date: "+(historyCount[historyCount.length - 1].date) }
                </p>
            </div>
    
            </InfoWindow>):null}
        
        </Marker>
        {/*Vehiculo 2*/}
        <Polyline
          path={history ? PollyneData : historyCount}
          options={{
            strokeColor: "#0000FF",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#0000FF",
            fillOpacity: 0.35,
            clickable: true,
            draggable: false,
            editable: false,
            visible: CAR2,
            radius: 30000,
            paths: history ? PollyneData : historyCount,
            zIndex: 1,
          }}
        ></Polyline>  
        <Marker
        icon={imagen}
        position={history? PollyneData[PollyneData.length - 1]:null
            
        }
        options={{
          clickable:CAR2,
          visible:CAR2

        }}
        
        onClick={()=> {

          setMarkerInfo(!markerInfo)
        }}
        
        >{markerInfo?(<InfoWindow 
            position={
              history
                ? PollyneData[PollyneData.length - 1]
                : null
            } > 
        
            <div>
            <h3>
              Vehículo 2
            </h3>
    
              <p>{history
                ? "Lng: "+(PollyneData[PollyneData.length - 1].lng)
                : "Lng: "+(historyCount[historyCount.length - 1].lng) }</p>
                <p>{history
                  ? "Lat: "+(PollyneData[PollyneData.length - 1].lat)
                  : "Lat: "+(historyCount[historyCount.length - 1].lat) }
                </p>
                <p>{history
                  ? "Date: "+(PollyneData[PollyneData.length - 1].date)
                  : "Date: "+(historyCount[historyCount.length - 1].date) }
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
