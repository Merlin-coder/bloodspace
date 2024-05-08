import React from 'react';
import Chart from 'react-apexcharts';

const LineChart = ({ data }) => {
    return <Chart series={data?.series} type="line" height="350px" options={data?.options} />;
};

export default LineChart;
