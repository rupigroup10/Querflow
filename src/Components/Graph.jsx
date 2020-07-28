import React, { Component } from 'react'
import { Bar, Pie } from 'react-chartjs-2';
import ComparisonBar from './MapComponents/ComparisonBar'
import GraphComp from './GraphComponents/GraphComp'
import OptionsComp from './GraphComponents/OptionsComp'
import { zIndex } from 'material-ui/styles';
import { Carousel } from 'react-bootstrap';
import '../Styles/GraphStyle.css'
//import 'bootstrap/dist/css/bootstrap.min.css';


export default class Graph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Year: 'Total',
            Data: [],
            ChartArray: {
                leftChart: {
                    bigChart: ['bubble'],
                    smallChart: ['doughnut', 'pie', 'bar']
                },
                rightChart: ['line', 'line']


            },
            // ChartArray: {smallChart:['bubble', 'radar', 'bar', 'doughnut', 'pie', 'line']},

            Tech: [],
            Country: [{ properties: { name: 'Worldwide' } }],
            CountriesChoosen: []

        }
        this.handleClick = async (value) => {
            //   this.props.TechChoosen(value)//updating tag choosen props
            this.props.setLoading(true)
            await this.getTechResearch(value);

        }
        window.onresize = this.handleToggle
    }
    componentWillMount = () => {
        this.props.CountriesList.unshift({ properties: { name: 'Worldwide' } })

    }


    async getTechResearch(value) {//async

        this.setState({
            Tech: value
        })
        if (this.state.Country[0].properties.name === 'Worldwide') {
            await this.getTechnology(value)
        }
        else {
            //await this.getCountryTech(this.state.Country,this.state.Year)
            console.log(this.state.Country)
            console.log(value)
            await this.getCountryTech(this.state.Country, this.state.Year, value)

        }

    }



    async getTechnology(techs) { //bring technologies from databse
        // console.log(this.state.CountriesChoosen)

        const techChoosen = await Promise.all(techs.map(async tech => {
            const res = await fetch(`https://querflow.herokuapp.com/involved/${tech.TagName}/all`)
            const json = res.json()
            return json
        }))
        var orderedYear = await this.getOrderYear(techChoosen)

        this.props.setLoading(false)
        //console.log(techChoosen)//all data about tech (2400objects)
        this.setState({ CountriesChoosen: [orderedYear] })

        await this.getTechnologyTotal(orderedYear)

        //  this.getTechnologyYear(this.props.TechOverTheYear)
    }
    getOrderYear = async (tech) => {
        console.log(tech)
        var orderedYear = []
        tech.map(item => {
            var ordered = []
            // console.log(item.filter(item=>item.UsageYear===2008))
            for (var i = 2008; i <= 2020; i++) {
                var byYear = item.filter(item => item.UsageYear === i)
                var Technology, CountAnswer = 0, CountQuestion = 0, Counter = 0, TotalUsers = 0
                byYear.map(item => {
                    //  console.log(item)
                    Technology = item.Technology
                    CountAnswer = item.CountAnswer + CountAnswer
                    CountQuestion = item.CountQuestion + CountQuestion
                    Counter = item.Counter + Counter
                    TotalUsers = item.TotalUsers + TotalUsers

                })
                var obj = {
                    CountAnswer: CountAnswer,
                    CountQuestion: CountQuestion,
                    Counter: Counter,
                    UsageYear: i,
                    Technology: Technology,
                    TotalUsers: TotalUsers,
                    uniq_name: 'Worldwide',
                    Year: this.state.Year

                }
                ordered.push(obj)
            }
            orderedYear.push(ordered)
        })
        console.log(orderedYear)
        this.setState({
            RawData: orderedYear
        })
        return orderedYear

    }

    getTechnologyTotal = async (tech) => {
        console.log(tech)
        var DataArray = []
        var Answer = 0, Question = 0, Counter = 0, TotalUsers = 0
        var Name
        tech.map(tech => {
            Answer = 0
            Question = 0
            Counter = 0

            tech.map(item => {
                Name = 'Worldwide - ' + item.Technology
                Answer = Answer + item.CountAnswer
                Question = Question + item.CountQuestion
                Counter = Counter + item.Counter
                TotalUsers = TotalUsers + item.TotalUsers

            })
            var chartData = {
                Name: Name,
                TotalUsers: TotalUsers,
                Answer: Answer,
                Question: Question,
                Counter: Counter,
                Year: this.state.Year,
                RawData: tech


            }
            DataArray.push(chartData)

        })

        this.setState({ Data: DataArray })

    }


    getCountryTech = async (country, years, value) => {

        //    console.log(country,years,this.props.Tech)
        this.setState({
            Country: country,
            Year: years
        })
        //  console.log(value)
        var technology = value || this.state.Tech


        var CountryTech = await Promise.all(country.map(async country => {
            var countryName = country.properties.name.toLowerCase()
            //  console.log(countryName)
            if (countryName === 'worldwide') {
                //  console.log(this.state.Tech)

                const Country = await Promise.all(technology.map(async tech => {
                    const res = await fetch(`https://querflow.herokuapp.com/involved/${tech.TagName}/all`)
                    const json = res.json()
                    return json
                }))
                console.log(Country)
                var CountryOrder = this.getOrderYear(Country)
                return CountryOrder
            }
            else {
                const Country = await Promise.all(technology.map(async tech => {

                    const res = await fetch(`https://querflow.herokuapp.com/involved/country/${countryName}/${tech.TagName}`)
                    const json = res.json()
                    return json
                }))
                //  console.log(Country)

                return Country
            }
        }))

        // if (CountryTech.length === 0) {
        //     CountryTech = []
        // }
        this.setState({
            CountriesChoosen: CountryTech.length === 0 ? [] : CountryTech,

        })
        console.log(CountryTech)

        this.props.setLoading(false)
        console.log(CountryTech)
        if (CountryTech.length !== 0 && this.state.Tech.length !== 0) {
            if (years !== 'Total') {
                //  console.log(years)
                var min = years[0]
                var max = years[1]
                var newCountryTech = CountryTech.map(country => country.map(item => item.filter(i => i.UsageYear >= min && i.UsageYear <= max)))

                await this.prepData(newCountryTech, country)
            }
            else {
                console.log(CountryTech)
                await this.prepData(CountryTech, country)
            }
        }
        else {
            this.setState({ Data: [] })
        }
    }
    filterByYear = (years) => {
        this.setState({
            Year: years
        })
        var min = years[0]
        var max = years[1]
        console.log(this.state.CountriesChoosen)

        var newCountryTech = this.state.CountriesChoosen.map(country => country.map(item => item.filter(i => i.UsageYear >= min && i.UsageYear <= max)))
        //  console.log(newCountryTech)

        this.prepData(newCountryTech, years)
    }

    prepData = async (CountryTech, years) => {
        console.log(CountryTech[0])
        console.log(CountryTech[0][0])
        var Raw = []
        if (CountryTech[0][0].length > 13) {
            Raw = this.getOrderYear(CountryTech[0])
            console.log(Raw)
        }
        var dataArray = []

        CountryTech.map((item, index) => {
            console.log(item)
            item.map((feature, index1) => {
                var Answer = 0
                var Question = 0
                var Counter = 0
                var TotalUsers = 0
                var Name


                feature.map(item1 => {

                    Name = (this.state.Country[0].properties.name === 'Worldwide' ? 'Worldwide' : item1.uniq_name) + ' - ' + item1.Technology
                    Answer = Answer + item1.CountAnswer
                    Question = Question + item1.CountQuestion
                    Counter = Counter + item1.Counter
                    TotalUsers = TotalUsers + item1.TotalUsers

                })
                //  console.log(item[0])
                var chartData = {
                    Name: Name,
                    TotalUsers: TotalUsers,
                    Answer: Answer,
                    Question: Question,
                    Counter: Counter,
                    Year: years || this.state.Year,
                    RawData: this.state.CountriesChoosen[index][index1]
                }
                if (Raw.length !== 0) {
                    // console.log(Raw)
                    // Raw = Raw[0].map(item => {
                    //  return (item)

                    // })
                    chartData.RawData = Raw[index1]
                }
                //console.log(chartData.RawData)
                console.log(chartData.RawData)
                dataArray.push(chartData)
            })
        })


        //  console.log(chartData)
        this.setState({ Data: dataArray })


    }

    componentWillUnmount = () => {
        this.props.CountriesList.shift()
        this.props.setChartData(this.state.Data)
        this.props.graphUnmount(this.state.Tech, this.state.Data, this.state.Country, this.state.CountriesChoosen)
        console.log(this.state.CountriesChoosen)

    }
    componentDidMount = () => {
        this.setState({
            Data: this.props.GraphStates.ChartData,
            Tech: this.props.GraphStates.Tech,
            Country: this.props.GraphStates.Country,
            CountriesChoosen: this.props.GraphStates.CountriesChoosen,
        })
    }
    render() {
        const currentHeight = 211
        return (

            <div className='Graph' style={{}} >
                {console.log(window.screen.width)}
                <ComparisonBar getTechResearch={this.handleClick} Type={'Graph'} Tech={this.state.Tech} TechChoosen={this.props.TechChoosen} Tags={this.props.Tags}></ComparisonBar>
                <div style={{ display: 'flex', flexDirection: 'row', position: 'relative', top: -10 }}>
                    <div id={'filter'} style={{ width: '20vw', height: '80vh', paddingLeft: '10px', zIndex: this.state.Tech.length === 0 ? -5 : 1 }}>
                        <OptionsComp filterByYear={this.filterByYear} getCountryTech={this.getCountryTech} CountriesList={this.props.CountriesList} Country={this.state.Country}></OptionsComp>
                    </div>
                    <Carousel bsPrefix={'carousel1'} interval={null} wrap={false}>
                        <Carousel.Item >
                            <div id='chart' style={{ height: "80vh", width: "79vw", display: "flex", flexWrap: 'wrap' }}>
                                <div id='leftChart' style={{ boxShadow: '0 0px 5px', margin: '2px', padding: 0 }}>
                                    <div> <GraphComp height={'50vh'} width={this.state.width} type={this.state.ChartArray.leftChart.bigChart[0]} data={this.state.Data} kind={'bigChart'}></GraphComp></div>
                                    <div style={{ height: '29vh', display: "flex", flexDirection: 'row', justifyItems: 'center', justifyContent: 'space-between' }}>
                                        {this.state.ChartArray.leftChart.smallChart.map(item => {
                                            return <div style={{ width: '32%', boxShadow: '0 0px 5px', margin: '2px', padding: 0 }}> <GraphComp height={'29vh'} width={this.state.width} type={item} data={this.state.Data} kind={'smallChart'}></GraphComp></div>

                                        })}
                                    </div>
                                </div>

                                <div id='rightChart' style={{ display: "flex", padding: 0 }}>
                                    {this.state.ChartArray.rightChart.map((item, index) => {
                                        return <div style={{ width: '100%', boxShadow: '0 0px 5px', margin: '2px' }}> <GraphComp height={'40vh'} width={'100%'} type={item} RawData={this.state.RawData} data={this.state.Data} number={index} kind={'bigChart'}></GraphComp></div>

                                    })}
                                </div>
                            </div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div style={{ display: 'flex', boxShadow: '0 0px 5px', margin: '2px' }}> <GraphComp height={'75vh'} width={'100%'} type={'line'} RawData={this.state.RawData} data={this.state.Data} kind={'Growth'}></GraphComp></div>
                        </Carousel.Item>
                    </Carousel>




                </div>


            </div>
        )
    }
}
