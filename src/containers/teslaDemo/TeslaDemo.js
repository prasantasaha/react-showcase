import React, { Component } from 'react';
import Header from '../../components/header/Header';
import TeslaBattery from './TeslaBattery';
import './TeslaDemo.css';

const counterDefaultVal = {
    speed: {
      title: "Speed",
      unit: "mph",
      step: 5,
      min: 45,
      max: 70
    },
    temperature: {
      title: "Outside Temperature",
      unit: "°",
      step: 10,
      min: -10,
      max: 40
    }
  };
  class TeslaDemo extends Component {
    render() {
      return (
        <div className="App">
          <Header />
          <TeslaBattery counterDefaultVal={counterDefaultVal} />
        </div>
      );
    }
  }

  export default TeslaDemo;