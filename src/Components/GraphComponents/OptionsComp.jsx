import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Checkbox from '@material-ui/core/Checkbox';


const useStyles = makeStyles({
    root: {
        width: 300,
    },
});

function valuetext(value) {
    return `${value}°C`;
}
export default function OptionsComp(props) {
    const [checked, setChecked] = React.useState(false);
    const classes = useStyles();
    const [years, setYears] = React.useState([2010, 2015]);
    const handleChangeCheck = (event) => {
        setChecked(event.target.checked);
        if (event.target.checked === true) {
            props.filterByYear(years)
        }
        else {
            props.filterByYear([2008, 2020])
        }
    };
    const handleChangeSlider = (event, newValue) => {
        setYears(newValue);
        props.filterByYear(newValue)

    };
    const options = props.CountriesList.map(option => {
        const firstLetter = option.properties.name[0].toUpperCase();
        return {
            firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
            ...option,
        };
    });
    const [Country, setCountry] = useState([{ properties: { name: 'Worldwide' } }])
    return (
        <div className='countrytech' style={{}}>

            <div>

                <Autocomplete
                    multiple
                    value={props.Country}
                    limitTags={1}
                    options={props.CountriesList}
                    //options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))
                    groupBy={(option) => option.firstLetter}
                    getOptionLabel={(option) => option.properties.name}
                    // defaultValue={[props.CountriesList[0]]}
                    onChange={(event, value, reason) => {
                        let val = value
                        if (value.length >= 2) {
                            console.log(value[value.length - 1].properties.name)

                            if (value[value.length - 1].properties.name === 'Worldwide') {
                                val = val.filter(item => item.properties.name === 'Worldwide')

                            }
                            else
                                val = val.filter(item => item.properties.name !== 'Worldwide')

                        }
                        setCountry(val)
                        if (checked === false) {
                            props.getCountryTech(val, 'Total')
                        }
                        else {
                            props.getCountryTech(val, years)
                        }
                    }}
                    renderInput={(params) => {

                        return <TextField {...params} variant="outlined" label="Country" placeholder="Country" />
                    }}
                />
            </div>
            <div>
                <Typography id="range-slider" gutterBottom>
                    Year range  <Checkbox
                        checked={checked}
                        onChange={handleChangeCheck}
                        color="primary"

                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                </Typography>
                <Slider
                    value={years}
                    onChange={handleChangeSlider}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                    min={2008}
                    max={2020}
                    disabled={!checked}
                />
            </div>

        </div>
    )
}
