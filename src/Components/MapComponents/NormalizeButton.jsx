import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import InfoComp from '../MapComponents/InfoComp'
//zIndex: 2, position: 'absolute', top: 80, left: 50

export default function NormalizeButton(props) {
    const [value, setValue] = React.useState('minmax');
    const handleChange = (event) => {
        setValue(event.target.value);
        
        props.getNormalize(event.target.value)
    };
    return (

        <div style={{borderRadius:'5px', zIndex: 2, position: 'absolute', top: 20, left: 15,backgroundColor:'$ground',boxShadow:'0 0 5px',minWidth:'300x' }}>

            <FormControl component="fieldset">
                <FormLabel component="legend">Normalize options:</FormLabel>
                <RadioGroup aria-label="norm" name="norm1" value={value} onChange={handleChange}>
                    <div style={{display:'flex'}}>
                     
                    <FormControlLabel value="minmax"  control={<Radio />} label="Min Max"/> 
                    <InfoComp norm={'minmax'}></InfoComp>
                  
                    </div>
                    <div style={{display:'flex'}}>
                    <FormControlLabel value="totaluser" control={<Radio />} label="Total users per country" />
                    <InfoComp norm={'total'}></InfoComp>
                   
                    </div>
               </RadioGroup>
            </FormControl>
        </div>

    )
}
