 
  const  getWeatherStats =  () =>{
    const weatherAnalysisContent = document.getElementById('weatherAnalysisContent'); 
    const locationInfo = document.getElementById('locationInfo'); 
    const Today = document.getElementById('Today'); 
    var currentPeriod = null; 
   

    navigator.geolocation.getCurrentPosition(  (stats) => {
          const { latitude, longitude } = stats.coords;
          let long = Math.trunc(longitude);
          let lat = Math.trunc(latitude);
          console.log(long, lat);
          const date = new Date(stats.timestamp);
          // console.log('Date', date.toDateString()); 
          //x: longitude
          //y: latitude
          //get pre qulaified content and data for second fetch:
            fetch(`https://api.weather.gov/points/${lat},${long}`) //inputed vice versa due to code error when in {x,y} arrangement  //first fetch
              .then(data => data.json())
              .then(async (raw) => {
                  let gridID = raw['properties']['gridId'];
                  let gridX = raw['properties']['gridX'];
                  let gridY = raw['properties']['gridY'];
             Today.innerHTML += gridID;
/*
                    fetch(`https://api.weather.gov/gridpoints/${gridID}/${gridX},${gridY}/forecast`).then(res => res.json()) //second fetch
                      .then(json => {
                          //locationInfo.innerHTML += JSON.stringify(json); 
                          let periods = json['properties']['periods'];

                          console.log('Forecast: ', json);


                          periods.forEach(elem => {
                              let elemDate = new Date(elem.startTime);
                              elemDate.toDateString() == date.toDateString() ?
                                  currentPeriod = elem
                                  :
                                  currentPeriod == null;
                              // console.log('elemDate', elemDate.toDateString()
                          });

                      });

                      /** */

              });



              /*
              Today.innerHTML += `
              <img src = '${currentPeriod['icon']}'/>
              <inline>
               <h2>Temperature: </h2><p>${currentPeriod['temperature']}${currentPeriod['temperatureUnit']}</p>
               </inline>
          
               <inline>
               <h2>RelHumidity: </h2><p>${currentPeriod['relativeHumidity']['value']}</p>
               </inline>
          
               <inline>
               <h2>Wind Direction: </h2><p>${currentPeriod['windDirection']}</p>
               </inline>
          
               <inline>
               <h2>Wind Speed: </h2><p>${currentPeriod['windSpeed']}</p>
               </inline>
              `; 

              /** */
      });

   
    
   
}

 getWeatherStats(); 
