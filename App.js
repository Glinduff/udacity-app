import React from 'react'
import { View, StatusBar, Platform, StyleSheet } from 'react-native'
import { Provider } from "react-redux"
import { createStore } from "redux"
import reducer from "./reducers"
import AddEntry from "./components/AddEntry"
import History from "./components/History";
import { purple } from './utils/colors';


function MyStatusBar ({backgroundColor, ...props}){ 
  return (
    <View style={{backgroundColor, height: STATUSBAR_HEIGHT}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
};

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <MyStatusBar backgroundColor={purple} barStyle="light-content" />
          <History />
        </View>
      </Provider>
    );
  }
}

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;