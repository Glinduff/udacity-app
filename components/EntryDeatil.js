import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import { white, purple } from "../utils/colors";
import MetricCard from "./MetricCard";

class EntryDeatil extends Component {

  static navigationOptions = ({navigation}) => {
    const { entryId } = navigation.state.params
    const year = entryId.slice(0,4)
    const month = entryId.slice(5,7)
    const day = entryId.slice(8)

    return {
      title: `${month}/${day}/${year}`
    }
  }

  render() {
    const { metrics } = this.props
    return (
      <View style={styles.container}>
        <MetricCard metrics={metrics} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15
  }
})

function mapStateToProps(state, ownProps){

  const { entryId } = ownProps.navigation.state.params

  return {
    entryId,
    metrics: state[entryId]
  }
}
export default connect(mapStateToProps)(EntryDeatil)