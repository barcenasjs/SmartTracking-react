import React, { useState, useEffect } from "react";
import { Row, Col, DatePicker, Button, Select } from "antd";
import "./History.css";
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
import { position } from "../service/feathers";

export default function Historico(props) {
  const { RangePicker } = DatePicker;
  const [PollyneData, setPollyneData] = useState([]);
  const [history, setHistory] = useState(false);
  const [historyCount, setHistoryCount] = useState([]);
  const [CAR1, setCAR1] = useState(true);
  const [CAR2, setCAR2] = useState(false);
  const [markerInfo, setMarkerInfo] = useState(false);
  const [carCount, setCarCount] = useState("1");

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
          return {
            lat: parseFloat(el.lat),
            lng: parseFloat(el.lng),
            date: el.date,
          };
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
          return {
            lat: parseFloat(el.lat),
            lng: parseFloat(el.lng),
            date: el.date,
          };
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
      getDataFiltered(ds);
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
            : { lat:11.018806 , lng: -74.850631 }
        }
        zoom={14}
        id="map"
      >
        {carCount === "2" || carCount === "3" ? (
          <Marker
            icon={imagen}
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
                  <h3>Vehículo 1</h3>

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
              <InfoWindow
                position={dataCar1[dataCar1.length - 1]}
                shouldFocus={false}
              >
                <div>
                  <h3>Vehículo 2</h3>
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
              paths: dataCar2,
              zIndex: 1,
            }}
          ></Polyline>
        ) : null}

        {carCount === "1" || carCount === "3" ? (
          <Polyline
            path={dataCar1}
            options={{
              strokeColor: "#0000FF",
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: "#0000FF",
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
      <br></br>
    </>
  ) : (
    <></>
  );
}
