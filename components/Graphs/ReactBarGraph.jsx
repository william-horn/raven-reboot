
"use client";
// import 'chart.js/auto';
// import { Chart } from 'react-chartjs-2';

/*
const ReactBarGraph = function({
  data,
  height,
  labels,
}) {
  return (
    <Chart
    height={100}
    type="bar"
    data={{
      // labels: ["Malistare's Robe of Vices", "Some name", "Longass Name Not Sure Where it Ends", "hat", "robe", "boots", "wand"],
      // labels: ["Malistare's Robe of Vices", "Some name", "Longass Name Not Sure Where it Ends"],
      // labels: ["testing"],
      labels,
      datasets: [
        {
          label: 'Drop Rates',
          // data: [34, 12, 97, 35, 56, 46, 8],
          // data: [34, 12, 97],
          // data: [34],
          data,
          backgroundColor: ['#00b7ff', '#238bc7'],
          borderColor: 'black',
          borderWidth: 0,
          // barThickness: 40,
        },
      ],
    }}
    options={{
      indexAxis: 'y',
      layout: {
        
      },
      scales: {
        y: {
          ticks: { 
            color: 'white',
          }
        },
        x: {
          min: 0,
          max: 100,
          ticks: {
            callback: function(value, index, ticks) {
              return value + '%';
            }
          }
        }
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: dp => {
              return dp.raw + "% Recorded Drop Rate";
            }
          }
        }
      }
    }}
    />
  );
}
*/

import { AgChartsReact } from "ag-charts-react";
import { useState } from "react";

const ReactBarGraph = function({
  data,
  title,
  // height,
  // labels,
}) {
  const [options, setOptions] = useState({
    autoSize: true, 
    height: 1000,
    background: {
      fill: 'rgba(0, 0, 0, 0)',
    },
    axes: [
      {
        // gridLine: {
        //   style: [
        //     {
        //       stroke: 'rgba(219, 219, 219, 1)',
        //       lineDash: [1, 20]
        //     }
        //   ]
        // },
        type: 'number',
        position: 'bottom',
        title: { text: '% Chance to Drop' },
        // thickness: 1,
        label: {
          formatter: (params) => params.value + '%',
        },
        tick: { width: 1 },
        min: 0,
        max: 100
      },
      {
        gridLine: {
          style: [
            {
              stroke: 'rgba(219, 219, 219, 1)',
              lineDash: [2, 15]
            }
          ]
        },
        type: 'category',
        position: 'left',
        // thickness: 1,
        label: {
          padding: 10,
          // minSpacing: 10,
          fontSize: 14
        },
        title: { text: 'Items' },
        tick: { width: 1 }
      }
    ],
    theme: 'ag-default-dark',
    // title: {
    //     text: title,
    // },
    // subtitle: {
    //     text: 'Collected from users',
    // },
    data,
    series: [
        {
          type: 'bar',
          direction: 'horizontal',
          xKey: 'label',
          yKey: 'value',
          tooltip: {
            renderer: function({ datum, xKey, yKey }) {
              return {
                content: datum[yKey] + "% Avg. Drop Rate",
                title: "Item: " + datum[xKey]
              }
            }
          },
        },
    ],
});

  return <AgChartsReact options={options} />;
}

export default ReactBarGraph;