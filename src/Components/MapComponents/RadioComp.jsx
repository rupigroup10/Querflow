import React from 'react'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
export default function RadioComp(props) {
    return (
        <div>
           <FormControl component="fieldset" >
      <RadioGroup row aria-label="position" name="position" defaultValue="Counter" onChange={(event)=>{
          props.setKind(event.target.value)
      }} >
      
        <FormControlLabel value="Counter" control={<Radio color="primary"   />}  label="Show users" />
        <FormControlLabel value="CountQuestion" control={<Radio color="primary" />} label="Show questions" />
        <FormControlLabel value="CountAnswer" control={<Radio color="primary" />} label="Show answers" />
      </RadioGroup>
    </FormControl>
        </div>
    )
}
