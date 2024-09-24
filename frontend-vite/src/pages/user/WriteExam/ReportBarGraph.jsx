import React from 'react';
import { Bar } from '@ant-design/charts';

const ReportBarGraph = ({ result }) => {
  // Data for the bar graph
  const data = [
    {
      skill: 'Technical Skills',
      marks: result.technical,
    },
    {
      skill: 'Human Skills',
      marks: result.human,
    },
    {
      skill: 'Conceptual Skills',
      marks: result.conceptual,
    },
  ];
  const config = {
    data,
    xField: 'marks', 
    yField: 'skill', 
    seriesField: 'skill', 
    color: ['#1890ff', '#73d13d', '#ffa940'], 
    barWidthRatio: 0.4, 
    label: {
      position: 'middle',
      style: {
        fill: '#fff',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
      title: {
        text: 'Marks',
        style: {
          fontSize: 12,
          fontWeight: 500,
        },
      },
    },
    yAxis: {
      title: {
        text: 'Skills',
        style: {
          fontSize: 12,
          fontWeight: 500,
        },
      },
    },
    tooltip: {
      showMarkers: false,
    },
    interactions: [{ type: 'active-region', enable: false }],
    legend: {
      position: 'top-left',
    },
  };

  return (
    <div>
      <h2 className="text-md">Skills Marks Bar Graph</h2>
      <Bar {...config} />
    </div>
  );
};

export default ReportBarGraph;
