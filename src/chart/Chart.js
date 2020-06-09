import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';


const Chart = (props) => {
    return (
        <BarChart
            fontSize={8}
            width={1000}
            height={450}
            data={props.data}
            margin={{
                top: 5, right: 30, left: 20, bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="2 2"/>
            <XAxis
                dataKey={'admArea'}
                fontSize={15}
                dy={5}
            />
            <YAxis/>
            <Tooltip/>
            {/*<Legend/>*/}
            <Bar dataKey={'total'} fill="#55ff55"/>
        </BarChart>
    )
};

export default Chart;
