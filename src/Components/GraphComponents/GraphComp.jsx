import React, { Component } from 'react'
import Chart from 'react-chartjs-2'
import ChartInfoComp from './ChartInfoComp'
import ReactDOM from 'react-dom'
import RadioComp from '../MapComponents/RadioComp'
import ReactDOMServer from 'react-dom/server';
import 'chartjs-plugin-trendline'
import 'chartjs-plugin-annotation'
import { Grow } from '@material-ui/core'
const colorSet = ['rgb(95,0,175,0.4)', 'rgb(95,175,95,0.4)', 'rgb(95,215,255,0.4)', 'rgb(135,95,95,0.4)', 'rgb(135,215,255,0.4)']
var yAxes = []
var X
var ref = React.createRef();



export default function GraphComp(props) {
    const [kind, setKind] = React.useState('Counter');
    const [ticks, setTicks] = React.useState([]);

    var isUpdated = false
    if (props.type === 'bubble') {
        var userArray = []
        var min = 0, max
        // console.log(props.data)
        props.data.map(item => {
            userArray.push(item.Counter)
            return null
        })
        max = Math.max.apply(Math, userArray)
        /// console.log(props.data)
        props.data.map(item => {
            item.CurrentMax = max
            item.Radius = (item.Counter - 0) / (item.CurrentMax - 0) * 30

        })
        //console.log(props.data)

    }
    var getLabelByType = (props) => {

        switch (props.type) {
            case 'pie': {
                return ['Total dev', 'Specific dev']
            } break;
            case 'line': {
                // console.log(props)
                var lable = []
                if (props.kind === 'Growth')
                    lable = [2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019]
                else
                    lable = [2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020]

                return lable


            } break;
            default: {
                return ["Question",
                    "Answer",
                    "Specific dev"]
            } break;

        }
    }
    var prepData = (props) => {
        var datasets = []
        //console.log(props.data)
        props.data.map((item, index) => {
            index = index || 0
            item.type = props.type
            var data = {
                // fill:props.kind==='Growth'?false:true,
                label: item.Name,
                backgroundColor: colorSet[index],
                // trendlineLinear: {
                //     style: "rgb(43 ,66 ,255, 0.3)",
                //     lineStyle: "dotted|solid",
                //     width: 2
                // },
                // pointBackgroundColor: "rgba(220,220,220,1)",
                data: getDataByType(item, index),



            }
            datasets.push(data)
        })
        return datasets
    }

    var getScales = (props) => {
        switch (props.type) {
            case 'bubble': {


                return {
                    xAxes: [{
                        ticks: {
                            stepSize: getStepSizeX(props).stepSize,
                            beginAtZero: true,
                            callback: function (value, index, values) {

                                if (X !== values[1] - values[0])



                                    return value;
                            },


                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Questions'
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            maxTicksLimit: 7,
                            beginAtZero: true,
                            callback: function (value, index, values) {
                                yAxes = values

                                return value;
                            }
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Answers'
                        }
                    }]
                }
            } break
            case 'line': {
                if (props.kind === 'Growth') {
                    return {
                        xAxes: [{

                            ticks: {
                                beginAtZero: true,
                                //  maxTicksLimit:5
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'Year'
                            }

                        }],
                        yAxes: [{
                           

                            ticks: {
                                beginAtZero: true,
                                stepSize: 100,
                                
                                callback: function (value, index, values) {
                                    yAxes = values
    
                                    return value+`%`;
                                }
                                //maxTicksLimit:7
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'Growth percentage'
                            }

                        }]
                    }
                }
            } break
            default: {
                return {
                    xAxes: [{
                        ticks: {
                            beginAtZero: true,
                            //  maxTicksLimit:5
                        },

                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            //maxTicksLimit:7
                        },

                    }]
                }
            } break
        }
    }

    var getDataByType = (item, index) => {
        // 
        switch (props.type) {
            case 'pie': {
                return [item.TotalUsers, item.Counter]
            } break;
            case 'bubble': {
                return [{
                    x: item.Question,
                    y: item.Answer,
                    r: item.Radius
                }]
            } break;
            case 'line': {
                var lineArray = item.RawData.map(item => {
                    //     console.log(item)

                    return item[kind]
                })
                if (props.kind !== 'Growth') {

                    // console.log(lineArray)
                    if (props.number === 0) {

                        return lineArray
                    }
                    else {

                        var new_array = [];
                        lineArray.reduce(function (a, b, i) { return new_array[i] = a + b; }, 0);
                        return new_array
                    }
                }
                else {
                    var Growth = []
                    console.log(lineArray)
                    Growth = lineArray.map((item, index) => {
                        var g = 0
                        if (item === 0 || (lineArray[index + 1] / item)===0)
                            return g
                        else {
                            g = (lineArray[index + 1] / item) * 100
                            return Math.round(g)
                        }
                    })
                    return Growth

                }

            } break;
            default: {
                return [item.Question, item.Answer, item.Counter]
            } break;
        }
    }

    var getToolTips = (tooltipItem, data) => {
        if (props.type === 'doughnut') {
            var dataset = data.datasets[tooltipItem.datasetIndex];
            var total = dataset.data.reduce(function (previousValue, currentValue, currentIndex, array) {
                return previousValue + currentValue;
            });
            var currentValue = dataset.data[tooltipItem.index];
            console.log(tooltipItem.index)
            console.log(data.labels)
            var percentage = Math.floor(((currentValue / total) * 100) + 0.5);
            return data.labels[tooltipItem.index] + '-' + percentage + "%";
        }
    }
    var getAnnonation = (props) => {//add tredline
        switch (props.type) {
            case 'bubble': {


                return {
                    annotations: [{
                        type: 'line',
                        mode: 'horizontal',
                        scaleID: 'y-axis-0',
                        value: 0,
                        endValue: getStepSizeX(props).endValue * 2,
                        borderColor: 'rgb(75, 192, 192)',
                        borderWidth: 4,
                        label: {
                            enabled: true,
                            content: 'Trendline',
                            yAdjust: -16,
                        }
                    }]
                }
            } break;
        }
    }
    var Title = ''
    var getTitle = () => {
        //  console.log(3)
       
        switch (props.type) {
            case 'bubble': {
                Title = `Bubble chart`
            } break;
            case 'line': {
                //  console.log(props.number)
                if (props.kind == 'Growth') {
                    Title = `Growth Chart`
                }
                else {
                    if (props.number === 1)
                        Title = `Cumulative line chart`
                    else
                        Title = `Line chart`
                }
            } break
            case 'doughnut': {
                Title = `Doughnut chart`
            } break
            case 'pie': {
                Title = `Pie chart`
            } break
            case 'bar': {
                Title = 'Bar chart'
            }
        }

        return {
            display: true,
            position:'top',
            padding :10,
            text: ''
        }

    }
    var getOptions = (props) => {
        // console.log(2)
        switch (props.type) {
            case 'doughnut': {
                return {
                    legend: {},
                    maintainAspectRatio: false,
                    responsive: true,

                    scales: getScales(props),
                    // annotation: getAnnonation(props),
                    tooltips: { callbacks: { label: getToolTips } },
                    title: getTitle(),



                }
            } break;
            default: {

                return {
                    scales: getScales(props),
                    legend: {},
                    maintainAspectRatio: false,
                    responsive: true,
                    title: getTitle(),
                    annotation: getAnnonation(props),


                }
            }
        }
    }
    var numberOfSteps = 0
    var getStepSizeX = (props) => {
        if (props.type === 'bubble') {
            var max = 0;
            var stepSize = ''
            var zeroToAdd = 0

            props.data.map(item => {
                if (item.Question >= max) {
                    max = item.Question
                }
            })
            var max1 = String(Math.round(max / 7))
            var max2 = parseInt(max1[0]) + 1
            zeroToAdd = parseInt(max1.length) - 1
            var stepSize = max2
            for (var i = 0; i < zeroToAdd; i++) {
                stepSize += '0'
            }
            var i = 0
            stepSize = parseInt(stepSize)
            while (stepSize * i <= max) {
                i++
            }
            var total = stepSize * i

            return {
                stepSize: stepSize,
                endValue: total
            }
        }
    }

    const options = getOptions(props)



    const data = {
        labels: getLabelByType(props),
        datasets: prepData(props),
        backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)'],
        borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)'],
    }
    var style = { height: props.height, width: props.width, position: 'relative' }
    return (
        <div style={style}>
            <div><ChartInfoComp kind={kind} setKind={setKind} type={props.type} title={Title}></ChartInfoComp> </div>
            <Chart ref={props.type === 'bubble' ? ref : null} type={props.type} data={data} options={options}></Chart>
        </div>
    )
}
