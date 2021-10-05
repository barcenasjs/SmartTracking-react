import React, { useState, useEffect } from "react";
import { Row, Col, DatePicker, Button } from "antd";
import "./Map.css";
import imagen from "./parada-de-taxi.png";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Circle,
  Polyline,
} from "@react-google-maps/api";
import moment from "moment";

export default function Map(props) {
  const { RangePicker } = DatePicker;
  const [PollyneData, setPollyneData] = useState([]);
  const [Range, setRange] = useState([]);
  const [history, setHistory] = useState(false);
  const [historyCount, setHistoryCount] = useState([]);

  useEffect(() => {
    if (props?.realTimeData[0]?._geoloc?.lng) {
      setHistoryCount([
        ...historyCount,
        {
          lat: props.realTimeData[0]._geoloc.lat,
          lng: props.realTimeData[0]._geoloc.lng,
          date: props.realTimeData[0]._geoloc.date,
        },
      ]);
      console.info(historyCount);
    }
  }, [props.realTimeData]);



  useEffect(() => {}, []);
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
    if (ds[1]=="") {
      
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
      <GoogleMap
        mapContainerClassName="mapa"
        center={history ? PollyneData[PollyneData.length - 1] : historyCount[historyCount.length - 1]}
        zoom={14}
        id="map"
        options={history ?{draggable: false,clickable: true}:{draggable: false,clickable: false}}
        onClick={(e)=>{
          return<>
          <Marker position={e}></Marker>
          <Circle center={e}
          options = {{
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            clickable: false,
            draggable: false,
            editable: false,
            visible: true,
            radius: 30,
            zIndex: 1
          }}
          ></Circle>
          </>
        }}
      >
        <Marker
        icon={imagen}
        position={history ? PollyneData[PollyneData.length - 1] : historyCount[historyCount.length - 1]}></Marker>

        <Polyline
          path={history ? PollyneData : historyCount}
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
            paths: history ? PollyneData : historyCount,
            zIndex: 1}}
          
        ></Polyline>
      </GoogleMap>
      <br></br>

      <Row gutter={[16, 24]}>
        <Col className="gutter-row" span={12}>
          <ul>
            <li className="lista">Latitud</li>
            <li className="lista">
              <div className="faketextArea">
                {history ? PollyneData[PollyneData.length - 1]?.lat : historyCount[historyCount.length - 1]?.lat}
              </div>
            </li>
          </ul>
        </Col>
        <Col className="gutter-row" span={12}>
          <ul>
            <li className="lista">Longuitud</li>
            <li className="lista">
              <div className="faketextArea">
              {history ? PollyneData[PollyneData.length - 1]?.lng : historyCount[historyCount.length - 1]?.lng}
              </div>
            </li>
          </ul>
        </Col>
        <Col className="gutter-row" span={12}>
          <ul>
            <li className="lista">Fecha</li>
            <li className="lista">
              <div className="faketextArea">
                {history ? moment(PollyneData[PollyneData.length - 1]?.date).format(
                  "DD/MMMM/YYYY"
                ) : moment(historyCount[historyCount.length - 1]?.date).format(
                  "DD/MMMM/YYYY"
                )}
              </div>
            </li>
          </ul>
        </Col>
        <Col className="gutter-row" span={12}>
          <ul>
            <li className="lista">Hora</li>
            <li className="lista">
              <div className="faketextArea">
                {history ?moment(PollyneData[PollyneData.length - 1]?.date).format(
                  "hh:mm:ss A"
                ): moment(historyCount[historyCount.length - 1]?.date).format("hh:mm:ss A"
                )}
              </div>
            </li>
          </ul>
        </Col>
        <Col className="gutter-row" span={24}>
          <RangePicker
            showTime={{ format: "HH:mm" }}
            format="YYYY-MM-DD HH:mm"
            onChange={fecha}
            
          />
        </Col>
        <Col className="gutter-row" span={24}>
          <Button onClick={()=>{
            setHistory(false)
          }}
          disabled={!history}
          >
            Tiempo Real
          </Button>
        </Col>
      </Row>
    </>
  ) : (
    <></>
  );
}
