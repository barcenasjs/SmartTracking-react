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
  const [PollyneData, setPollyneData] = useState([]);
  const [Range, setRange] = useState([]);
  const [history, setHistory] = useState(false);
  const [historyCount, setHistoryCount] = useState([]);
  const [markerInfo, setMarkerInfo] = useState(false);

  //new data
  const [dataCar1, setDataCar1] = useState([]);
  const [historyCountCar1, setHistoryCountCar1] = useState([]);
  const [dataCar2, setDataCar2] = useState([]);
  const [historyCountCar2, setHistoryCountCar2] = useState([]);

  console.log("soy data 2" + JSON.stringify(dataCar2));
  const { Option } = Select;

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  useEffect(() => {
    position
      .find({
        query: {},
      })
      .then((res) => {
        const car1 = res.data
          .filter((el) => el.user_id === 1)
          .map((el) => {
            return { lat: parseFloat(el.lat), lng: parseFloat(el.lng) };
          });
        const car2 = res.data
          .filter((el) => el.user_id === 9)
          .map((el) => {
            return { lat: parseFloat(el.lat), lng: parseFloat(el.lng) };
          });
        console.log(JSON.stringify(res));
        setDataCar1(car1);
        setDataCar2(car2);
      })
      .catch((e) => {
        alert(e);
      });
  }, []);

  useEffect(() => {
    on((connection) => (geoData) => {
      position
        .find({
          query: {},
        })
        .then((res) => {
          const car1 = res.data
            .filter((el) => el.user_id === 1)
            .map((el) => {
              return { lat: parseFloat(el.lat), lng: parseFloat(el.lng) };
            });
          const car2 = res.data
            .filter((el) => el.user_id === 9)
            .map((el) => {
              return { lat: parseFloat(el.lat), lng: parseFloat(el.lng) };
            });
          setHistoryCountCar1(car1[car1.length - 1]);
          setHistoryCountCar2(car2[car2.length - 1]);
        })
        .catch((e) => {
          alert(e);
        });
    });
  }, []);

  useEffect(() => {
    if (dataCar2[0].lng && dataCar1[0].lng) {
      alert("hola");
      if (Range.length !== 0) {
        const positions1 = dataCar1
          .map((el) => {
            return {
              lat: el.lat,
              lng: el.lng,
              date: el.date,
            };
          })
          .filter((el) => {
            return new Date(Range[0]).getTime() < new Date(el.date).getTime();
          })
          .filter((el) => {
            return new Date(el.date).getTime() < new Date(Range[1]).getTime();
          });

        const positions2 = dataCar2
          .map((el) => {
            return {
              lat: el.lat,
              lng: el.lng,
              date: el.date,
            };
          })
          .filter((el) => {
            return new Date(Range[0]).getTime() < new Date(el.date).getTime();
          })
          .filter((el) => {
            return new Date(el.date).getTime() < new Date(Range[1]).getTime();
          });
        alert(JSON.stringify(positions1[0]));
        setDataCar1(positions1);
        setDataCar2(positions2);
      } else {
        const positions1 = props.data.map((el) => {
          return {
            lat: el.lat,
            lng: el.lng,
            date: el.date,
          };
        });
        const positions2 = props.data.map((el) => {
          return {
            lat: el.lat,
            lng: el.lng,
            date: el.date,
          };
        });
        setDataCar2(positions2);
        setDataCar1(positions1);
      }
    }
  }, [Range, dataCar1, dataCar2]);

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
        center={
          history
            ? PollyneData[PollyneData.length - 1]
            : dataCar1[dataCar1.length - 1]
        }
        zoom={14}
        id="map"
      >
        <Marker
          icon={imagen}
          position={
            history
              ? PollyneData[PollyneData.length - 1]
              : dataCar2[dataCar1.length - 1]
          }
          clickable
          onClick={() => {
            setMarkerInfo(!markerInfo);
          }}
        >
          {markerInfo ? (
            <InfoWindow
              position={
                history
                  ? PollyneData[PollyneData.length - 1]
                  : dataCar1[dataCar1.length - 1]
              }
            >
              <div>
                <h3>Vehículo 1</h3>

                <p>
                  {history
                    ? "Lng: " + PollyneData[PollyneData.length - 1].lng
                    : "Lng: " + historyCount[historyCount.length - 1].lng}
                </p>
                <p>
                  {history
                    ? "Lat: " + PollyneData[PollyneData.length - 1].lat
                    : "Lat: " + historyCount[historyCount.length - 1].lat}
                </p>
                <p>
                  {history
                    ? "Hora: " + PollyneData[PollyneData.length - 1].date
                    : "Hora: " + historyCount[historyCount.length - 1].date}
                </p>
                <p>
                  {history
                    ? "Fecha: " + PollyneData[PollyneData.length - 1].date
                    : "Fecha: " + historyCount[historyCount.length - 1].date}
                </p>
              </div>
            </InfoWindow>
          ) : null}
        </Marker>

        <Marker
          icon={imagen}
          position={
            history
              ? PollyneData[PollyneData.length - 1]
              : dataCar1[dataCar1.length - 1]
          }
          clickable
          onClick={() => {
            setMarkerInfo(!markerInfo);
          }}
        >
          {markerInfo ? (
            <InfoWindow
              position={
                history
                  ? PollyneData[PollyneData.length - 1]
                  : dataCar1[dataCar1.length - 1]
              }
            >
              <div>
                <h3>Vehículo 1</h3>

                <p>
                  {history
                    ? "Lng: " + PollyneData[PollyneData.length - 1].lng
                    : "Lng: " + historyCount[historyCount.length - 1].lng}
                </p>
                <p>
                  {history
                    ? "Lat: " + PollyneData[PollyneData.length - 1].lat
                    : "Lat: " + historyCount[historyCount.length - 1].lat}
                </p>
                <p>
                  {history
                    ? "Hora: " + PollyneData[PollyneData.length - 1].date
                    : "Hora: " + historyCount[historyCount.length - 1].date}
                </p>
                <p>
                  {history
                    ? "Fecha: " + PollyneData[PollyneData.length - 1].date
                    : "Fecha: " + historyCount[historyCount.length - 1].date}
                </p>
              </div>
            </InfoWindow>
          ) : null}
        </Marker>

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
            zIndex: 1,
          }}
        ></Polyline>
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
            visible: true,
            radius: 30000,
            paths: history ? PollyneData : historyCount,
            zIndex: 1,
          }}
        ></Polyline>
      </GoogleMap>
    </>
  ) : (
    <></>
  );
}
