import React, { useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import '../css/Chart.css';

// 注册必要组件
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Chart = ({ dailyJobCounts }) => {
    const chartRef = useRef(null);

    const chartData = {
        labels: Object.keys(dailyJobCounts),
        datasets: [
            {
                label: 'Daily Job Count',
                data: Object.values(dailyJobCounts),
                backgroundColor: 'rgba(70, 130, 180, 0.6)', // 蔚蓝色
                borderColor: 'rgba(70, 130, 180, 1)', // 更深的蔚蓝色
                borderWidth: 1,
            },
        ],
    };

    useEffect(() => {
        console.log('Chart Data:', chartData);
    }, [chartData]);

    return (
        <div className="chart-container">
            {(chartData.labels.length && chartData.datasets[0].data.length) > 0 ? (
                <Bar ref={chartRef} data={chartData} options={{ responsive: true }} />
            ) : (
                <div>No data to display</div>
            )}
        </div>
    );
};

export default Chart;
