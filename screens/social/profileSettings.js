import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
} from 'react-native';
import {
  RkText,
  RkTextInput,
  RkAvoidKeyboard,
  RkTheme,
  RkStyleSheet,
} from 'react-native-ui-kitten';
import { data } from '../../data';
import {
  Avatar,
  SocialSetting,
  GradientButton,
} from '../../components';
import { FontAwesome } from '../../assets/icons';

import firebase from 'react-native-firebase';

export class ProfileSettings extends React.Component {
  static navigationOptions = {
    title: 'Profile Settings'.toUpperCase(),
  };

  constructor(props) {
    super(props)
    this.states = {
      parent: this.props.navigation.state.params.parent,
    }
  }

  user = data.getUser(3);

  state = {
    firstName: this.user.firstName,
    lastName: this.user.lastName,
    email: this.user.email,
    email_verified: this.user.email_verified,
    country: this.user.country,
    phone: this.user.phone,
    phone_verified: this.user.phone_verified,
    password: this.user.password,
    newPassword: this.user.newPassword,
    confirmPassword: this.user.confirmPassword,
  };

  onVerifyEmailButtonPressed = () => {
    console.log("Verify Email!!");
  };

  onVerifyPhoneNumberButtonPressed = () => {

    const query2 = "https://nexmo-nexmo-sms-verify-v1.p.mashape.com/send-verification-code?phoneNumber="
    const number = this.states.parent.phone
    const brand = "&brand=SuperNannies"

    fetch(query2 + number + brand, {
      method: 'POST',
      headers: {
        'X-Mashape-Key': 'wMmtYwXUrbmsh3gx1sgXuT1f16KGp14uvGsjsnBDy5KZ3cTZEg',
        'X-Mashape-Host': "nexmo-nexmo-sms-verify-v1.p.mashape.com",
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },})
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
      return "xx";
    });
  };

  onAddGovtIDButtonPressed = () => {
    this.props.navigation.navigate('SignUp_3_picture');
  };

  onFirstNameInputChanged = (text) => {
    this.setState({ firstName: text });
  };

  onLastNameInputChanged = (text) => {
    this.setState({ lastName: text });
  };

  onEmailInputChanged = (text) => {
    this.setState({ email: text });
  };

  onCountryInputChanged = (text) => {
    this.setState({ country: text });
  };

  onPhoneInputChanged = (text) => {
    this.setState({ phone: text });
  };

  onPasswordInputChanged = (text) => {
    this.setState({ password: text });
  };

  onNewPasswordInputChanged = (text) => {
    this.setState({ newPassword: text });
  };

  onConfirmPasswordInputChanged = (text) => {
    this.setState({ confirmPassword: text });
  };

  onSaveButtonPressed = () => {
    console.log(this.states.firstname);
  };

  render = () => (
    <ScrollView style={styles.root}>
      <RkAvoidKeyboard>
        <View style={styles.header}>
          <Avatar img={this.user.photo} rkType='big' />
        </View>
        <View style={styles.section}>
          <View style={[styles.row, styles.heading]}>
            <RkText rkType='header6 primary'>INFO</RkText>
          </View>
          <View style={styles.row}>
            <RkTextInput
              label='First Name'
              value={this.states.parent.firstname}
              rkType='right clear'
              onChangeText={this.onFirstNameInputChanged}
            />
          </View>
          <View style={styles.row}>
            <RkTextInput
              label='Last Name'
              value={this.states.parent.lastname}
              onChangeText={this.onLastNameInputChanged}
              rkType='right clear'
            />
          </View>
          <View style={styles.row}>
            <RkTextInput
              label='Phone Number'
              value={this.states.parent.phone}
              onChangeText={this.onPhoneInputChanged}
              rkType='right clear'
            />
          </View>
          <View style={styles.row}>
            <RkTextInput
              label='Phone Number Verified?'
              value={this.states.parent.phone_verified.toString()}
              rkType='right clear'
            />
          </View>
          <View style={styles.row}>
            <RkTextInput
              label='Email'
              value={this.states.parent.email}
              onChangeText={this.onEmailInputChanged}
              rkType='right clear'
            />
          </View>
          <View style={styles.row}>
            <RkTextInput
              label='Email Verified?'
              value={this.states.parent.email_verified.toString()}
              rkType='right clear'
            />
          </View>
          <GradientButton
            rkType = 'large'
            style = {styles.button}
            text = 'Verify Phone'
            onPress = {this.onVerifyPhoneNumberButtonPressed}
          />
          <GradientButton
            rkType = 'large'
            style = {styles.button}
            text = 'Verify Email'
            onPress = {this.onVerifyEmailButtonPressed}
          />
          <GradientButton
            rkType = 'large'
            style = {styles.button}
            text = 'Add Government ID'
            onPress = {this.onAddGovtIDButtonPressed}
          />
        </View>

        <View style={styles.section}>
          <View style={[styles.row, styles.heading]}>
            <RkText rkType='header6 primary'>ADDRESS</RkText>
          </View>
          <View style={styles.row}>
            <RkTextInput
              label='Street'
              value={this.states.parent.street}
              onChangeText={this.onLastNameInputChanged}
              rkType='right clear'
            />
          </View>
          <View style={styles.row}>
            <RkTextInput
              label='City'
              value={this.states.parent.city}
              onChangeText={this.onLastNameInputChanged}
              rkType='right clear'
            />
          </View>
          <View style={styles.row}>
            <RkTextInput
              label='State'
              value={this.states.parent.state}
              onChangeText={this.onLastNameInputChanged}
              rkType='right clear'
            />
          </View>
          <View style={styles.row}>
            <RkTextInput
              label='Country'
              value={this.states.parent.country}
              onChangeText={this.onLastNameInputChanged}
              rkType='right clear'
            />
          </View>
          <View style={styles.row}>
            <RkTextInput
              label='Zipcode'
              value={this.states.parent.zipcode}
              onChangeText={this.onLastNameInputChanged}
              rkType='right clear'
            />
          </View>
        </View>

        <View style={styles.section}>
          <View style={[styles.row, styles.heading]}>
            <RkText rkType='primary header6'>CHANGE PASSWORD</RkText>
          </View>
          <View style={styles.row}>
            <RkTextInput
              label='Old Password'
              value={this.states.parent.password}
              rkType='right clear'
              secureTextEntry
              onChangeText={this.onPasswordInputChanged}
            />
          </View>
          <View style={styles.row}>
            <RkTextInput
              label='New Password'
              value="worsepassword"
              rkType='right clear'
              secureTextEntry
              onChangeText={this.onNewPasswordInputChanged}
            />
          </View>
          <View style={styles.row}>
            <RkTextInput
              label='Confirm Password'
              value="worsepassword"
              rkType='right clear'
              secureTextEntry
              onChangeText={this.onConfirmPasswordInputChanged}
            />
          </View>
        </View>
        <GradientButton
          rkType = 'large'
          style = {styles.button}
          text = 'SAVE'
          onPress = {this.onSaveButtonPressed}
        />
      </RkAvoidKeyboard>
    </ScrollView>
  );
}

const styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base,
  },
  header: {
    backgroundColor: theme.colors.screen.neutral,
    paddingVertical: 25,
  },
  section: {
    marginVertical: 25,
  },
  heading: {
    paddingBottom: 12.5,
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 17.5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border.base,
    alignItems: 'center',
  },
  button: {
    marginHorizontal: 16,
    marginBottom: 32,
  },
}));
