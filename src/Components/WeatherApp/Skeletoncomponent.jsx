import './WeatherApp.css';
const SkeletonComponent = ()=>{

    return (
        <div className='container-body'>
            <div className='left'>
                <div className='box1'>
                    <div className='weather-details division-container'>
                        <h2 className='location sub-heading'></h2>
                        <p className="paragraph"></p>
                        <p className="paragraph"></p>
                        <div className="temperature-data">
                            <img className="sub-heading-circle margin-right-5"/>
                            <h1 className='temperature sub-heading'></h1>
                        </div>
                    </div>
                    <div className='weather-conditions division-container'>
                        {
                            Array.from({length:4}).map((ele,ind) => {
                                return (
                                    <div className="division" key={ind}>
                                        <p className="paragraph"></p>
                                        <h2 className="sub-heading2"></h2>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='box2 division-container'>
                    <p className="paragraph"></p>
                    <div className="box2-data">
                        {
                            Array.from({length:6}).map((ele,ind) => {
                                return (
                                    <div className="division" key={ind}>
                                        <p className="paragraph"></p>
                                        <img className="sub-heading-circle2 margin-bottom-5"/>
                                        <h2 className="sub-heading2"></h2>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className='table division-container'>
                <h2 className="sub-heading2"></h2>
                {
                    Array.from({length:7}).map((ele,ind) => {
                        return (
                            <div className="table-row" key={ind}>
                                <p className="paragraph20"></p>
                                <div className="img-txt-box">
                                    <img className="sub-heading-circle2 margin-bottom-5"/>
                                    <h2 className="sub-heading2"></h2>
                                </div>
                                <p className="paragraph20"></p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default SkeletonComponent;