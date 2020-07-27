import React from 'react'

export default function Feature(props) {
      var totalTechs=props.feature.properties[0].counter+props.feature.properties[1].counter
      var firstDeg=(props.feature.properties[0].counter/totalTechs)*360
      var deg=0
      var percent=parseInt((firstDeg/360)*100) 
 console.log(firstDeg)
 if(isNaN(percent)===true)
 percent=0
//var firstDeg=90
if(firstDeg<180){
    deg=firstDeg+90
   
    return (
        <div>
              <div style={{position:'relative',textAlign:'center',margin:'auto',width:'70px',height:'70px',borderRadius:'100%',backgroundColor:'green',backgroundImage:'linear-gradient('+deg+'deg, transparent 50%, red 50%),linear-gradient(90deg, red 50%, transparent 50%)'}}>
            <div style={{position:'relative',top:'10px',left:'10px',textAlign:'center',width:'50px',height:'50px',borderRadius:'100%',backgroundColor:'#ffffff'}}><span style={{color:'green'}}>{percent}%</span><br></br><span style={{color:'red'}}>{100-percent}%</span></div>
            </div>
            
            </div>
      
    )
   
}
else 
deg=firstDeg-90
{return (
    <div>
    <div style={{position:'relative',textAlign:'center',margin:'auto',width:'70px',height:'70px',borderRadius:'100%',backgroundColor:'green',backgroundImage:'linear-gradient('+deg+'deg, transparent 50%, green 50%),linear-gradient(90deg, red 50%, transparent 50%)'}}>
    <div style={{position:'relative',top:'10px',left:'10px',textAlign:'center',width:'50px',height:'50px',borderRadius:'100%',backgroundColor:'#ffffff'}}><span style={{color:'green'}}>{percent}%</span><br></br><span style={{color:'red'}}>{100-percent}%</span></div>
    </div>
   
    </div>
    )
}
}
