import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
var moment = require("moment");

const Chart = ({ units, data }) => {
  const [download, setDownload] = useState(null);
  const [upload, setUpload] = useState(null);
  const [ping, setPing] = useState(null);
  const [time, setTime] = useState(null);

  const bardata = {
    labels: time,
    datasets: [
      {
        label: `Download Speed in ${units.unit}`,
        // backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: "rgba(36, 199, 79)",
        borderWidth: 1,
        // hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: "rgba(36, 199, 79)",
        data: download,
      },
      {
        label: `Upload Speed in ${units.unit}`,
        color: "rgba(255, 255, 255)",
        // backgroundColor: 'rgba(123,99,132,0.2)',
        borderColor: "rgba(202, 93, 252)",
        borderWidth: 1,
        // hoverBackgroundColor: 'rgba(123,99,132,0.4)',
        hoverBorderColor: "rgba(202, 93, 252)",
        data: upload,
      },
    ],
  };


  useEffect(() => {
    const dl = data.map((item, index) => {
        return parseFloat(item.download/units.conversion).toFixed(2)
    });

    const ul = data.map((item, index) => {
        return parseFloat(item.upload/units.conversion).toFixed(2)
    });

    const lat = data.map((item, index) => {
        return parseFloat(item.ping).toFixed(2)
    })

    const timestamp = data.map((item, index) => {
        return  moment(item.created_at).format('lll')
    })

    setDownload(dl)
    setUpload(ul)
    setPing(lat)
    setTime(timestamp)

  },[units, data]);

  const options = {
    responsive: true,
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    }

  }


  return (
    <>
    <Line
    options={options}
    data={bardata}
    height={120}
    />
    </>
  )
};

export default Chart;
