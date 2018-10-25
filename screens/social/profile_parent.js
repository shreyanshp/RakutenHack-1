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

var ref = database.ref("/users/user2");

var user = "";
ref.on("value", function(snapshot) {
  user = snapshot.val();
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

    this.state.parent = user;
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

  render = () => (
    <ScrollView style={styles.root}>
      <View style={[styles.header, styles.bordered]}>
        <Avatar img={this.state.data.photo} rkType='big' />
        <RkText rkType='header2'>{`${this.state.parent.firstname} ${this.state.parent.lastname}`}</RkText>
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
          text = 'View Activities'
          onPress = {this.onViewActivitiesButtonPressed}
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
}));
