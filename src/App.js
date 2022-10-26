import './App.css';
import { useState, useEffect } from 'react';

import Alpha_chart from './Alpha_chart';
import I_Alpha_chart from './I_Alpha_chart';
import axios from 'axios';

function App() {

  const [graphData, setgraphData] = useState([])
  const [profit, setprofit] = useState(0)
  const [summaryData, setsummaryData] = useState({})
  function formatData(profitData) {
    return profitData.map((data) => ({
      label: data.subcategory,
      value: data.profit
    }));
  }
  function rearrange(sampledata) {
    let profit = 0;
    const profitData = sampledata.map((item) => {
      item.profit = item[`d__2022sale`] - item[`d__2021sale`];
      profit += item.profit;
      return item;
    });
  
    if (profit >= 0) { //if profit is positive //sort in descending order
      profitData.sort(function (x, y) {
        return y.profit - x.profit;
      });
    } else { //if profit is negative //sort in acending order
      profitData.sort(function (x, y) {
        return x.profit - y.profit;
      });
    }
    const multiplier = profit < 0 ? -1 : 1;
        var data = profitData.map((data) =>( multiplier * data.profit));
        let p_sum = 0;
        let l_sum = 0;
        for (var i = 0; i < data.length; ++i) {
          if (data[i] >= 0) {
            p_sum += data[i];
          } else {
            l_sum+= (data[i]);
          }
         
        }
        setsummaryData({
          profit: Number(p_sum).toFixed(2),
          loss: Math.abs(Number(l_sum).toFixed(2)),
          net: Number(p_sum + l_sum).toFixed(2)
        })
    setprofit(profit)
    setgraphData(formatData(profitData))
  
  }
  
  const getgraphdata = () => {
    axios({
      method: 'get',
      url: 'https://run.mocky.io/v3/e2ffac92-48e0-4826-a59f-bf76fc727383',
      
    }).then((response) => {
      if(response.status === 200){
        console.log(response.data.data)
        rearrange(response.data.data)
      }

    }).catch((err)=>{
      console.log(err)
      alert(err.response)
    })
  }
     
  useEffect(()=>{
    getgraphdata()
  },[])


  return (
    <div className="App"  style={{
      padding: "20px",
    }}>
       <div className="main-container">
        <div className="graph-container">
        <Alpha_chart
      graphData={{profit: profit,wData: graphData}}
      />
        </div>
        <I_Alpha_chart
        {...summaryData}
        />
      </div>
      
     

      
    </div>
  );
}

export default App;
