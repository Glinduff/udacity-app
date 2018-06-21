import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Ionicons from "react-native-vector-icons/Ionicons";
import { getMetricMetaInfo, timeToString, getDailyReminderValue } from "../utils/helpers";
import CustomSlider from "./CustomSlider";
import CustomSteppers from "./CustomSteppers";
import DateHeader from "./DateHeader";
import TextButton from "./TextButton";
import { submitEntry, removeEntry } from '../utils/api'
import { connect } from 'react-redux'
import { addEntry } from "../actions";


function SubmitBtn ( {onPress} ) {
  return(
    <TouchableOpacity onPress={onPress}>
      <Text>SUBMIT</Text>
    </TouchableOpacity>
  )
}

class AddEntry extends Component {

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

    this.props.dispatch((addEntry({
      [key]: entry
    })))

    this.setState(() => ({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0
    }))

    submitEntry({key , entry})
  }

  reset = () => {
    const key = timeToString()

    this.props.dispatch((addEntry({
      [key]: getDailyReminderValue()
    })))

    removeEntry(key)
  }

  render() {
    const metaInfo = getMetricMetaInfo()
    if(this.props.alreadyLog){
      return(
        <View>
          <Ionicons
           name='ios-happy-outline'
           size={100}
           />
          <Text>You already log your information todat</Text>
          <TextButton onPress={this.state}>Reset</TextButton> 
        </View>
      )
    }
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
        <SubmitBtn onPress={this.submit} />
      </View>
    )
  }
}

function mapStateToptops (state) {
  const key = timeToString()

  return {
    alreadyLog: state[key] && typeof state[key].today === 'undefined'
  }
}

export default connect(mapStateToptops)(AddEntry)