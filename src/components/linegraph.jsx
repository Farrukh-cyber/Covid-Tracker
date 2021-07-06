import React from 'react';
import { Line } from "react-chartjs-2";
const Linegraph = (props) => {
    return (
        <div>
            <div
                style={{
                    width: "600px",
                    height: "600px",
                    margin: "50px auto",
                }}
            >
                <Line
                    data={{
                        labels: props.label.map(i => i.substr(0,10)),
                        datasets: [
                            {
                                label: "Corona Virus",
                                fill: true,
                                lineTension: 0.1,
                                backgroundColor: "#EDDAED",
                                borderColor: "#E87A30",
                                borderCapStyle: "butt",
                                borderDash: [],
                                borderDashOffset: 0.0,
                                borderJoinStyle: "miter",
                                pointBorderColor: "#E87A30",
                                pointBackgroundColor: "#EDDAED",
                                pointBorderWidth: 1,
                                pointHoverRadius: 5,
                                pointHoverBackgroundColor: "#EF7E31",
                                pointHoverBorderColor: "rgba(220,220,220,1)",
                                pointHoverBorderWidth: 2,
                                pointRadius: 1,
                                pointHitRadius: 10,
                                data: props.yAxis
                            },
                        ],
                    }}
                />
            </div>
        </div>
    )
}
export default Linegraph;