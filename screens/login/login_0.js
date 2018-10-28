import React from 'react';
import {
  View,
  Image,
  Dimensions,
  Keyboard,
  Text,
} from 'react-native';
import {
  RkButton,
  RkText,
  RkTextInput,
  RkAvoidKeyboard,
  RkStyleSheet,
  RkTheme,
} from 'react-native-ui-kitten';
import { FontAwesome } from '../../assets/icons';
import { GradientButton } from '../../components/gradientButton';
import { scaleModerate, scaleVertical } from '../../utils/scale';
import NavigationType from '../../config/navigation/propTypes';

import firebase from 'react-native-firebase';

firebase.initializeApp();

var database = firebase.database();

// What do I say about this piece of code?
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log(user);
    console.log(firebase.auth().currentUser)
  } else {
    console.log("No one signed in.");
  }
});

export class Login_0 extends React.Component {

  static propTypes = {
    navigation: NavigationType.isRequired,
  };

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      user: undefined,
    }
  }

  getThemeImageSource = (theme) => (
    theme.name === 'light' ?
      require('../../assets/images/backgroundLoginV1.png') : require('../../assets/images/backgroundLoginV1DarkTheme.png')
  );

  renderImage = () => {
    const screenSize = Dimensions.get('window');
    const imageSize = {
      width: screenSize.width,
      height: screenSize.height - scaleModerate(375, 1),
    };
    return (
      <Image
        style={[styles.image, imageSize]}
        source={this.getThemeImageSource(RkTheme.current)}
      />
    );
  };

  onDummyButtonPressed = () => {
    this.props.navigation.navigate('SignUp_0_initial');
  };

  onLoginButtonPressed = () => {

    if (firebase.auth().currentUser != null) {
      firebase.auth().signOut().catch(function(error) {
        console.log(error);
      });
    }

    const email = this.state.email;
    const password = this.state.password;

    firebase.auth().signInWithEmailAndPassword(email, password).
      then(
        () => this.props.navigation.navigate('Profile_parent')
      ).
      catch(
        function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;

          console.log(errorCode);
          console.log(errorMessage);
        }
      );
  };

  onForgotPasswordButtonPressed = () => {
    this.props.navigation.navigate('password');
  };

  onSignUpButtonPressed = () => {
    this.props.navigation.navigate('SignUp_0_initial');
  };

  render = () => (
    <RkAvoidKeyboard
      onStartShouldSetResponder={() => true}
      onResponderRelease={() => Keyboard.dismiss()}
      style={styles.screen}>
      {this.renderImage()}
      <View style={styles.container}>
        <RkTextInput
          rkType = 'rounded'
          placeholder = 'Email'
          autoCorrect = {false}
          onChangeText = {(email) => this.setState({email})}
        />
        <RkTextInput
          rkType = 'rounded'
          placeholder = 'Password'
          secureTextEntry
          onChangeText = {(password) => this.setState({password})}
        />
        <GradientButton
          style={styles.save}
          rkType='large'
          onPress={this.onDummyButtonPressed}
          text='DEMO'
        />
        <GradientButton
          style={styles.save}
          rkType='large'
          onPress={this.onLoginButtonPressed}
          text='LOGIN'
        />
        <View style={styles.footer}>
          <View style={styles.textRow}>
            <RkText rkType='primary3'>Forgot password? </RkText>
            <RkButton rkType='clear'>
              <RkText rkType='header6' onPress={this.onForgotPasswordButtonPressed}>Reset here</RkText>
            </RkButton>
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.textRow}>
            <RkText rkType='primary3'>Don’t have an account? </RkText>
            <RkButton rkType='clear'>
              <RkText rkType='header6' onPress={this.onSignUpButtonPressed}>Sign up now</RkText>
            </RkButton>
          </View>
        </View>
      </View>
    </RkAvoidKeyboard>
  )
}

const styles = RkStyleSheet.create(theme => ({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.colors.screen.base,
  },
  image: {
    resizeMode: 'cover',
    marginBottom: scaleVertical(10),
  },
  container: {
    paddingHorizontal: 17,
    paddingBottom: scaleVertical(22),
    alignItems: 'center',
    flex: -1,
  },
  footer: {
    justifyContent: 'flex-end',
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    marginBottom: scaleVertical(24),
  },
  button: {
    marginHorizontal: 14,
  },
  save: {
    marginVertical: 9,
  },
  textRow: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
}));
