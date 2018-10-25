import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView } from 'react-native';

import firebase from 'react-native-firebase';

import {
  createDrawerNavigator,
  createStackNavigator,
} from 'react-navigation';
import { withRkTheme } from 'react-native-ui-kitten';
import { AppRoutes } from './config/navigation/routesBuilder';
import * as Screens from './screens';
import { bootstrap } from './config/bootstrap';
import { data } from './data';

var config = {
  apiKey: "AIzaSyDxA0r0Oeax7Qp716NB6IDG-XkzG8CPHck",
  authDomain: "rakutenhack.firebaseapp.com",
  databaseURL: "https://rakutenhack.firebaseio.com",
  storageBucket: "rakutenhack.appspot.com",
};
firebase.initializeApp(config);

bootstrap();
data.populateData();

const SuperNannies = createStackNavigator({
  First: {
    screen: Screens.SplashScreen,
  },
  Login: {
    screen: Screens.Login_0,
  },
  Activities: {

    screen: Screens.Activities,
    navigationOptions: ({navigation}) => ({
      contentComponent: (props) => {
        const SideMenu = withRkTheme(Screens.SideMenu);
        return <SideMenu {...props} />;
      },
    }),
  },
  Home: {
    screen: createDrawerNavigator(
      {
        ...AppRoutes,
      },
      {
        contentComponent: (props) => {
          const SideMenu = withRkTheme(Screens.SideMenu);
          return <SideMenu {...props} />;
        },
      },
    ),
  },
}, {
  headerMode: 'none',
});

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.ref = firebase.firestore().collection('user');
  }

  state = {
    isLoaded: false,
  };

  componentWillMount() {
    this.loadAssets();
  }

  onNavigationStateChange = (previous, current) => {
    const screen = {
      current: this.getCurrentRouteName(current),
      previous: this.getCurrentRouteName(previous),
    };
    if (screen.previous !== screen.current) {

    }
  };

  getCurrentRouteName = (navigation) => {
    const route = navigation.routes[navigation.index];
    return route.routes ? this.getCurrentRouteName(route) : route.routeName;
  };

  loadAssets = async () => {
    this.setState({ isLoaded: true });
  };


  renderApp = () => (
    <View style={{ flex: 1 }}>
      <SuperNannies onNavigationStateChange={this.onNavigationStateChange} />
    </View>
  );


  render = () => (this.state.isLoaded ? this.renderApp() : this.renderApp());

  async componentDidMount() {
    // TODO: You: Do firebase things
    // const { user } = await firebase.auth().signInAnonymously();
    // console.warn('User -> ', user.toJSON());

    // await firebase.analytics().logEvent('foo', { bar: '123'});
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  logo: {
    height: 120,
    marginBottom: 16,
    marginTop: 64,
    padding: 10,
    width: 135,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  modules: {
    margin: 20,
  },
  modulesHeader: {
    fontSize: 16,
    marginBottom: 8,
  },
  module: {
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  }
});
