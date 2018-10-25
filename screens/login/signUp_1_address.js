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

export class SignUp_1 extends React.Component {
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
      street: "",
      city: "",
      country: "",
      zipcode: "",
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

    this.props.navigation.navigate('SignUp',
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
        <RkText rkType='h1'>Address</RkText>
      </View>
      <View style={styles.content}>
        <View>
          <RkTextInput
            rkType = 'rounded'
            placeholder = 'Street'
            autoCorrect = {false}
            onChangeText = {(street) => this.setState({street})}
          />
          <RkTextInput
            rkType = 'rounded'
            placeholder = 'City'
            autoCorrect = {false}
            onChangeText = {(city) => this.setState({city})}
          />
          <RkTextInput
            rkType = 'rounded'
            placeholder = 'Country'
            autoCorrect = {false}
            onChangeText = {(country) => this.setState({country})}
          />
          <RkTextInput
            rkType = 'rounded'
            placeholder = 'Zipcode'
            keyboardType = {"numeric"}
            onChangeText = {(zipcode) => this.setState({zipcode})}
          />
          <GradientButton
            style={styles.save}
            rkType='large'
            text='CONTINUE'
            onPress={this.onContinueButtonPressed}
          />
          <GradientButton
            style={styles.save}
            rkType='large'
            text='BACK'
            onPress={this.onBackButtonPressed}
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
