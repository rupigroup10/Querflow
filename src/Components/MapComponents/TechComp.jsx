import React from 'react'


  
var colors=['green','red','blue']

export default function TechComp(props) {
    return (
        <div style={{ position: 'absolute', zIndex: 2, left: 15, bottom: 50}}>
            {props.techs.map((tech,index)=>{
                return<div key={tech.TagName}><span style={{height:'15px',width:'15px' ,backgroundColor:colors[index],borderRadius:'50%',display:'inline-block'}}></span>{tech.TagName}</div>
            })}
        </div>
    )
}
