import React from 'react';
import './style.css';
import { useState, useRef, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Chart, registerables } from 'chart.js';
// Chart.register(...registerables);

export default function App() {
  const [data, setData] = useState({ protein: '', carbohydrate: '', fat: '' });
  const canvasRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData({ ...data, [name]: value });
  };

  useEffect(() => {
    const chartData = [
      parseInt(data.protein),
      parseInt(data.carbohydrate),
      parseInt(data.fat),
    ];
    console.log(canvasRef);
    const newChart = new Chart(canvasRef.current, {
      type: 'doughnut',
      data: {
        labels: ['Protein', 'Carbohydrate', 'Fat'],

        datasets: [
          {
            label: 'My First Dataset',
            data: chartData,
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
            ],
            hoverOffset: 4,
          },
        ],
      },

      options: {
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',

            labels: {
              usePointStyle: true,
              pointStyle: 'rect',
              font: {
                size: 16,
              },
            },
          },
        },
      },
    });

    return () => {
      newChart.destroy();
    };
  }, [data]);

  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <TextField
          className="TextField"
          label="Protein"
          name="protein"
          value={data.protein}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          className="TextField"
          label="Carbohydrate"
          name="carbohydrate"
          value={data.carbohydrate}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          className="TextField"
          label="Fat"
          name="fat"
          value={data.fat}
          onChange={handleChange}
          variant="outlined"
        />

        <section className="btn-section">
          <Button type="submit" variant="contained" color="secondary">
            submit
          </Button>
        </section>
      </form>

      <div>
        <canvas className="canvas" id="canvas" ref={canvasRef}></canvas>
      </div>
    </div>
  );
}
