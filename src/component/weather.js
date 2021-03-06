import React, { useState, useEffect } from "react";
import axios from "axios";
import { current, day, month } from "./dayMonth";
const Weather = () => {
  const [city, setCity] = useState("Delhi");
  const [tempCity, setTempCity] = useState("Delhi");
  const [temp, setTemp] = useState(0);
  const [weatherIcon, setWeatherIcon] = useState(
    "https://openweathermap.org/img/wn/10d@2x.png"
  );
  const [des, setDes] = useState("clear");

  useEffect(() => {
    async function fetchData() {
      const firstURL = "https://api.openweathermap.org/data/2.5/weather?q=";
      const endURL = "&units=metric&appid=b506986489a2e68bd6260c4068719ed1";
      const finalURL = firstURL + city + endURL;
      const { data } = await axios.get(finalURL);
      setDes(data.weather[0].description);
      setWeatherIcon(
        "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
      );
      setTemp(data.main.temp);
    }
    fetchData();
  }, [city]);
  let backgroundClass = "mainDiv warm";
  if (temp < 20) {
    backgroundClass = "mainDiv cold";
  }

  if (tempCity === "") setTempCity(city);
  return (
    <div className={backgroundClass}>
      <input
        className="form-control"
        type="text"
        placeholder="eg. Delhi"
        onChange={(e) => setTempCity(e.target.value)}
      ></input>
      <i
        className="fa fa-search"
        onClick={() => setCity(tempCity)}
        aria-hidden="true"
      ></i>

      <h2 className="text-center my-5">{city}</h2>
      <h3 className="text-center ">
        {temp}
        <i className="fa fa-circle-o" aria-hidden="true"></i> c
      </h3>
      <div className="d-flex justify-content-around">
        <h4 className="d-flex align-items-center">{des}</h4>
        <img src={weatherIcon} alt="" />
      </div>
      <h2 className="text-center">{day[current.getDay()]}</h2>
      <h4 className="text-center mt-4">
        {current.getDate()} {month[current.getMonth()]} {current.getHours()}:
        {current.getMinutes() < 10 && "0"}
        {current.getMinutes()}
      </h4>
    </div>
  );
};
export default Weather;
