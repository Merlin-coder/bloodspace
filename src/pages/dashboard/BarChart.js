import React from 'react';
import Chart from 'react-apexcharts';

const BarChart = ({ data }) => {
    return <Chart series={data?.series} type="bar" height="242px" options={data?.options} />;
};

export default BarChart;
