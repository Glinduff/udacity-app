import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native'
import Ionicons from "react-native-vector-icons/Ionicons";
import { getMetricMetaInfo, timeToString, getDailyReminderValue } from "../utils/helpers";
import CustomSlider from "./CustomSlider";
import CustomSteppers from "./CustomSteppers";
import DateHeader from "./DateHeader";
import TextButton from "./TextButton";
import { submitEntry, removeEntry } from '../utils/api'
import { connect } from 'react-redux'
import { addEntry } from "../actions";
import { white, purple } from "../utils/colors";


function SubmitBtn ( {onPress} ) {
  return(
    <TouchableOpacity 
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
      onPress={onPress}>
      <Text style={styles.submitBtnText}>SUBMIT</Text>
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
      const count = state[metric] - getMetricMetaInfo(metric).step

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
        <View style={styles.center}>
          <Ionicons
           name={Platform.OS === 'ios' ? 'ios-happy-outline' : 'md-happy'}
           color={purple}
           size={100}
           />
          <Text>You already log your information today!</Text>
          <TextButton style={{padding: 10}} onPress={this.reset}>Reset</TextButton> 
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <DateHeader date={ (new Date()).toDateString() } />
        { Object.keys(metaInfo).map( key => {
          const { getIcon, type, ...rest } = metaInfo[key]
          const value = this.state[key]

          return (
            <View key={key} style={styles.row}>
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
                    onDecrement={() => this.decrement(key)}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40
  },
  androidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 2,
    height: 45,
    marginLeft: 30,
    marginRight: 30,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30
  }
})

function mapStateToptops (state) {
  const key = timeToString()

  return {
    alreadyLog: state[key] && typeof state[key].today === 'undefined'
  }
}

export default connect(mapStateToptops)(AddEntry)