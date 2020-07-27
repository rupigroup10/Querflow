import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';



export default function InfoComp(props) {
   
    if (props.norm === 'minmax') {
        var longText = `Normalization by the number of users in the technology inside the country. the country that has the most users in the specific technology get full color and the lowest usage get none.
    `;
    }
    else longText = `Normalization by the numbers of users in the technology devided by total number of users of all technologies inside the country`
    return (
        <div style={{ position: 'relative', right: 25, bottom: -0 }}>

            <Tooltip  title={longText}>

                <img  style={{ height: '4vh',paddingLeft:'15px',paddingTop:'10px' }} src='https://image.flaticon.com/icons/svg/785/785822.svg'></img>

            </Tooltip>
        </div>
    )
}
//