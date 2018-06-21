import React from 'react'
import { View } from 'react-native'
import { Provider } from "react-redux"
import { createStore } from "redux"
import reducer from "./reducers"
import AddEntry from "./components/AddEntry"

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View>
          <AddEntry />
        </View>
      </Provider>
    );
  }
}
