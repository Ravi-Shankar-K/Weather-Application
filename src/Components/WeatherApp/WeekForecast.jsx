function WeekForecast({weatherData}){
    
    const shortDayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const data = weatherData.forecast.forecastday;
    const weekData = data.map((item) => {
        const day = new Date(item.date).getDay();
        const shortDayName = shortDayNames[day];
        return {
            day: shortDayName,
            mintemp:  Math.round(Number(item.day.mintemp_c)),
            maxtemp:  Math.round(Number(item.day.maxtemp_c)),
            logo: item.day.condition.icon,
            text: item.day.condition.text,
        }
    });
    weekData[0].day = 'Today';
    // console.log(weekData);
    return (
        <div className='table'>
                <h4>Week Forecast</h4>
                {
                    weekData.map((item,ind) => {
                        return (
                            <div className="table-row" key={ind}>
                                <p className="">{item.day}</p>
                                <div className="img-txt-box">
                                    <img className="" src={item.logo}/>
                                    <p className="">{item.text}</p>
                                </div>
                                <p className="">{`${item.maxtemp}/${item.mintemp}`}</p>
                            </div>
                        )
                    })
                }
            </div>
    )
}

export default WeekForecast;