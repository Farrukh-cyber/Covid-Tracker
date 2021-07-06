import React from 'react';
import Card from './card';
import NumberFormat from 'react-number-format';
import image from './image/covid.gif'
const Covidsummary = (props) => {
    const {
        totalconfirmed,
        totalrecovered,
        totaldeaths,
        country
    } = props;
    return (
        <div >

            <h1 style={{ textTransform: "capitalize", backgroundColor: "#EAB543", padding: "40px" }}>{country === "" ? "World Wide Corona Report" : country}</h1>
            <div style={{
                display:"flex",
                justifyContent:"center",
                marginLeft:"40px"
            }} >
                <img src="https://graphics.reuters.com/HEALTH-CORONAVIRUS/VACCINE/yzdpxqxnwvx/img/topper.gif" width="300px" height="250px" alt="" srcset="" />
                <div className="container" >
                    <div className="row" >


                        <div className="col-3" style={{ backgroundColor: "#2bcbba", margin: "10px", color: "black" }}>

                            <Card  >
                                <span><b> Total Confirmed </b></span> <br /><br /><br />
                                <span>
                                    {

                                        <NumberFormat value={totalconfirmed} displayType={'text'} thousandSeparator={true} />
                                    }
                                </span>
                            </Card >
                        </div>
                        <div className="col-3" style={{ backgroundColor: "#26de81", margin: "10px", color: "black" }}>

                            <Card>
                                <span><b> Total Recoverd</b>  </span> <br /><br /><br />
                                <span>
                                    {

                                        <NumberFormat value={totalrecovered} displayType={'text'} thousandSeparator={true} />
                                    }


                                </span>
                            </Card>
                        </div>
                        <div className="col-3" style={{ backgroundColor: "#ff4d4d", margin: "10px", color: "black" }}>

                            <Card>
                                <span><b>Total Deaths </b>  </span> <br /><br /><br />
                                <span>
                                    {

                                        <NumberFormat value={totaldeaths} displayType={'text'} thousandSeparator={true} />
                                    }


                                </span>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default Covidsummary