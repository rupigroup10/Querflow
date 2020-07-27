import React, { Component } from 'react'
import ReactDOMServer from 'react-dom/server';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';
import Countries from '../Boundries/countries.json'
import YearSlider from './MapComponents/YearSlider'
import NormalizeButton from './MapComponents/NormalizeButton'
import ComparisonBar from './MapComponents/ComparisonBar'
import Feature from './MapComponents/Feature'
import TableComp from './MapComponents/TableComp'
import TechComp from './MapComponents/TechComp'
import { Button } from '@material-ui/core'
import CountryChart from './MapComponents/CountryChart'
import LoadingOverlay from 'react-loading-overlay';
import TableMap from './MapComponents/TableMap'
import '../Styles/MapStyle.css'
import $ from 'jquery'
const Wrapper = styled.div`


width: ${props => props.width}
height: ${props => props.height}
border:${props => props.border}
`;





export default class Map extends Component {

    constructor(props) {

        super(props);
        this.section = React.createRef();
        this.state = {

            Tags: props.Tags,
            Flags: props.Flags,
            Year: 2015,    //the year from the slider
            TechResearch: [], //the tech i want to research
            GeoJsonFile: JSON.parse(JSON.stringify(Countries)),
            Layer: Countries,
            Normalize: 'minmax',//nomalize technique
            TechChoosen: [],
            Recommendation: undefined,
            ChoosenCountry: [],
            isAdded: false



        }
        this.handleClick = async (value) => {
            this.props.TechChoosen(value)//updating tag choosen props

            this.props.setLoading(true)
            await this.getTechResearch(value);

        }
    }



    LoadMap = () => {          //load the map

        var corner1 = L.latLng(-250, 250)
        var corner2 = L.latLng(250, -250)



        this.map = L.map('map', {
            maxBounds: L.latLngBounds(corner1, corner2),
            center: [45, 15],
            zoom: 0,
            zoomControl: false,




        });
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 7,
            minZoom: 2,


        }).addTo(this.map);
        this.initLayer = L.geoJSON().addTo(this.map)

    }
    addFlag = () => {
        Countries.features.map(item => {
            this.state.Flags.map(flag => {
                if (item.id === flag.alpha3)
                    item.pic = flag.file_url
            })
        })
        this.state.GeoJsonFile.features.map(item => {
            this.state.Flags.map(flag => {
                if (item.id === flag.alpha3)
                    item.pic = flag.file_url
            })
        })


    }
    componentWillMount = () => {
        this.addFlag()
    }

    componentDidMount = () => {



        this.LoadMap();
        this.LayerGroup = L.layerGroup().addTo(this.map)

        //this.getInvolvedYear()
        if (this.props.Tech.length === 0) {
            this.initsetStyle()
        }
        else {//initialize with tags
            //   this.setState({ isAdded: true })
            this.initsetStyle()
            if (this.props.TechOverTheYear[0].length === 0)
                this.handleClick(this.props.Tech)
            else
                this.getTechnologyYear(this.props.TechOverTheYear)


        }

    }

    initsetStyle = () => {
        this.initLayer = L.geoJSON(Countries, {                       //making style for counteries

            style: function (feature) {

                return {
                    color: 'black',//stroke(border) color
                    fillColor: 'green',// the color of the filler
                    fillOpacity: 0,

                    stroke: false, //like border



                }



            },
            onEachFeature: function (feature, layer) {



                layer.bindTooltip(function () {
                    return feature.properties.name



                }) // when hover tooltip
                // layer.(feature.properties.name)

                layer.on("mouseover", function () {
                    this.setStyle({
                        stroke: true,
                        weight: 1,
                        color: 'grey'
                    })
                })
                layer.on('mouseout', function () {
                    this.setStyle({ stroke: 0 })
                })


            },



        }).addTo(this.map)



    }



    setStyle = (norm) => {
        console.log(this.props.Layer.features)
        this.layer = L.geoJSON(this.props.Layer, {                       //making style for counteries

            style: function (feature) {//styling for one technology
                // console.log(Object.keys(feature.properties).length)
                // console.log(feature.properties)
                switch (Object.keys(feature.properties).length) {
                    case 9:
                        if (norm === 'minmax')
                            return {
                                color: 'black',//stroke(border) color
                                fillColor: 'green',// the color of the filler
                                fillOpacity: 0,
                                //  className: 'pathcss',
                                stroke: false, //like border



                            }
                        else return {
                            color: 'black',//stroke(border) color
                            fillColor: 'green',// the color of the filler0
                            fillOpacity: 0,

                            stroke: false, //like border

                        }
                        break
                    case 2:
                        if (norm === 'minmax') {
                            var color = feature.properties[0].counter > feature.properties[1].counter ? 'green' : 'red'
                            var opacity = feature.properties[0].counter > feature.properties[1].counter ? feature.properties[0].color1 : feature.properties[1].color1
                            return {
                                color: 'black',//stroke(border) color
                                fillColor: color || 0,// the color of the filler
                                fillOpacity: 0,

                                stroke: false, //like border



                            }
                        }
                        else return {

                            color: 'black',//stroke(border) color
                            fillColor: feature.properties[0].counter > feature.properties[1].counter ? 'green' : 'red',// the color of the filler0
                            fillOpacity: 0,

                            stroke: false, //like border

                        }
                        break


                }
            },
            onEachFeature: function (feature, layer) { //featuring for one technology
//console.log(feature)
                layer.bindPopup(() => {

                    switch (Object.keys(feature.properties).length) {
                        case 9:
                            if (norm === 'minmax')


                                return `<div><strong>${feature.properties.counter.toString()} Users</strong> <div style={{display:flex}}>${feature.properties.question.toString()} Questions</div><div>${feature.properties.answer.toString()} Answers</div></div>`
                            else return `<strong>${feature.properties.counter.toString()} Users</strong> <div>${feature.properties.totalusers.toString()} Total Users</div><div>${Math.round((feature.properties.counter)/(feature.properties.totalusers)*100)||0}% Ratio</div>`
                            break

                        case 2:
                            if (norm === 'minmax')
                                return `<div><table>
                                <tr>
                    <th><img style="width:30px; border:1px solid black" src=${feature.pic}></img></th>
                    <th align="center">${feature.properties[0].technology.toString()}</th>
                    <th align="center">${feature.properties[1].technology.toString()}</th>
                  </tr>
                  <tr>
                    <td>Users</td>
                    <td align="center">${feature.properties[0].counter.toString()}</td>
                    <td align="center">${feature.properties[1].counter.toString()}</td>
                  </tr>
                  <tr>
                    <td>Questions</td>
                    <td align="center">${feature.properties[0].question.toString()}</td>
                    <td align="center">${feature.properties[1].question.toString()}</td>
                  </tr>
                  <tr>
                    <td>Answers</td>
                    <td align="center">${feature.properties[0].answer.toString()}</td>
                    <td align="center">${feature.properties[1].answer.toString()}</td>
                  </tr>
                                </table>${ReactDOMServer.renderToString(<Feature feature={feature}></Feature>)}</div>`

                            // return `<strong>${feature.properties[0].counter.toString()} Users</strong> <div style={{display:flex}}>${feature.properties[0].question.toString()} Questions</div><div>${feature.properties[0].answer.toString()} Answers</div> `
                            //`<strong>${feature.properties[0].counter.toString()} Users</strong> <div>${feature.properties[0].totalusers.toString()} Total Users</div><div>${parseInt((feature.properties[0].color2 * 100)).toString()}% Ratio</div>`
                            else return `<div><table>
                            <tr>
                <th><img style="width:30px; border:1px solid black" src=${feature.pic}></img></th>
                <th>${feature.properties[0].technology.toString()}</th>
                <th>${feature.properties[1].technology.toString()}</th>
              </tr>
              <tr>
                <td>Users</td>
                <td align="center">${feature.properties[0].counter.toString()}</td>
                <td align="center">${feature.properties[1].counter.toString()}</td>
              </tr>
              <tr>
                <td>Total users</td>
                <td colspan="2" align="center">${feature.properties[0].totalusers}</td>

              </tr>
              <tr>
                <td>Ratio by total</td>
                <td align="center">${parseInt((feature.properties[0].counter / feature.properties[0].totalusers * 100) || 0).toString()}%</td>
                <td align="center">${parseInt((feature.properties[1].counter / feature.properties[0].totalusers * 100) || 0).toString()}%</td>
              </tr>
                            </table>${ReactDOMServer.renderToString(<Feature feature={feature}></Feature>)}</div>`
                            break

                    }
                })// when click do popup
                layer.bindTooltip(function () {
                    switch (Object.keys(feature.properties).length) {
                        case 9:
                            return feature.properties.name
                            break
                        case 2:
                            return feature.properties[0].name
                            break
                    }


                }) // when hover tooltip
                // layer.(feature.properties.name)

                layer.on("mouseover", function () {
                    this.setStyle({
                        stroke: true,
                        weight: 1,
                        color: 'grey'
                    })
                })
                layer.on('mouseout', function () {
                    this.setStyle({ stroke: 0 })
                })

            },



        }).addTo(this.map)



    }


    getYear = (year) => {
        if (this.state.Year !== year)
            this.props.setMapYear(year)
        this.setState({
        
            ChoosenCountry: []
        })
        if (this.props.TechOverTheYear[0].length !== 0) {
            this.getTechnologyYear(this.props.TechOverTheYear)
        }

    }

    playYear = (year) => {
        this.setState({
            Year: year,
        })
        this.getTechnologyYear(this.state.TechChoosen)
    }



    GetNew = () => {
        if (this.state.isAdded === true) {
            this.map.removeLayer(this.layer)
        }
        this.setStyle(this.state.Normalize);
        this.Handle()
    }
    getNormalize = (value) => {
        this.setState({ Normalize: value })
        this.map.removeLayer(this.layer)
        this.setStyle(value);
        this.Handle(value);

    }

    async getTechResearch(value) {//async

        if (value.length < this.state.TechResearch.length) {
            console.log('removing tech')
        }
        else {
            await this.postTechnology(value)
        }
        await this.getTechnology(value)

        this.setState({
            TechResearch: value,
            isAdded: true
        })//await
        if (value.length === 2) {
            this.setState({
                Recommendation: undefined
            })
        }

        if (value.length === 0 && this.props.Tech.length === 0) {
            console.log('destroy')
            this.initLayer.setStyle({ fillOpacity: 0 })
            this.map.removeLayer(this.layer)
            console.log(this.state.GeoJsonFile)
            this.setState({
                Layer: this.state.GeoJsonFile,
                Recommendation: undefined,
                ChoosenCountry: []
            })

            this.initsetStyle()

        }

    }

    async postTechnology(techs) {

        fetch('https://querflow.herokuapp.com/technology/techchoosen', {
            method: 'POST',
            body: JSON.stringify(techs),
            headers: new Headers({
                'Content-type': 'application/json; charset=UTF-8',

            })
        })
            .then(res => {
                console.log('res=', res);
                return res.json()
            })
            .then(
                (result) => {
                    console.log(result)
                    // console.log("fetch POST= ", result);
                    // result=this.state.Tags.filter(item=>item.TagName===result[0])
                    this.setState({ Recommendation: result })

                },
                (error) => {
                    console.log("err post=", error);
                });

    }

    async getTechnology(techs) { //bring technologies from databse
        const techChoosen = await Promise.all(techs.map(async tech => {
            const res = await fetch(`https://querflow.herokuapp.com/involved/${tech.TagName}`)
            const json = res.json()
            return json
        }))
        this.props.setTechOverTheYear(techChoosen)
        this.props.setLoading(false)

        this.setState({
            TechChoosen: techChoosen,
        })
        this.getTechnologyYear(this.props.TechOverTheYear)


    }
    getMinMax = (country) => {  //getting the the min max value for normalization


        var array = []
        var array2 = []

        country.features.map(item => {
            array.push(item.properties.counter)
            array2.push(isNaN((item.properties.counter / (item.properties.totalusers))) === true ? 0 : item.properties.counter / (item.properties.totalusers))
            item.properties.color2 = (isNaN((item.properties.counter / (item.properties.totalusers))) === true ? 0 : item.properties.counter / (item.properties.totalusers))


        })


        return {
            maxValue: Math.max.apply(Math, array),
            minValue: Math.min.apply(Math, array),
            maxValue2: Math.max.apply(Math, array2),
            minValue2: Math.min.apply(Math, array2),


        }

    }


    getTechnologyYear = (choosen) => {
        var techChoosenYear = choosen.map(item => {
            const results = item.filter(k => k.features[0].properties.year === this.props.mapYear)

            return results[0]
        })
        var Merged = this.MergeFeatures(techChoosenYear)
        this.props.setLayer(Merged)
        this.setState({ Layer: Merged })

        this.GetNew()


    }
    MergeFeatures = (collections) => {

        var numOfTechs = collections.length
        this.c = JSON.parse(JSON.stringify(Countries))
        switch (numOfTechs) {
            case 1:
                for (var i = 0; i < this.c.features.length; i++) {
                    this.c.features[i].properties = collections[0].features[i].properties
                }
                break

            case 2:
                for (var i = 0; i < this.c.features.length; i++) {
                    this.c.features[i].properties = [collections[0].features[i].properties, collections[1].features[i].properties]
                }
                break
        }

        this.props.setLoading(false)


        return this.c



    }


    addMarkers = (e) => {//not that good have to fix it
        this.getCountryInfo(e)//getting the info for specific country chart
        var icon = new L.icon({
            iconSize: [20, 27],
            iconAnchor: [13, 27],
            popupAnchor: [1, -24],
            iconUrl: 'https://clipartart.com/images/google-maps-marker-transparent-clipart.png'
        })
        e = e.key
        switch (Object.keys(e.properties).length) {
            case 1:
            case 9:
                if (e.geometry.type === 'Polygon') {
                    this.marker = L.marker([e.geometry.coordinates[0][0][1], e.geometry.coordinates[0][0][0]], { icon: icon }).addTo(this.LayerGroup);
                    this.marker.bindPopup(e.properties.name).openPopup()
                }
                else {
                    this.marker = L.marker([e.geometry.coordinates[0][0][0][1], e.geometry.coordinates[0][0][0][0]], { icon: icon }).addTo(this.LayerGroup);
                    this.marker.bindPopup(e.properties.name).openPopup()

                }
                break
            case 2:
                if (e.geometry.type === 'Polygon') {
                    this.marker = L.marker([e.geometry.coordinates[0][0][1], e.geometry.coordinates[0][0][0]], { icon: icon }).addTo(this.LayerGroup);
                    this.marker.bindPopup(e.properties[0].name).openPopup()
                }
                else {
                    this.marker = L.marker([e.geometry.coordinates[0][0][0][1], e.geometry.coordinates[0][0][0][0]], { icon: icon }).addTo(this.LayerGroup);
                    this.marker.bindPopup(e.properties[0].name).openPopup()

                }
                break

        }


    }

    clearMarkers = () => {
        this.LayerGroup.clearLayers()
    }
    handleScroll = () => {
        this.section.current.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        })
    }
    async  getCountryInfo(country) {
        var countryName = country.country.toLowerCase()
        var technology = this.props.Tech
        console.log(technology)
        const Country = await Promise.all(technology.map(async tech => {
            const res = await fetch(`https://querflow.herokuapp.com/involved/country/${countryName}/${tech.TagName}`)
            const json = res.json()
            return json
        }))
        console.log(Country)
        this.setState({
            ChoosenCountry: Country
        })


    }
    Handle = (nor) => {
        var norm = nor || this.state.Normalize
        this.initLayer.eachLayer((layer) => {
            if (this.props.Layer.features[0].properties.length === 2) {

                var Feature = this.props.Layer.features.filter(item => item.properties[0].name === layer.feature.properties.name)

            }

            else {
                var Feature = this.props.Layer.features.filter(item => item.properties.name === layer.feature.properties.name)
            }

            switch (Object.keys(Feature[0].properties).length) {
                case 9:
                    if (norm === 'minmax')
                        layer.setStyle({ fillOpacity: Feature[0].properties.color1 || 0, color: 'black', storke: false, fillColor: 'green' })
                    else {
                        layer.setStyle({ fillOpacity: Feature[0].properties.color2 || 0, color: 'black', storke: false, fillColor: 'green' })
                    }
                    break
                case 2:
                    if (norm === 'minmax') {
                        var color = Feature[0].properties[0].counter > Feature[0].properties[1].counter ? 'green' : 'red'
                        var opacity = Feature[0].properties[0].counter > Feature[0].properties[1].counter ? Feature[0].properties[0].color1 : Feature[0].properties[1].color1
                        layer.setStyle({ fillOpacity: opacity || 0, color: 'black', storke: false, fillColor: color })

                    }
                    else {
                        layer.setStyle({ fillOpacity: Feature[0].properties[0].color2 || 0, color: 'black', storke: false, fillColor: Feature[0].properties[0].counter > Feature[0].properties[1].counter ? 'green' : 'red' })

                    }
                    break
            }
        })

    }
    componentWillUnmount=()=>{
        
    }


    render() {

        return (
            <div>
                {/* <button onClick={this.Handle}>asdasdsads</button> */}

                <ComparisonBar Type={'Map'} Tech={this.props.Tech} Recommendation={this.state.Recommendation} Tags={this.state.Tags} getTechResearch={this.handleClick} ></ComparisonBar>
                <div style={{ zIndex:1, position: 'relative', display: "flex", justifyContent: "center", alignItems: "center", paddingTop: '10px' }}>
                    <Wrapper id='map' style={{ height: '70vh', zIndex: 2, width: '98vw', boxShadow: '0 0px 5px' }}></Wrapper>
                    <NormalizeButton getNormalize={this.getNormalize} style={{}}></NormalizeButton>
                    <YearSlider techs={this.state.TechResearch} Year={this.props.mapYear} playYear={this.playYear} GetNew={this.GetNew} getYear={this.getYear}></YearSlider>
                    <Button style={{ position: 'absolute', zIndex: 2, left: 15, bottom: 10, boxShadow: '0 0px 5px' }} onClick={this.clearMarkers}>Clear Markers</Button>
                    <TechComp techs={this.props.Tech}></TechComp>
                    <div onClick={this.handleScroll} style={{ position: 'absolute', bottom: '-20px', left: '50%', zIndex: 3, transform: 'translate(-50%, -50%)', margin: '0', marginRight: '-50%', backgroundColor: 'white', width: '100px', boxShadow: '0 0px 5px', textAlign: 'center', borderRadius: '20px', cursor: 'grab' }} >More stats</div>
                </div>
               
                <div className='bottomDiv' ref={this.section} style={{ width: '98vw', boxShadow: '0 0px 5px', margin: 'auto', display: 'flex', flexDirection: 'row', paddingTop: 0 }}>
                    <div className='TableComp' style={{ display: 'flex' }}>
                        <TableComp className='tbl' data={this.props.Layer} tech={this.state.TechResearch} addMarker={this.addMarkers}  ></TableComp>
                    </div>
                    <div className='ChountryChart' style={{ display: 'flex'}}>
                        <CountryChart data={this.state.ChoosenCountry}></CountryChart>
                    </div>
                </div>
               
            </div >
        )
    }

}
