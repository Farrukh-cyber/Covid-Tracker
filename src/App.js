import React, { useEffect, useState } from 'react';
import './App.css';
import Linegraph from './components/linegraph';
import Covidsummary from './components/covidsummary';
import axios from "./axios";
import { useDispatch, useSelector } from "react-redux";
import Footr from './components/footer';


function App() {
  const [totalConfirmed, setTotalConfirmed] = useState(0);
  const [totalRecovered, setTotalRecovered] = useState(0);
  const [totalDeaths, setTotalDeaths] = useState(0);
  const [loading, setLoading] = useState(false);
  const [covidsummary, setCovidsummary] = useState({});
  const [days, setDays] = useState(7)
  const [country, setCountry] = useState('')
  const [coronaCountAr, setCoronaCountAr] = useState([]);
  const [label, setLabel]=useState([]);

  const dispatch = useDispatch();

  const state = useSelector((state) => state);
  useEffect(() => {
    setLoading(true);
    axios.get('/summary')
      .then(res => {
        setLoading(false);
        if (res.status === 200) {
          dispatch({type:"UPDATEDDATA",data:res.data})
          setTotalConfirmed(state.data ? state.data.Global.TotalConfirmed : res.data.Global.TotalConfirmed);
          setTotalRecovered(state.data ? state.data.Global.NewRecovered : res.data.Global.NewRecovered);
          setTotalDeaths(state.data ? state.data.Global.TotalDeaths : res.data.Global.TotalDeaths);
          setCovidsummary(state.data ? state.data : res.data);
        }
        console.log(res);
      })
      .catch(error => {
        console.log(error)
      })
  }, []);

  const formatdate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = `0${d.getMonth() + 1}`.slice(-2);
    const _date = d.getDate();
    return `${year}-${month}-${_date}`;
  }


  const countryhandler = (e) => {
    setCountry(e.target.value);
    const d = new Date();
    const to = formatdate(d);
    const from = formatdate(d.setDate(d.getDate() - days));
    // console.log(from , to);
    getCoronaReportByDateRange(e.target.value, from, to);
  }
  const dayhandler = (e) => {
    setDays(e.target.value)
    const d = new Date();
    const to = formatdate(d);
    const from = formatdate(d.setDate(d.getDate() - e.target.value));
    getCoronaReportByDateRange(country, from, to);
  }

  const getCoronaReportByDateRange = (countrySlug, from, to) => {
    axios.get(
      `/country/${countrySlug}/status/confirmed?from=${ from  }T00:00:00Z&to=${ to  }T00:00:00Z`
    )
      .then(res => {
        console.log(res);

        const yAxisCoronaCount = res.data.map(d => d.Cases);
        const xAxisLabel= res.data.map(d => d.Date);
        const covidDetails = covidsummary.Countries.find(country => country.Slug === countrySlug);
        setCoronaCountAr(yAxisCoronaCount)
        setTotalConfirmed(covidDetails.TotalConfirmed);
        setTotalRecovered(covidDetails.TotalRecovered);
        setTotalDeaths(covidDetails.TotalDeaths);
        setLabel(xAxisLabel);
      })
      .catch(error => {
        console.log(error);
      })
  }
  if (loading) {
    return <p>Fetching Data from api</p>
  }
  return (
    <div className="App">
      <div>

        <Covidsummary
          totalconfirmed={totalConfirmed}
          totalrecovered={totalRecovered}
          totaldeaths={totalDeaths}
          country={country}
        />
        <div>
          <select value={country} onChange={countryhandler}>
            <option value="">Select Country</option>
            {
              covidsummary.Countries && covidsummary.Countries.map(country => <option key={country.Slug} value={country.Slug}>{country.Country}</option>)
            }
          </select>
          <select value={days} onChange={dayhandler}>
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
          </select>
        </div>
        <Linegraph 
        yAxis={coronaCountAr}
        label={label} />
        <Footr/>
      </div>
    </div>
  );
}

export default App;