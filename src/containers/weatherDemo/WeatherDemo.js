import React from "react"
import { fetchWeather } from "./../../services/WeatherService"
import _ from "lodash"
import { geolocated, geoPropTypes } from 'react-geolocated';
import randomColor from "randomcolor";
import WeekWeather from "./../../components/weekWeather/WeekWeather"

import "./WeatherDemo.css";


class WeatherDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            city: "Fremont",
            searchedCity: null,
            coord: {
                lon: 0,
                lat: 0
            },
            weekWeather: []
        };
    }

    getWeather(searchedCity = this.state.city, coord = this.state.coord) {
        fetchWeather(searchedCity, coord)
            .then((response) => {
                var weather = _.map(response.list, (dayWeather) => {
                    return {
                        dayWeather,
                        country: response.city.country,
                        city: response.city.name
                    }
                });

                this.setState({
                    weekWeather: weather,
                    city: this.state.searchedCity,
                    color: randomColor({ luminosity: "dark", format: "hex" })
                });
            })
    }

    componentWillUpdate() {
        console.log(this.props);
        this.getWeather();
    }

    render() {
        if (this.props.coords && (!this.state.coord.lon || !this.state.coord.lat)) {
            this.setState({
                coord: {
                    "lon": this.props.coords ? this.props.coords.longitude : 0,
                    "lat": this.props.coords ? this.props.coords.latitude : 0
                }
            });
        }
        console.log(this.props);
        return <div className="weather-container"
            style={{ backgroundColor: this.state.color }}>
            {_.isEmpty(this.state.weekWeather) ? "no data" :
                <WeekWeather color={this.state.color}
                    weekWeather={this.state.weekWeather} />}
            {this._renderForm()}
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

        this.getWeather(searchedCity);
    }
};
// WeatherDemo.prototype = { ...WeatherDemo.prototypes, ...geoPropTypes }
export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(WeatherDemo);