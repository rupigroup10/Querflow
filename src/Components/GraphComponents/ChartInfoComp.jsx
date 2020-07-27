import React from 'react'
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
var longText = `Normalization by the number of users in the technology inside the country. the country that has the most users in the specific technology get full color and the lowest usage get none.`

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        position:'absolute',
        top:-5
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));
export default function ChartInfoComp(props) {
    var info = ''
    switch (props.type) {
        case 'bubble': {
            info = `Display the ratio between technologies.Size-determine the number of developer.X axis-number of question.Y axis-number of answers. Trendline:2 answers per question`
        } break;
        case 'line': {
            info = `Display the data per year`
        } break
        case 'doughnut': {
            info = `Display the ratio between number of developer, number of questions and number of answers`
        } break
        case 'pie': {
            info = `Display the usage of selected technology from all technologies`
        } break
        case 'bar': {
            info = 'Display the number of developers,answer,question'
        }
    }
    const classes = useStyles();
  //  const [kind, setKind] = React.useState('Developers');

    const handleChange = (event) => {
        props.setKind(event.target.value);
    };
    if (props.type === 'line')
        return (
            <div style={{width:'100%', zIndex: 666, position: 'absolute', top: 0 ,opacity:1}}>
                <Tooltip title={info}>

                    <img style={{ height: '20px', paddingLeft: '10px', paddingTop: '5px' }} src='https://image.flaticon.com/icons/svg/785/785822.svg'></img>

                </Tooltip>
                <FormControl style={{width:'1vw'}} className={classes.formControl }>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={props.kind}
                        onChange={handleChange}
                    >
                        <MenuItem value={'Counter'}>Developers</MenuItem>
                        <MenuItem value={'CountQuestion'}>Question</MenuItem>
                        <MenuItem value={'CountAnswer'}>Answer</MenuItem>
                    </Select>
                </FormControl>
                <p style={{position:'relative',top:-20,textAlign:'right',paddingRight:'10px',zIndex:-1 ,fontWeight:400}}>  {props.title}</p> 

            </div>
        )
    else
        return (<div  style={{ width:'100%', zIndex: 666, position: 'absolute', top: 0 ,opacity:1}}>
            <Tooltip title={info}>

                <img style={{ position:'relative',left:0,height: '20px', paddingLeft: '10px', paddingTop: '5px' }} src='https://image.flaticon.com/icons/svg/785/785822.svg'></img>

            </Tooltip>
            <p style={{position:'relative',top:-20,textAlign:'right',paddingRight:'10px',zIndex:-1,fontWeight:400}}>  {props.title}</p> 

        </div>)
}
