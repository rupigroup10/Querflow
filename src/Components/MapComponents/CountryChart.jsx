import React, { useState } from 'react'
import RadioComp from './RadioComp'
import Chart, { Line } from 'react-chartjs-2';






export default function CountryChart(props) {
    const [kind, setKind] = useState('Counter')
    var colors = ['green', 'red', 'blue']
    var getLabel = (data) => {
        var myData = data[0] || []
        var arrayLabel = []
        myData.map(item => {
            arrayLabel.push(item.UsageYear)
        })
        return arrayLabel
    }
    var getData = (data) => {
        //var myData = data[0] || []
        var myData = data
        var arrayData = []
        myData.map(item => {
            arrayData.push(item[kind])
        })
        return arrayData
    }
    var getDataSet = (data) => {

        var edit = kind === 'Counter' ? 'users' : kind === 'CountQuestion' ? 'questions' : 'answers'
        var dataSet = []
        data.map((item, index) => {
            var d = getData(item)
            var set = {
                label: 'Number of ' + edit + '-' + item[0].Technology,
                fill: false,
                lineTension: 0.1,
                backgroundColor: colors[index],
                borderColor: colors[index],
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: colors[index],
                pointBackgroundColor: colors[index],
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: colors[index],
                pointHoverBorderColor: colors[index],
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: d
            }
            dataSet.push(set)
        })
        return dataSet
    }
    var labels = getLabel(props.data)
    var countryName = props.data.length === 0 ? 'Choose country' : props.data[0][0].uniq_name
    // var datas = getData(props.data)


    var myDataset = getDataSet(props.data)
    const data = {
        labels: labels,
        datasets: myDataset
    };
    return (
        <div style={{ width:'100%'}}>
            <div>

                <p style={{ textTransform: 'capitalize', fontWeight: 400, fontSize: '22px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI" ,"Roboto", "Oxygen"' }}>{countryName}</p>
                <RadioComp setKind={setKind}></RadioComp>
                <div style={{height:'40vh'}}>
                    <Chart
                    type={'line'} 
                       data={data} height={175} />

                </div>

            </div>
        </div>
    )
}
