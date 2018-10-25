import ImagePicker from 'react-native-image-picker';
import React from 'react';

import {
  
  Text,
  View,
    PixelRatio,
    TouchableOpacity,
    Image,
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

export class SignUp_3 extends React.Component{
  state = {
    avatarSource: null,
    videoSource: null
};


pickUpPhotos() {
    const options = {
        title: 'Profile Picture', 
        cancelButtonName: 'Cancel',
        chooseFromLibraryButtonTitle: 'Select from Photo Library', 
        mediaType: 'photo'
    };

    ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
            console.log('User cancelled image picker');
        }
        else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        }
        else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
        }
        else {
            let source = { uri: response.uri };

            this.setState({
                avatarSource: source
            });
        }
    });
}
onContinueButtonPressed = () => {
      this.props.navigation.navigate('SignUp_0_initial');
  };

render() {
    return (
        
        <View style={styles.container}>
            <TouchableOpacity onPress={this.pickUpPhotos.bind(this)}>
                <View  style={styles.save} >
                    { this.state.avatarSource === null ? <Text>Select Photo</Text> :
                        <Image style={styles.loadedimage} source={this.state.avatarSource} />
                    }
                </View>
            </TouchableOpacity>
                    <GradientButton
                      style={styles.save}
                            rkType='large'
                             text='CONTINUE'
                             onPress={this.onContinueButtonPressed}
                            />
        </View>

    );
}

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
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.screen.base,
    },
  
    loadedimage: {
        width: 500,
        height: 500
    }
  })
  
  );

