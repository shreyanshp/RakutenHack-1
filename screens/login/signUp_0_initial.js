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

firebase.initializeApp();

export class SignUp_0 extends React.Component {

  static navigationOptions = {
    header: null,
  };
  static propTypes = {
    navigation: NavigationType.isRequired,
  };

  constructor(props) {
    super(props)
    this.state = {
      firstname: "",
      lastname: "",
      birthday: "",
      email: "",
      password: "",
      phone: "",
    }
  }

  getThemeImageSource = (theme) => (
    theme.name === 'light' ?
      require('../../assets/images/logo.png') : require('../../assets/images/logoDark.png')
  );

  renderImage = () => (
    <Image style={styles.image} source={this.getThemeImageSource(RkTheme.current)} />
  );

  onContinueButtonPressed = () => {

    firebase.auth().signOut().catch(function(error) {
      console.log(error);
    });

    this.props.navigation.navigate('SignUp_1_address',
      {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        birthday: this.state.birthday,
        email: this.state.email,
        password: this.state.password,
        phone: this.state.phone,
      }
    );
  };

  render = () => (
    <RkAvoidKeyboard
      style={styles.screen}
      onStartShouldSetResponder={() => true}
      onResponderRelease={() => Keyboard.dismiss()}>
      <View style={{ alignItems: 'center' }}>
        {this.renderImage()}
        <RkText rkType='h1'>Basic Info</RkText>
      </View>
      <View style={styles.content}>
        <View>
          <RkTextInput
            rkType = 'rounded'
            placeholder = 'First Name'
            autoCorrect = {false}
            onChangeText = {(firstname) => this.setState({firstname})}
          />
          <RkTextInput
            rkType = 'rounded'
            placeholder = 'Last Name'
            autoCorrect = {false}
            onChangeText = {(lastname) => this.setState({lastname})}
          />
          <RkTextInput
            rkType = 'rounded'
            placeholder = 'Birthday'
            autoCorrect = {false}
            keyboardType = {"numeric"}
            onChangeText = {(birthday) => this.setState({birthday})}
          />
          <RkTextInput
            rkType = 'rounded'
            placeholder = 'Email'
            autoCapitalize = {"none"}
            autoCorrect = {false}
            onChangeText = {(email) => this.setState({email})}
          />
          <RkTextInput
            rkType = 'rounded'
            placeholder = 'Password'
            secureTextEntry
            onChangeText = {(password) => this.setState({password})}
          />
          <RkTextInput
            rkType = 'rounded'
            placeholder = 'Phone'
            autoCorrect = {false}
            onChangeText = {(phone) => this.setState({phone})}
          />
          <GradientButton
            style={styles.save}
            rkType='large'
            text='CONTINUE'
            onPress={this.onContinueButtonPressed}
          />
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
