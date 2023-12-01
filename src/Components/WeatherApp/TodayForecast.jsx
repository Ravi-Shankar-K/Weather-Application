
function TodayForecast({ weatherFData}) {
    
    const hourlyData = weatherFData["forecast"].forecastday[0].hour;
    let hourlyFilteredData = [];
    hourlyData.forEach(item => {
        const [hours, minutes] = item.time.split(" ")[1].split(":");
        const targetTime = new Date();
        targetTime.setHours(Number(hours));
        targetTime.setMinutes(Number(minutes));
        targetTime.setSeconds(0);
        targetTime.setMilliseconds(0);
        const currentTime = new Date();
        if(targetTime.getHours() > currentTime.getHours()){
            hourlyFilteredData.push(item);
        }
    });
    
    if(hourlyFilteredData.length < 6){
        const reqLen = 6 - hourlyFilteredData.length;
        const nxtDayHourlyData = weatherFData["forecast"].forecastday[1].hour.slice(0,reqLen);
        hourlyFilteredData.push(...nxtDayHourlyData);
    }else if(hourlyFilteredData.length > 6){
        hourlyFilteredData = hourlyFilteredData.slice(0,6);
    }
    
    return (
        <div className="weather-forecast-specifictime">
            { 
                hourlyFilteredData.map((item, ind) => (
                    <div className="weather-forecast-st-card" key={ind}>
                        <p>{item.time.split(" ")[1]}</p>
                        <img src={item.condition.icon} alt="Weather Icon" />
                        <p>{item.temp_c}°</p>
                    </div>
                )) 
            }
        </div>
    );
}

export default TodayForecast;
