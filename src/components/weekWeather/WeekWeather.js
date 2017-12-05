import React from "react";
import WeatherItem from "./../../components/weatherItem/WeatherItem";
// import WeatherService from "./../../services/WeatherService";

import _ from "lodash";

export default class WeekWeather extends React.Component {
  render() {
    // const color = this.props.color;

    return <div className="week-container">
      <div className="week-current-day">
        <WeatherItem data={this.props.weekWeather[0]} />
      </div>
      <div className="week-all-days">
        {_.map(this.props.weekWeather, (weather, i) => {
        //   var style = {
        //     backgroundColor: WeatherService.shadeColor(color, -(i + 1) / 20)
        //   }
          return <div key={i} className="week-one-day">
            <WeatherItem theme={"small"} data={weather} />
          </div>
        })}
      </div>
    </div>
  }
}