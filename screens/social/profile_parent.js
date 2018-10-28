import React from 'react';
import {
  View,
  ScrollView,
} from 'react-native';
import {
  RkText,
  RkButton, RkStyleSheet,
} from 'react-native-ui-kitten';
import { Avatar } from '../../components/avatar';
import { Gallery } from '../../components/gallery';
import { GradientButton } from '../../components/';
import { data } from '../../data/';
import formatNumber from '../../utils/textUtils';
import NavigationType from '../../config/navigation/propTypes';

import { parents } from "../../data/parents/parent1/parents";

import firebase from 'react-native-firebase';

firebase.initializeApp();

var database = firebase.database();

// var ref = database.ref("/users/user2");

var user = "";

var curUser = firebase.auth().currentUser;
var userRef = "/users/user_";
var someRef = "";
var someVal = "";

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    curUser = firebase.auth().currentUser;
    userRef = userRef.concat(curUser.uid);
    someRef = database.ref(userRef);
    someRef.on("value", function(snapshot) {
      someVal = snapshot.val();
    });
  } else {
    console.log("no one is signed in.");
  }
});

export class Profile_parent extends React.Component {
  static propTypes = {
    navigation: NavigationType.isRequired,
  };
  static navigationOptions = {
    title: 'User Profile'.toUpperCase(),
  };

  state = {
    data: undefined,
  };

  constructor(props) {
    super(props);
    const id = this.props.navigation.getParam('id', 3);
    this.state.data = data.getUser(id);

    this.state.parent = someVal;
  }

  onEditProfileSettingsButtonPressed = () => {
    this.props.navigation.navigate('ProfileSettings',
      {
        parent: this.state.parent,
      }
    );
  };

  onAddChildButtonPressed = () => {
  };

  onViewActivitiesButtonPressed = () => {
    this.props.navigation.navigate('Activities');
  };

  onLogoutButtonPressed = () => {

    logout = this.props.navigation.navigate('Login_0');

    console.log("Signing out...");
    console.log(firebase.auth().currentUser);

    firebase.auth().signOut().then(function() {
      logout;
    }).catch(function(error) {
      console.log(error);
    });
  };

  render = () => (
    <ScrollView style={styles.root}>
      <View style={[styles.header, styles.bordered]}>
        <Avatar img={this.state.data.photo} rkType='big' />
        <RkText rkType='header2'>{`${someVal.firstname} ${someVal.lastname}`}</RkText>
      </View>
      <View style={styles.content}>
        <GradientButton
          style = {styles.save}
          rkType = 'large'
          text = 'Edit Profile'
          onPress = {this.onEditProfileSettingsButtonPressed}
        />
      </View>
      <View style={styles.content}>
        <GradientButton
          style = {styles.save}
          rkType = 'large'
          text = 'Add Child'
          onPress = {this.onAddChildButtonPressed}
        />
      </View>
      <View style={styles.content}>
        <GradientButton
          style = {styles.save}
          rkType = 'large'
          text = 'Search for nannies'
          onPress = {this.onViewActivitiesButtonPressed}
        />
      </View>
      <View style={styles.content}>
        <GradientButton
          style = {styles.save}
          rkType = 'large'
          text = 'Logout'
          onPress = {this.onLogoutButtonPressed}
        />
      </View>
    </ScrollView>
  );
}

const styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base,
  },
  header: {
    alignItems: 'center',
    paddingTop: 25,
    paddingBottom: 17,
  },
  userInfo: {
    flexDirection: 'row',
    paddingVertical: 18,
  },
  bordered: {
    borderBottomWidth: 1,
    borderColor: theme.colors.border.base,
  },
  section: {
    flex: 1,
    alignItems: 'center',
  },
  space: {
    marginBottom: 3,
  },
  separator: {
    backgroundColor: theme.colors.border.base,
    alignSelf: 'center',
    flexDirection: 'row',
    flex: 0,
    width: 1,
    height: 42,
  },
  buttons: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  button: {
    flex: 1,
    alignSelf: 'center',
  },

  save: {
    marginVertical: 9,
  },
  content: {
    justifyContent: 'space-between',
  },
}));
