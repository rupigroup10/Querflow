import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import PlayComp from './PlayComp'
import '../../Styles/SliderStyle.css'
const useStyles = makeStyles({
    root: {
        width: 300,
    },
});

export default function YearSlider(props) {
    const [val, setVal] = useState(2015)
    const [per, setPer] = useState(0)
    const [inter, setInter] = useState()


    const classes = useStyles();
 
    const HandleClick = (e) => {
        props.getYear(parseInt(e.target.innerText))

    }

    var interval;
    const HandlePlay = (setIcon, icon) => {
       
        console.log(icon)
        if (icon === 'fa fa-play') {
           
            console.log(1)
            setIcon('fa fa-pause')
            var year = 2008
            var per = 0
            
            interval = setInterval(() => {
                per = per + 7.7
                setVal(year)
                setPer(per)
                props.getYear(year)
                year = year + 1

                if (year === 2021) {
                    setIcon('fa fa-play')
                  //  stopInterval(inter)
                    clearInterval(interval)
                    setPer(0)

                }
            }, 4000)
            setInter(interval)
            console.log('start'+interval)


          //  setInter(interval)
        }
        else {
            setIcon('fa fa-play')
            console.log('stop'+inter)
           clearInterval(inter)
            setPer(0)
        }


    }
   
    const HandleChange = (e, v) => {
        console.log(props.Year)
        console.log(v)
        setVal(v)

    }
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", paddingBottom: '10px' }}>

            <div className={classes.root}>

                <Slider
                    defaultValue={props.Year}
                    // getAriaValueText={props.getYear }
                    aria-labelledby="discrete-slider-small-steps"
                    step={1}
                    marks
                    min={2008}
                    max={2020}
                    valueLabelDisplay="on"
                    onChange={HandleChange}
                    onChangeCommitted={HandleClick}
                    value={val}

                />

            </div>
            <PlayComp HandlePlay={HandlePlay} per={per} playYear={props.playYear} getYear={props.getYear}></PlayComp>
        </div>
    )
}
