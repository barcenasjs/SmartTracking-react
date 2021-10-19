import React, { useState, useEffect } from "react";
import { Row, Col, DatePicker, Button } from "antd";
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
            
            <Col className="gutter-row" span={24}>
            <RangePicker
                showTime={{ format: "HH:mm" }}
                format="YYYY-MM-DD HH:mm"
                onChange={fecha}
            />
            </Col>
            
        </Row>
      <GoogleMap
        mapContainerClassName="mapa"
        center={PollyneData[1]}
        zoom={14}
        id="map"
      >
        

      

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
            visible: true,
            radius: 30000,
            paths: history ? PollyneData : historyCount ,
            zIndex: 1,
          }}
          onClick={(e)=>{
            console.log(e)
            
          }} 

          >
        

        </Polyline>

        <Marker
        icon={imagen}
        position={ PollyneData[PollyneData.length - 1]
            
        }
        
        />

      </GoogleMap>
      <br></br>

      
    </>
  ) : (
    <></>
  );
}
