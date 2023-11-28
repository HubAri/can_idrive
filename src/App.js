import React, {useState} from 'react'
import axios from 'axios'
import logo from '../src/Components/Assets/Car.png';
import tick from '../src/Components/Assets/tick.png';
import cross from '../src/Components/Assets/cross.png';

function App() {
  const [data,setData] =useState({})
  const [location, setLocation] = useState('')

  //enter personal API-Key
  var apiKey = ""
  
  // all considered API attributes
  var feels;
  var humidity;
  var weather;
  var temp;
  var description;
  var iconcode = "";
  //update once location has been determined
  if (data.name !== undefined){
    iconcode = data.weather[0].icon;
    humidity = data.main.humidity;
    temp = data.main.temp.toFixed();
    feels = data.main.feels_like.toFixed(); 
    weather = data.weather[0].main;
    description = data.weather[0].description;
  }
  const iconurl = "https://openweathermap.org/img/wn/"+ iconcode + "@2x.png"
  console.log(iconurl); 



  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`

 
  const searchLocation = async (event) => {
    if (event.key === 'Enter') {     
      try {
        await axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
        throw new Error ('Invalid city!');
      }) }
      catch (e){ console.error(e);}

      setLocation('')  
    }   
    //{document.getElementById("input").innerHTML= err.message;}
  } 


  function decide_logic(){
   let i = true;
   let h = true;
   let w = true;

   if(temp < 0){
     i = false;
   }
   // can indicate rain
   if (humidity > 65){
    h = false;
   }
   // falsifies experssion in all other cases where its snowy, rainy, misty, stormy...
   if (weather !== 'Clear' && weather !=='Clouds'){
    w = false;
   }
   return i && h && w;
  }


  console.log(decide_logic());


  return (
    <div className="app">
      <div className="search">
        <div className="logo">
      <img src={logo} alt=""/> </div>
        <input 
        value={location}
        onChange={event => setLocation(event.target.value)}
        placeholder='Enter Location'
        onKeyPress={searchLocation}
        type="text" />
      </div>
    <div className="container">
      <div className="top">
        <div className="location"> <p>{data.name}</p></div>
      </div>
      <div className="temp"> 
      {data.main ? <h1>{temp} &deg;C</h1> : null}
      {data.name !== undefined &&
      <div className="weatherIcon"> 
        {data.main ? <img src = {iconurl} alt = '' /> : null}
      </div> }
      </div> 
      <div className="description">
        {data.main ? <p className='thick'>{weather}</p> : null}  
      </div>
      <div className="div">
      {true ? <p className='thick'>{description}</p> : null}
      </div>


      {data.name !== undefined &&
      <div className="bottom">
        <div className="feels">
          {data.main ? <p className='thick'>{feels} &deg;C</p> : null}
          <p>Feels like</p>
        </div>
        <div className="humidity">
          {data.main ? <p className='thick'>{humidity} %</p> : null}
          <p>Humidity</p>
        </div>
        <div className="clouds">
        {data.main ? <p className='thick'>{data.clouds.all} %</p> : null}
          <p>Cloudiness</p>
        </div>
      </div>
      }
      
      {data.name !== undefined &&
      <div className="footer">
        <p className='thick'>Should I Drive?</p> 
      </div> }

      {data.name !== undefined &&
      <div className="tickBox">
        {decide_logic() ? <img src={tick} alt =""/>: <img src={cross} alt =""/>}
      </div>}
    </div> 
    
    
    </div>
  );
}

export default App;
