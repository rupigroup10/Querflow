import React from 'react'

export default function TableMap(props) {
    return (
        <table>
                                <tr>
                    <th><img style="width:30px; border:1px solid black" src={props.feature.pic}></img></th>
                    <th align="center">${props.feature.properties[0].technology.toString()}</th>
                    <th align="center">${props.feature.properties[1].technology.toString()}</th>
                  </tr>
                  <tr>
                    <td>Users</td>
                    <td align="center">${props.feature.properties[0].counter.toString()}</td>
                    <td align="center">${props.feature.properties[1].counter.toString()}</td>
                  </tr>
                  <tr>
                    <td>Questions</td>
                    <td align="center">${props.feature.properties[0].question.toString()}</td>
                    <td align="center">${props.feature.properties[1].question.toString()}</td>
                  </tr>
                  <tr>
                    <td>Answers</td>
                    <td align="center">${props.feature.properties[0].answer.toString()}</td>
                    <td align="center">${props.feature.properties[1].answer.toString()}</td>
                  </tr>
                                </table>
    )
}
