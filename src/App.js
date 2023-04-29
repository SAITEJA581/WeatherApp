import React, { useRef, useState } from "react";
import logo from "./searchimg.jpeg";
import logo1 from "./sun.png";
import logo2 from "./humidity.png";
import logo3 from "./wind.jpg";
import logo4 from "./clear.png";
import logo5 from "./Rain.jpeg";
import logo6 from "./Drizzle.png";
import logo7 from "./mist.jpg";
import logo8 from "./Snow.webp";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState({
    celcius: 29,
    name: 'Hyderabad',
    humidity: 20,
    speed: 2,
    image: logo1,
    date: '',
    day: '',
    month: '',
  });
  
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef();
  const getDate = () => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const currentDate = new Date();
    const day = days[currentDate.getDay()];
    const month = months[currentDate.getMonth()];
    const date = currentDate.getDate();
    return `${day}, ${month}, ${date}`;
  }

  const handleClick = () => {
    if(name !== "") {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=16bfa98849718de13b6e8978b87d47b8&units=metric`;
      axios.get(apiUrl)
      .then(res => {
        let imagePath = "data.image";
        if(res.data.weather[0].main === "Sun") {
          imagePath = logo1;
        } else if(res.data.weather[0].main === "Clear") {
          imagePath = logo4;
        } else if(res.data.weather[0].main === "Rain") {
          imagePath = logo5;
        } else if (res.data.weather[0].main === "Drizzle") {
          imagePath = logo6;
        } else if(res.data.weather[0].main === "Mist") {
          imagePath = logo7;
        } else if (res.data.weather[0].main === "Snow") {
          imagePath = logo8;
        }

        let temperature = res.data.main.temp;
        if (temperature >30) {
          imagePath = logo1;
        } else if (temperature <30 && temperature >=20 ) {
          imagePath = logo4;
        } else if (temperature <25 && temperature >=20) {
          imagePath = logo7;
        } else if (temperature <20 && temperature >=9) {
          imagePath = logo5;
        } else if (temperature <20 && temperature <=15) {
          imagePath = logo6;
        } else if (temperature <10){
          imagePath = logo8;
        }
        setError('');
       console.log(res.data);
       setData({...data, celcius: res.data.main.temp, name:res.data.name, humidity: res.data.main.humidity, speed: res.data.wind.speed, image:imagePath,})
       inputRef.current.value=""
      })
      .catch(err => {
        if(err.response.status === 404) {
          setError("Enter a City Name Correctly");
        } else {
          setError('');
        }
        console.log(err);
    });
  }
  }

  return (
    <div className="container">
      <div className="weather">
        <div className="title">
          <h1> Weather App</h1>
        </div>
        <div className="search">
          <input type="text" placeholder="Enter City Name" autoComplete="off" onChange={e => setName(e.target.value)} ref={inputRef} />
          <button> <img src={logo} onClick={handleClick} alt= "mylogo" /> </button>
        </div>
        <div className="error">
          <p>{error}</p>
        </div>
        <div className="time">
          <p>{getDate()}</p>
        </div>
        <div className="info">
          <img src= {data.image} alt="sun" className="icon" />
          <h1>{Math.round(data.celcius)}&#176;c</h1>
          <h2>{data.name}</h2>
          <div className="details">
            <div className="col">
              <img src={logo2} alt="humidity" />
              <div className="humidity">
                <p>{Math.round(data.humidity)}%</p>
                <p>Humidity</p>
              </div>
              </div>
                <div className="col">
                  <img src={logo3} alt="wind" />
                  <div className="wind">
                    <p>{Math.round(data.speed)} Km/h</p>
                    <p>Wind</p>
                  </div>
                </div>
              </div>
            </div>
       </div>
    </div>
  )
}

export default App