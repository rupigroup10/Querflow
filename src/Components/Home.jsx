import React, { Component } from 'react'
import { zIndex } from 'material-ui/styles'

export default class Home extends Component {
    render() {
        return (
            <div style={{ height: '90vh', position: 'relative', zIndex: 0,display:'flex',justifyContent:'center',alignItems:'center' }} >

                <div style={{ position: 'absolute', zIndex: -1, top: 0, bottom: 0, right: 0, left: 0, backgroundImage: 'url(https://image.flaticon.com/icons/png/512/2919/2919722.png)', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', opacity: 0.3, width: '100%', height: '100%' }} />
                <div style={{width:'50%'}}>
                    <p>
                        <strong>Querflow</strong> is a research system based on Stackoverflow database. The system provides easy Interface to explore programming language development In time and location levels.
            </p>
            <p>System built by Or Segal, Ruppin academic center.</p>
                </div>
            </div>
        )
    }
}
