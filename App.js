import React from 'react'
import { View, StatusBar, Platform } from 'react-native'
import { Provider } from "react-redux"
import { createStore } from "redux"
import reducer from "./reducers"
import AddEntry from "./components/AddEntry"
import History from "./components/History";
import EntryDetail from "./components/EntryDeatil";
import { purple, white } from './utils/colors';
import { createBottomTabNavigator, StackNavigator } from "react-navigation";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";


function MyStatusBar ({backgroundColor, ...props}){ 
  return (
    <View style={{backgroundColor, height: STATUSBAR_HEIGHT}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
};

const Tabs = createBottomTabNavigator({
  Histoty: {
    screen: History,
    navigationOptions: {
      tabBarLabel: 'History',
      tabBarIcon: ({ tintColor }) => <Ionicons name="ios-bookmarks" size={30} color={tintColor}/>
    }
  },
  AddEntry: {
    screen: AddEntry,
    navigationOptions: {
      tabBarLabel: 'Add Entry',
      tabBarIcon: ({ tintColor }) => <FontAwesome name="plus-square" size={30} color={tintColor}/>
    }
  }
}, {
  tabBarOptions: {
    activeTintColor: purple,
    style: {
      height: 56,
      backgroundColor: white,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})


const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null,
   }
  },
  EntryDetail: {
    screen: EntryDetail,
    navigationOptions: {
       headerTintColor: white,
       headerStyle: {
        backgroundColor: purple
       }
    }
  }
});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <MyStatusBar backgroundColor={purple} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;