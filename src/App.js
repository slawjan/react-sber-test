import React, {useEffect, useState} from 'react';
import './App.css';
import Control from "./control/Control";
import Chart from "./chart/Chart";
import Loader from "./loader/Loader";

//Ввести ключ из письма сюда.
const API_KEY = 'API_KEY';

function App() {

    const [state, setState] = useState({
        type: "total",
        years: [],
        months: [],
        dataForChart: [],
        dataset: [],
        year: 2016,
        month: 'Апрель'
    });

    let groupBy = (array, prop) => {
        return array.reduce((acc, i) => {
            const key = i[prop];

            if (!acc[key]) {
                acc[key] = []
            }
            acc[key] = +acc[key] + +((i.total).toFixed(2));
            return acc
        }, {})
    };

    let dataForChart = (data) => Object.entries(groupBy(data, 'admArea')).map(([key, val]) => ({
        admArea: key,
        total: val.toFixed(2)
    }));

    useEffect(() => {
        fetch(`https://apidata.mos.ru/v1/datasets/2981/rows?api_key=${API_KEY}`)
            .then(res => res.json())
            .then(data => {
                    let years, months, dataset, dataFor;
                    dataset = data.map(v => {
                        let f = v['Cells'];
                        return ({
                            admArea: f.AdmArea,
                            month: f.Month,
                            year: f.Year,
                            total: +(f.TotalAmount)
                        })
                    });
                    dataFor = dataForChart(dataset);
                    years = [...new Set(data.map(v => v['Cells']['Year']))];
                    months = [...new Set(data.map(v => v['Cells']['Month']))];
                    setState(prev => ({
                        ...prev,
                        year: years[0],
                        month: months[0],
                        years,
                        months,
                        dataset,
                        dataForChart: dataFor
                    }))
                }
            )
    }, []);


    function select(e) {
        setState((prev) => {
                let st = ({...prev, [e.target.name]: e.target.value});
                if (st.type === 'total') {
                    let m = new Set();
                    st.dataset.map(el => {
                        m.add(el.month)
                    });
                    return ({...st, months: [...m], dataForChart: dataForChart(st.dataset)})
                } else {
                    let m = new Set();
                    let curMonth = st.month;
                    st.dataset.map(el => {
                        if (el.year === +st.year) {
                            m.add(el.month)
                        }
                    });
                    if (!m.has(st.month)) {
                        curMonth = [...m][0]
                    }
                    return ({
                        ...st,
                        months: [...m],
                        month: [...m][0],
                        dataForChart: st.dataset.filter(el => (el.year === +st.year && el.month === curMonth))
                    })
                }
            }
        )
    }

    return (
        <div className="App">
            {(state.dataForChart.length > 0) ?
                <div>
                    <Control data={state} select={select}/>
                    <Chart data={state.dataForChart}/>
                </div> :
                <Loader/>
            }
        </div>
    );
}

export default App;
