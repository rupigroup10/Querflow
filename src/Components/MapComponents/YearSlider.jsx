import React from 'react'
import Slider from './Slider'
export default function YearSlider(props) {
    if(props.techs.length===2)
    return(
        <div>
             <div style={{ position: 'absolute', left: '50%', bottom: 0, zIndex: 2,zIndex:3,transform:'translate(-50%, -50%)',margin:'0',marginRight:'-50%'}}>
               <Slider playYear={props.playYear} Year={props.Year} getYear={props.getYear} getNew={props.GetNew} style={{}}></Slider>



                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div style={{ float: 'left', fontWeight: '400' }}>High useage </div>

                    <div style={{ float: 'left', borderRadius: '5px', backgroundImage: "linear-gradient(to right,red, white ,green)", width: '15vw', height: '2vh' }}></div>
                    <div style={{ float: 'left', fontWeight: '400' }}> High useage</div>
                </div>
            </div>
        </div>
    )
    else return (
        <div>
             <div style={{ position: 'absolute', left: '50%', bottom: 0,zIndex:3,transform:'translate(-50%, -50%)',margin:'0',marginRight:'-50%'}}>
               <Slider playYear={props.playYear} Year={props.Year} getYear={props.getYear} getNew={props.GetNew} style={{}}></Slider>



                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div style={{ float: 'left', fontWeight: '400' }}>Low useage </div>

                    <div style={{ float: 'left', borderRadius: '5px', backgroundImage: "linear-gradient(to right,white 25%,green)", width: '15vw', height: '2vh' }}></div>
                    <div style={{ float: 'left', fontWeight: '400' }}> High useage</div>
                </div>
            </div>
        </div>
    )
}

