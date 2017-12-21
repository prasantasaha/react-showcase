import React from "react"
import { fetchWeatherByCity, fetchWeatherByCoords } from "./../../services/WeatherService"
import { geolocated, geoPropTypes } from 'react-geolocated';
import randomColor from "randomcolor";
import WeekWeather from "./../../components/weekWeather/WeekWeather"

import "./WeatherDemo.css";


class WeatherDemo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fetchingCoordinates: true,
            city: "",
            searchedCity: null,
            weekWeather: []
        };
    }



    updateWeatherData(weatherData) {
        var weather = weatherData.list.map(dayWeather => {
            return {
                dayWeather,
                country: weatherData.city.country,
                city: weatherData.city.name
            }
        });

        this.setState({
            weekWeather: weather,
            city: this.state.searchedCity,
            color: randomColor({ luminosity: "dark", format: "hex" })
        });
    }


    componentDidUpdate() {
        if (this.state.fetchingCoordinates && this.props.coords) {
           
            fetchWeatherByCoords(this.props.coords)
                .then((response) => {
                    this.updateWeatherData(response);
                    this.setState({
                        fetchingCoordinates: false
                    });
                })
        }
    }

    render() {
        return <div className="weather-container"
            style={{ backgroundColor: this.state.color }}>
            {!this.state.weekWeather || !this.state.weekWeather.length ? "no data" :
                <WeekWeather color={this.state.color}
                    weekWeather={this.state.weekWeather} />}
            {/* {this._renderForm()} */}
        </div>;
    }

    _renderForm() {
        return (
            <form onSubmit={(e) => this.handleSubmit(e)}>
                <fieldset>
                    <legend>Enter your city</legend>
                    <input className="form-input"
                        ref="locationName"
                        type="text"
                        defaultValue={this.state.searchedCity} />
                </fieldset>
            </form>
        );
    }

    handleSubmit(e) {
        e.preventDefault();

        const searchedCity = this.refs.locationName.getDOMNode().value;

        if (searchedCity === this.state.city) {
            return;
        }

        fetchWeatherByCity(searchedCity, this.props.coords)
            .then((response) => {
                this.updateWeatherData(response);
            })
    }
};
// WeatherDemo.prototype = { ...WeatherDemo.prototypes, ...geoPropTypes }
export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(WeatherDemo);