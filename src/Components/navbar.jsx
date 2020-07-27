import React, { Component } from 'react'
import { Navbar, Nav, Form, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

const myStyle = {
    marginLeft: '5vh',
    color: 'black',
    fontSize: '1.5em',
    textDecoration: "none",
    display:'flex'



}
const picStyle = {
    height: '3vh', paddingRight: '2px', position: 'relative', left: -5, bottom: -5
}
export default class navbar extends Component {

    render() {
        return (

            // <Navbar style={{}} expand="lg">
            //     <Navbar.Brand > <img style={{ height: "16vh", float: "left", position: 'absolute', top: -30 }} src="https://i.ibb.co/4J6fJcy/unnamed.png" alt="pic"></img></Navbar.Brand>

            //     <Nav style={{ height: "8vh", display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
            //         <NavLink style={myStyle} activeStyle={{ fontWeight: 'bold' }} exact to="/igroup10/prod/client/"><img src="https://image.flaticon.com/icons/svg/2948/2948210.svg" style={picStyle}></img>Home</NavLink>
            //         <NavLink style={myStyle} activeStyle={{ fontWeight: 'bold' }} to="/map"><img src='https://image.flaticon.com/icons/svg/2909/2909523.svg' style={picStyle}></img>Map</NavLink>
            //         <NavLink style={myStyle} activeStyle={{ fontWeight: 'bold' }} to={"/graph"}><img src="https://image.flaticon.com/icons/png/512/3037/3037099.png" style={picStyle}></img>Graph</NavLink>
            //     </Nav>

            <Navbar  expand="sm">
                <Navbar.Brand > <img className='logoImg' style={{ height: "14vh", float: "left", position: 'absolute', top: -25 }} src="https://i.ibb.co/4J6fJcy/unnamed.png" alt="pic"></img></Navbar.Brand>                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto" style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center",width:'100%' }}>
                        <NavLink style={myStyle} activeStyle={{ fontWeight: 'bold' }} exact to="/igroup10/prod/client/"><img src="https://image.flaticon.com/icons/svg/2948/2948210.svg" style={picStyle}></img>Home</NavLink>
                        <NavLink style={myStyle} activeStyle={{ fontWeight: 'bold' }} to="/igroup10/prod/client/map"><img src='https://image.flaticon.com/icons/svg/2909/2909523.svg' style={picStyle}></img>Map</NavLink>
                        <NavLink style={myStyle} activeStyle={{ fontWeight: 'bold' }} to={"/igroup10/prod/client/graph"}><img src="https://image.flaticon.com/icons/png/512/3037/3037099.png" style={picStyle}></img>Graph</NavLink>
                    </Nav>



                </Navbar.Collapse>
            </Navbar>
            // </Navbar>



        )
    }
}

