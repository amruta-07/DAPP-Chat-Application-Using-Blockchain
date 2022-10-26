import ReactEcharts from "echarts-for-react";
import React from 'react'

function Alpha_chart(props) {
    const  getOptions=(graphData)=> {
        const { profit, wData } = graphData;
        const multiplier = profit < 0 ? -1 : 1;
        var data = wData.map((data) =>( multiplier * data.value));
        var x_axisData = wData.map((data) => data.label);
        var help = [];
        var positive = [];
        var negative = [];
        var summary = [];
        for (var i = 0, sum = 0; i < data.length; ++i) {
          if (data[i] >= 0) {
            positive.push(Number(data[i]).toFixed(2));
            negative.push("-");
          } else {
            positive.push("-");
            negative.push(-Number(data[i]).toFixed(2));
          }
          summary.push("-");
    
          if (i === 0) {
            help.push(0);
          } else {
            sum += data[i - 1];
            if (data[i] < 0) {
              help.push(sum + data[i]);
            } else {
              help.push(sum);
            }
          }
        }
        console.log(help);
        console.log(positive);
        console.log(negative);
        console.log(summary);
    
        return {
            color: ["#c23531", "#91c7ae", "#dd8668"],
          title: {
            text: "Accumulated Waterfall Chart"
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          },
          xAxis: {
            type: "category",
            splitLine: { show: true },
            data: [...x_axisData, "total"]
          },
          yAxis: {
            type: "value"
          },
          series: [
            {
              type: "bar",
              stack: "all",
              itemStyle: {
                normal: {
                  barBorderColor: "rgba(0,0,0,0)",
                  color: "rgba(0,0,0,0)"
                },
                emphasis: {
                  barBorderColor: "rgba(0,0,0,0)",
                  color: "rgba(0,0,0,0)"
                }
              },
              data: help,
            },
            {
              name: "profit",
              type: "bar",
              stack: "all",
              data: positive,
              label: {
                show: true,
                position: "top"
              },
              itemStyle: {
                color: multiplier === -1 ? "#f32" : "#008000"
              }
            },
            {
              name: "loss",
              type: "bar",
              stack: "all",
              data: negative,
              label: {
                show: true,
                position: "top"
              },
              itemStyle: {
                color: multiplier === -1 ? "#008000" : "#f32"
              }
            },
            {
              name: "summary",
              type: "bar",
              stack: "all",
              data: [...summary, Number(multiplier * profit).toFixed(2)],
              itemStyle: {
                color: "#c8e7f9"
              },
              label: {
                show: true,
                position: "top"
              },
            }
          ],
          legend: {
            data: ["profit", "loss", ""]
          }
            
        };
      }
  return (
    <ReactEcharts
        option={getOptions(props.graphData)}
        style={{  height: "100%" }}

      ></ReactEcharts>
  )
}

export default Alpha_chart
