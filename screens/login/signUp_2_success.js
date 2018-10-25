import React from 'react';
import {
  View,
  Image,
  Keyboard,
} from 'react-native';

import {
  RkButton,
  RkText,
  RkTextInput,
  RkStyleSheet,
  RkTheme,
  RkAvoidKeyboard,
} from 'react-native-ui-kitten';
import { GradientButton } from '../../components/';
import { scaleVertical } from '../../utils/scale';
import NavigationType from '../../config/navigation/propTypes';

import firebase from 'react-native-firebase';

export class SignUp_2 extends React.Component {
  static navigationOptions = {
    header: null,
  };
  static propTypes = {
    navigation: NavigationType.isRequired,
  };

  constructor(props) {
    super(props)
    this.state = {
      firstname: this.props.navigation.state.params.firstname,
      lastname: this.props.navigation.state.params.lastname,
      birthday: this.props.navigation.state.params.birthday,
      email: this.props.navigation.state.params.email,
      password: this.props.navigation.state.params.password,
      street: this.props.navigation.state.params.street,
      city: this.props.navigation.state.params.city,
      country: this.props.navigation.state.params.country,
      zipcode: this.props.navigation.state.params.zipcode,
    }

    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((user) => {
        console.log("Success!");
      })
      .catch((error) => {
        const { code, message } = error;
        console.log("Failure!");
      });
  }

  getThemeImageSource = (theme) => (
    theme.name === 'light' ?
      require('../../assets/images/logo.png') : require('../../assets/images/logoDark.png')
  );

  renderImage = () => (
    <Image style={styles.image} source={this.getThemeImageSource(RkTheme.current)} />
  );

  onContinueButtonPressed = () => {
    if (this.state.zipcode === '12345') {
      this.props.navigation.navigate('SignUp_2_done',
        {
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          birthday: this.state.birthday,
          email: this.state.email,
          password: this.state.password,
          street: this.state.street,
          city: this.state.city,
          country: this.state.country,
          zipcode: this.state.zipcode,
        }
      );
    }
  };

  onBackButtonPressed = () => {
    this.props.navigation.goBack();
  };

  render = () => (
    <RkAvoidKeyboard
      style={styles.screen}
      onStartShouldSetResponder={() => true}
      onResponderRelease={() => Keyboard.dismiss()}>
      <View style={{ alignItems: 'center' }}>
        {this.renderImage()}
        <RkText rkType='h1'>Sign-In DEBUG</RkText>
      </View>
      <View style={styles.content}>
        <View>
          <RkText rkType = 'primary'>
            {this.state.firstname}
          </RkText>
          <RkText rkType = 'primary'>
            {this.state.lastname}
          </RkText>
          <RkText rkType = 'primary'>
            {this.state.birthday}
          </RkText>
          <RkText rkType = 'primary'>
            {this.state.email}
          </RkText>
          <RkText rkType = 'primary'>
            {this.state.password}
          </RkText>
          <RkText rkType = 'primary'>
            {this.state.street}
          </RkText>
          <RkText rkType = 'primary'>
            {this.state.city}
          </RkText>
          <RkText rkType = 'primary'>
            {this.state.country}
          </RkText>
          <RkText rkType = 'primary'>
            {this.state.zipcode}
          </RkText>
        </View>
      </View>
    </RkAvoidKeyboard>
  )
}

const styles = RkStyleSheet.create(theme => ({
  screen: {
    padding: 16,
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: theme.colors.screen.base,
  },
  image: {
    marginBottom: 10,
    height: scaleVertical(77),
    resizeMode: 'contain',
  },
  content: {
    justifyContent: 'space-between',
  },
  save: {
    marginVertical: 20,
  },
  buttons: {
    flexDirection: 'row',
    marginBottom: 24,
    marginHorizontal: 24,
    justifyContent: 'space-around',
  },
  footer: {
    justifyContent: 'flex-end',
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
}));
