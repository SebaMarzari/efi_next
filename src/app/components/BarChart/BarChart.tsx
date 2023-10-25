import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = () => {
  // Datos para el gráfico
  const data = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
    datasets: [
      {
        label: 'Ventas Mensuales',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75, 192, 192, 0.4)',
        hoverBorderColor: 'rgba(75, 192, 192, 1)',
        data: [65, 59, 80, 81, 56], // Datos de ventas para cada mes
      },
    ],
  };

  return (
    <div>
      <h2>Ventas Mensuales</h2>
      <Bar data={data} />
    </div>
  );
};

export default BarChart;
