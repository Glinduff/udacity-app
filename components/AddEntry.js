import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Slider } from 'react-native'
import { getMetricMetaInfo, timeToString } from "../utils/helpers";
import CustomSlider from "./CustomSlider";
import CustomSteppers from "./CustomSteppers";
import DateHeader from "./DateHeader";


function SubmitBtn ( {onPress} ) {
  return(
    <TouchableOpacity onPress={onPress}>
      <Text>SUBMIT</Text>
    </TouchableOpacity>
  )
}

export default class AddEntry extends Component {

  state = {
    run: 0,
    bike: 10,
    swim: 0,
    sleep: 0,
    eat: 0
  }

  incremenet = (metric) => {
    const {max, step} = getMetricMetaInfo(metric)

    this.setState(state => {
      const count = state[metric] + step

      return {
        ...state,
        [metric]: count > max ? max : count
      }
    })
  }

  decrement = (metric) => {
    this.setState(state => {
      const count = state[metric] - getMetricMetaInfo(metric.step)

      return {
        ...state,
        [metric]: count < 0 ? 0 : count
      }
    })
  }

  slide = (metric, value) => {
    this.setState(() => ({
      [metric]: value
    }))
  }

  submit = () => {
    const key = timeToString()
    const entry = this.state

    this.setState(() => ({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0
    }))
  }

  render() {
    const metaInfo = getMetricMetaInfo()

    return (
      <View>
        <DateHeader date={ (new Date()).toDateString() } />
        <Text>{JSON.stringify(this.state)}</Text>
        { Object.keys(metaInfo).map( key => {
          const { getIcon, type, ...rest } = metaInfo[key]
          const value = this.state[key]

          return (
            <View key={key}>
              {getIcon()}
              {type === 'slider'
                ? <CustomSlider
                    value={value}
                    onChange={value => this.slide(key, value)}
                    {...rest}
                  />
                : <CustomSteppers
                    value={value}
                    onIncrement={() => this.incremenet(key)}
                    onDecrement={() => this.incremenet(key)}
                    {...rest}
                  />
              }
            </View>
          )
        })}
        <Slider />
        <SubmitBtn onPress={this.submit} />
      </View>
    )
  }
}