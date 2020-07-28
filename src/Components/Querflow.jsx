import React, { Component } from 'react'
import Navbar from './navbar'
import Graph from './Graph'
import Map from './Map'
import Countries from '../Boundries/countries.json'
import { BrowserRouter as Router } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import LoadingOverlay from 'react-loading-overlay';
import Home from './Home'
//import $ from 'jquery';
//import CSVReader from 'react-csv-reader'
//import Involved from '../Files/Involved.json'
//import Feature from './MapComponents/Feature'
export default class Querflow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ChartData: [],
            Tags: [],
            Flags: [],
            TechChoosen: [],
            Layer: Countries,
            TechOverTheYear: [[]],
            mapYear: 2015,
            Loading: false,
            Recommendation: undefined,
            GraphStates: {
                Tech: [],
                ChartData:[],
                Country:[{ properties: { name: 'Worldwide' } }],
                countriesChoosen:[]
            }





        }
    }

    setChartData = (chartData) => {
        this.setState({
            ChartData: chartData
        })
    }

    getTechChoosen = (value) => {
        //    console.log(value)
        this.setState({
            TechChoosen: value
        })
    }

    componentDidMount = () => {

        this.getTags()
        this.getFlags()

    }

    getTags = () => {
        fetch(`https://querflow.herokuapp.com/Technology`)
            .then(res => res.json())
            .then(res => this.setState({
                Tags: res
            }))

    }
    getFlags = () => {

        fetch(`https://querflow.herokuapp.com/flags`)
            .then(res => res.json())
            .then(res => this.setState({
                Flags: res
            }))

    }
    setMapYear = (value) => {
        this.setState({
            mapYear: value
        })
    }

    setLayer = (value) => {
        this.setState({
            Layer: value
        })
    }
    setTechOverTheYear = (value) => {
        this.setState({
            TechOverTheYear: value
        })
    }
    setLoading = (loading) => {
        this.setState({
            Loading: loading
        })
    }
    graphUnmount = (Tech,chartData,country,countriesChoosen) => {
        console.log(countriesChoosen)
        this.setState({
            GraphStates: {
                Tech: Tech,
                ChartData:chartData,
                Country:country,
                CountriesChoosen:countriesChoosen

            }
        })
    }

    render() {
        return (
            <div >
                                <div style={{ position: 'absolute', zIndex: -1, top: 0, bottom: 0, right: 0, left: 0, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', opacity: 0.1, width: '100%', height: '100%' }} ><img style={{width:'100%',height:'100%'}} src="https://image.freepik.com/free-vector/white-technology-background-abstract-design_23-2148392756.jpg"></img></div>

                {/* {console.log(this.state.TechChoosen)} */}
                <LoadingOverlay
                    active={this.state.Loading}
                    spinner
                    text='Loading your content...'
                >
                    <Router className="App" >
                        <div style={{ width: '100%', position: 'fixed', zIndex: 5, overflow: 'hidden', background: 'rgb(255,255,255, 0.9)' }} >
                            <Navbar></Navbar>
                        </div>
                        <div style={{ paddingTop: '9vh' }}>
                            <Route path='/igroup10/prod/client/' exact strict>
                                <Home></Home>
                            </Route>
                            <Route path='/igroup10/prod/client/map' exact strict>
                                {<Map mapYear={this.state.mapYear} setMapYear={this.setMapYear}
                                    TechOverTheYear={this.state.TechOverTheYear} setTechOverTheYear={this.setTechOverTheYear}
                                    Layer={this.state.Layer} setLayer={this.setLayer}
                                    Tags={this.state.Tags} Flags={this.state.Flags} TechChoosen={this.getTechChoosen}
                                    Tech={this.state.TechChoosen} Loading={this.state.Loading} setLoading={this.setLoading} mapUnmount={this.mapUnmount}>
                                </Map>}
                            </Route>
                            <Route path='/igroup10/prod/client/graph' exact strict>
                                {<Graph Tags={this.state.Tags} CountriesList={Countries.features}
                                    Tech={this.state.TechChoosen} TechChoosen={this.getTechChoosen}
                                    Loading={this.state.Loading} setLoading={this.setLoading}
                                    ChartData={this.state.ChartData} setChartData={this.setChartData} graphUnmount={this.graphUnmount} GraphStates={this.state.GraphStates}>
                                </Graph>}
                            </Route>
                        </div>
                    </Router>
                </LoadingOverlay>
            </div>
        )
    }
}
