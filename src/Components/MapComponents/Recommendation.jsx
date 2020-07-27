import React from 'react'
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
}));

export default function Recommendation(props) {
    const classes = useStyles();
    if(props.Recommendation===undefined)
    return(<div>Also recommended: None</div>)
    else return (
        <div>
           
        <div style={{ paddingTop: '2px' }}>
            Also recommended: {<Chip
                label={props.Recommendation || 'None'}
                clickable
                avatar={<Avatar><span style={{fontSize:'18px',color:'rgba(0, 0, 0, 0.26)'}}>+</span></Avatar>}
                onClick={()=>{
                    props.handleClick(props.Recommendation)
                }}
                
                key={props.Recommendation}
            />}
        </div >
        </div>
    )
}
