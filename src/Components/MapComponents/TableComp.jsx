import React from 'react'
import ReactDOMServer from 'react-dom/server'
import DataTable from 'react-data-table-component';
import styled from 'styled-components';
import { Button } from '@material-ui/core'


var makeColumns = (props) => {
    var columns = []
    props.data.features.map(item => {

        switch (Object.keys(item.properties).length) {
            case 1://case for empty tech
            case 9://case for one tech
                columns = [
                    {
                        name: '',
                        selector: 'pic',
                      //  cell: row => <div style={{ width:'30px' }}>{row.pic}</div>

                    },
                    {
                        name: 'Country',
                        selector: 'country',
                        sortable: true,

                    }, {
                        name: 'Number of users',
                        selector: 'counter', sortable: true,
                    }, {
                        name: 'Number of questions',
                        selector: 'question', sortable: true
                    }, {
                        name: 'Number of answers',
                        selector: 'answer', sortable: true
                    }, {
                        name: 'Total users',
                        selector: 'totalusers', sortable: true
                    }]
                break
            case 2://case for 2 tech
                columns = [
                    {
                        name: '',
                        selector: 'pic'
                    },
                    {
                        name: 'Country',
                        selector: 'country',
                        sortable: true,

                    }, {
                        name: 'Number of users',
                        selector: 'counter', sortable: true,
                        cell: row => <div style={{ color: 'red' }}><div style={{ color: 'green' }} >{row.counter1}</div>{row.counter2}</div>
                    }, {
                        name: 'Number of questions',
                        selector: 'question', sortable: true,
                        cell: row => <div style={{ color: 'red' }}><div style={{ color: 'green' }}>{row.question1}</div>{row.question2}</div>
                    }, {
                        name: 'Number of answers',
                        selector: 'answer', sortable: true,
                        cell: row => <div style={{ color: 'red' }}><div style={{ color: 'green' }}>{row.answer1}</div>{row.answer2}</div>
                    }, {
                        name: 'Total users',
                        selector: 'totalusers', sortable: true
                    }]
                break


        }

    })
    return columns
}
var makeData = (props) => {
    var data = []
    props.data.features.map(item => {

        switch (Object.keys(item.properties).length) {
            case 1:
            case 9:
                var obj = {
                    key: item,
                    pic: <img src={item.pic} style={{ width: '30px', paddingRight: '5px' }}></img>,
                    country: item.properties.name,
                    counter: item.properties.counter,
                    question: item.properties.question,
                    answer: item.properties.answer,
                    totalusers: item.properties.totalusers
                }
                data.push(obj)
                break
            case 2:
                var obj = {
                    key: item,
                    pic: <img src={item.pic} style={{ width: '30px', paddingRight: '5px' }}></img>,
                        country: `${item.properties[0].name}`,
                    counter1: item.properties[0].counter,
                    counter2: item.properties[1].counter,
                    question1: item.properties[0].question,
                    question2: item.properties[1].question,
                    answer1: item.properties[0].answer,
                    answer2: item.properties[1].answer,
                    totalusers: item.properties[0].totalusers
                }
                data.push(obj)

        }

    })
    return data

}
var getTech = (props) => {
    var tech = []
    props.tech.map(item => {
        tech.push(item.TagName)
    })
    return tech
}
const TextField = styled.input`
  height: 32px;
  width: 200px;
  border-radius: 3px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: 1px solid #e5e5e5;
  padding: 0 32px 0 16px;

  &:hover {
    cursor: pointer;
  }
`;
const ClearButton = styled(Button)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  height: 34px;
  width: 32px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;


var rowStyle=()=>{

}


export default function TableComp(props) {

    const columns = makeColumns(props)
    const data = makeData(props)
    

    return (


        <DataTable title="Statistics"
            columns={columns}
            highlightOnHover={true}
            data={data}
            fixedHeader
            fixedHeaderScrollHeight="300px"
            onRowClicked={props.addMarker}
            subHeader
            //conditionalRowStyles={conditionalRowStyles}



        />


    )
}




