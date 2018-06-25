import React, { Component } from 'react'
import { Text, View, StyleSheet, Platform, TouchableOpacity, ActivityIndicator } from 'react-native'
import { connect } from "react-redux";
import { reciveEntry, addEntry} from '../actions'
import { timeToString, getDailyReminderValue } from '../utils/helpers'
import { fetchCalendarResults } from '../utils/api'
import UdaciFitnessCalendar from "udacifitness-calendar";
import DateHeader from "./DateHeader";
import MetricCard from "./MetricCard";
import { white, purple } from '../utils/colors';



class History extends Component {

  state = {
    ready: true
  }

  componentDidMount(){
    const { dispatch } = this.props
    fetchCalendarResults()
      .then(results => dispatch(reciveEntry(results)))
      .then(({entries}) => {
        if(entries[timeToString()]) {
          dispatch(addEntry({
            [timeToString()]: getDailyReminderValue()
          }))
        }
      })
      .then(() => {
        this.setState(() => ({
          ready: false
        }))
      })
  }

  renderItem = ({ today, ...metrics }, formattedDate, key) => {
    return ( 
    <View style={styles.item}>
      {today
        ? <View>
            <DateHeader date={formattedDate}/>
            <Text style={styles.noDataText}>
              {today}
            </Text>
          </View>
        : <TouchableOpacity onPress={() => this.props.navigation.navigate(
          'EntryDetail',
          { entryId: key }
          )}>
            <MetricCard
              date={formattedDate}
              metrics={metrics} />
           </TouchableOpacity>
        }
    </View>
  )}

  renderEmptyDate = (formattedDate) => {
    return(
      <View style={styles.item}>
        <DateHeader date={formattedDate}/>
        <Text style={styles.noDataText}>
          No Data for this date
        </Text>
      </View>
    )
  }

  render() {

    const { entries  } = this.props
    const { ready } = this.state
    
     if(ready === true) {
       return (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color={purple} />
        </View>
       )
     }
    return (
      <UdaciFitnessCalendar 
        items={entries}
        renderItem={this.renderItem}
        renderEmptyDate={this.renderEmptyDate}
      />
    )
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 8 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 14,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0,0,0,0.25)',
    shadowOffset: {
      width: 0,
      height: 3
    }
  },
  noDataText: {
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 20
  },
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
})

function mapStateToProps(entries){
  return {
    entries
  }
}

export default connect(mapStateToProps)(History)