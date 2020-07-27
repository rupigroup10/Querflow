import React, { useState } from 'react'
//import Technologies from '../../Files/Technologies'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Recommendation from '../MapComponents/Recommendation'
import { Button } from "@material-ui/core";
import Chip from '@material-ui/core/Chip';


const useStyles = makeStyles((theme) => ({
    root: {

        width: '30vw',
        position: 'relative',

        left: '50%',
        transform: 'translate(-50%)',




        '& > * + *': {
            marginTop: theme.spacing(3),
        },
    },
}));


export default function ComprationBar(props) {

    var handleClick = (value) => {


        var recommend = props.Tags.filter(item => item.TagName === value[0])
        console.log(props)

        setVal(oldArray => [...oldArray, recommend[0]])
        var newVal = val
        newVal.push(recommend[0])
        props.getTechResearch(newVal)

    }




    const classes = useStyles();
    const [val, setVal] = useState([])


    return (
        <div className={classes.root+' Compare'} style={{display:'flex'}}>
        
            <React.Fragment>
                <Autocomplete
                    multiple

                    limitTags={1}
                    id="multiple-limit-tags"
                    options={props.Tags}
                    value={props.Tech}
                    getOptionLabel={(Tags) => {
                        return Tags.TagName
                    }}
                    onChange={(event, value, reason) => {
                        setVal(value)


                        //  props.TechChoosen(value)
                        props.getTechResearch(value)


                    }}

                    renderInput={(params) => {

                        return <TextField {...params} variant="outlined" label="Technology" placeholder="Technology" />
                    }}
                />
            </React.Fragment>
           
                {props.Type === 'Map' ? <div className='Recommendation' style={{display:'flex',margin: 0, padding: 0 }}>
                    <Recommendation handleClick={handleClick} Recommendation={props.Recommendation}></Recommendation>
                </div> : <div></div>}
           

        </div>
    )

}