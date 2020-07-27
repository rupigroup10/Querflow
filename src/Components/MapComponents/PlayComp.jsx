import React, { useState } from 'react'
import '../../Styles/PlayStyle.css'

import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function PlayComp(props) {

    
    const [icon, setIcon] = useState('fa fa-play')
   // const [val, setVal] = useState(10)
    const handleClick = () => {
        props.HandlePlay(setIcon,icon)
       // setVal(50)
    }
    return (
        <div style={{ height: '50px', width: '50px', paddingLeft: '10px' }}>
          
            <CircularProgressbarWithChildren value={props.per} styles={buildStyles({ pathColor: `blue`,pathTransitionDuration:'2' })} >
                <div style={{ position: 'relative', zIndex: 4 }} onClick={handleClick}>
                    <a href="#" class="round-button"><i style={{ left: '15px' }} class={icon}></i></a>
                </div>
            </CircularProgressbarWithChildren>
        </div>
    )
}
