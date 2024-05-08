import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const DoughnutChart = () => {
    const data = {
        datasets: [
            {
                data: [2, 3, 6, 1, 7, 4],
                label: 'Dataset 1',
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)',
                    'rgba(120, 111, 166,1.0)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                ],
                hoverOffset: 10
            }
        ],
        labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue']
    };

    return (
        <Doughnut
            data={data}
            height={121}
            width={250}
            options={{
                legend: {
                    display: false,
                    labels: {
                        boxWidth: 0
                    }
                },
                circumference: 1 * Math.PI,
                rotation: 1 * Math.PI
            }}
        />
    );
};

export default DoughnutChart;
