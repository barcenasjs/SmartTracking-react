import React, { useState, useEffect } from "react";
import { Row, Col, DatePicker, Button, Select } from "antd";
import "./Map.css";
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

import { on } from "../Server";
import { position } from "../service/feathers";

export default function Map(props) {
  
  

  
  const [markerInfo, setMarkerInfo] = useState(false);
  const [carCount, setCarCount] = useState("1");
  //new data
  const [dataCar1, setDataCar1] = useState([]);
  const [dataCar2, setDataCar2] = useState([]);
  
  const { Option } = Select;

  function handleChange(value) {
    setCarCount(value);
    console.log(`selected ${value}`);
  }
  
  useEffect(() => {
    on((connection) => (geoData) => {
      position
        .find({ query: { $limit: 10000 } })
        .then((res) => {
          const car1 = res.data
            .filter((el) => el.user_id === 1)
            .map((el) => {
              return {
                lat: parseFloat(el.lat),
                lng: parseFloat(el.lng),
                date: el.date,
              };
            });
          const car2 = res.data
            .filter((el) => el.user_id === 9)
            .map((el) => {
              return {
                lat: parseFloat(el.lat),
                lng: parseFloat(el.lng),
                date: el.date,
              };
            });
          // setHistoryCountCar1(car1[car1.length - 1]);
          // setHistoryCountCar2(car2[car2.length - 1]);
          setDataCar1(car1);
          setDataCar2(car2);
        })
        .catch((e) => {
          alert(e);
        });
    });
  }, []);
  
  
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
            defaultValue={`Vehículo ${carCount}`}
            style={{ width: 120 }}
            onChange={handleChange}
          >
            <Option value="1">Vehículo 1</Option>
            <Option value="2">Vehículo 2</Option>
            <Option value="3">Ambos</Option>
          </Select>
        </Col>
      </Row>
      <GoogleMap
        mapContainerClassName="mapa"
        center={
          carCount === "1"
            ? dataCar1[dataCar1.length - 1]
            : carCount === "2"
            ? dataCar2[dataCar2.length - 1]
            : null
        }
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
              <InfoWindow position={dataCar2[dataCar2.length - 1]}>
                <div>
                  <h3>Vehículo 2</h3>

                  <p>{"Lng: " + dataCar2[dataCar2.length - 1].lng}</p>
                  <p>{"Lat: " + dataCar2[dataCar2.length - 1].lat}</p>
                  <p>{"Fecha: " + dataCar2[dataCar2.length - 1].date}</p>
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
              <InfoWindow position={dataCar1[dataCar1.length - 1]}>
                <div>
                  <h3>Vehículo 1</h3>
                  <p>{"Lng: " + dataCar1[dataCar1.length - 1].lng}</p>
                  <p>{"Lat: " + dataCar1[dataCar1.length - 1].lat}</p>
                  <p>{"Fecha: " + dataCar1[dataCar1.length - 1].date}</p>
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
      </GoogleMap>
    </>
  ) : (
    <></>
  );
}
