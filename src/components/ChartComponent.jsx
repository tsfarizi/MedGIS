// src/components/ChartComponent.jsx
import { useRef } from 'react';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const ChartComponent = ({ data }) => {
  const chartRef = useRef(null);

  const options = {pointStyle: 'cricle',
    plugins: {
      legend: {
        display: true,
        position: 'left', 
        align: 'end', 
        labels: {
          boxWidth: 20,
          padding: 20, 
          color: 'white',
          font: {
            size: 14,
          },
          usePointStyle: true, 
          pointStyle: 'circle',
        },
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (tooltipItem) {
            const label = data.labels[tooltipItem.dataIndex];
            const value = data.datasets[0].data[tooltipItem.dataIndex];
            return `${label}: ${value}`;
          },
        },
      },
    },
    maintainAspectRatio: false,
    aspectRatio: 1, 
    layout: {
      padding: {
        top: 5,
        left: 15,
        right: 15,
        bottom: 5,
      },
    },
  };

  return (
    <Doughnut data={data} options={options} ref={chartRef} />
  );
};

ChartComponent.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ChartComponent;
