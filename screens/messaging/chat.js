import React from 'react';
import {
  FlatList,
  View,
  Platform,
  Image,
  TouchableOpacity,
  Keyboard,
  InteractionManager,
  Geolocation,
} from 'react-native';
import {
  RkButton,
  RkText,
  RkTextInput,
  RkAvoidKeyboard,
  RkStyleSheet,
  RkTheme,
} from 'react-native-ui-kitten';
import _ from 'lodash';
import { FontAwesome } from '../../assets/icons';
import { data } from '../../data';
import { Avatar } from '../../components/avatar';
import { scale } from '../../utils/scale';
import NavigationType from '../../config/navigation/propTypes';

const moment = require('moment');

export class Chat extends React.Component {
  static propTypes = {
    navigation: NavigationType.isRequired,
  };
  static navigationOptions = ({ navigation }) => {
    const userId = navigation.state.params ? navigation.state.params.userId : undefined;
    const user = data.getUser(userId);
    return ({
      headerTitle: Chat.renderNavigationTitle(navigation, user),
      headerRight: Chat.renderNavigationAvatar(navigation, user),
    });
  };

  constructor(props) {
    super(props);
    const userId = this.props.navigation.getParam('userId', undefined);
    this.state = {
      data: data.getConversation(userId),
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.listRef.scrollToEnd();
    });
  }

  setListRef = (ref) => {
    this.listRef = ref;
  };


  detectLanguage = (text) => {
    fetch('https://microsoft-azure-text-analytics-v1.p.mashape.com/languages/', {
      method: 'POST',
      headers: {
        'X-Mashape-Key': 'wMmtYwXUrbmsh3gx1sgXuT1f16KGp14uvGsjsnBDy5KZ3cTZEg',
        'X-Mashape-Host': 'microsoft-azure-text-analytics-v1.p.mashape.com',
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        documents:[{"id":"sentence1","text":text}],
      }),
      }).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson["documents"][0]["detectedLanguages"][0]["iso6391Name"]);
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
        return "xx";
      });
    };

  extractItemKey = (item) => `${item.id}`;

  scrollToEnd = () => {
    if (Platform.OS === 'ios') {
      this.listRef.scrollToEnd();
    } else {
      _.delay(this.listRef.scrollToEnd, 100);
    }
  };

  onInputChanged = (text) => {
    this.setState({ message: text });
  };


    ProcessIntent = (Intent) => {
      if(Intent == 'Price'){
        console.log("Price");
        return "The cost of the Soccer club is $"+ Math.random()*100 + " per hour ";
      }
      else if(Intent == 'kid doing'){
        console.log("kids doing");
          return " Takase is playing with legos with the other kids ";
      }
      else if(Intent == 'none'){
        console.log("none");
          return "I'm only a bot but I will get smarter with time in order to answer to you";

      }
      else if(Intent == 'About Nanny'){
        console.log("About Nanny");
        return "The nanny that will be at the club is called: John";
      }
      else if(Intent == 'Calendar.CheckAvailability'){
        return "According to John's calendar, John should be available.";
      }
      else if(Intent == 'nanny.location'){
        return "John is in Futako-Tamagawa. Is this ok?";
      }
      else if(Intent == 'schedule'){
        return "This activity will occur at 7am tommorow";
      }
      else if (Intent=='yes'){
        return "That's good";
      }
      else if(Intent=="no"){
        return "Dialing 999...";
      }

      else{

            return "I'm only a bot but I will get smarter with time in order to answer to you";
      }
    };


  onSendButtonPressed = () => {
    if (!this.state.message) {
      return;
    }

    fetch('https://microsoft-azure-text-analytics-v1.p.mashape.com/languages/', {
      method: 'POST',
      headers: {
        'X-Mashape-Key': 'wMmtYwXUrbmsh3gx1sgXuT1f16KGp14uvGsjsnBDy5KZ3cTZEg',
        'X-Mashape-Host': 'microsoft-azure-text-analytics-v1.p.mashape.com',
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        documents:[{"id":"sentence1","text":this.state.message}],
      }),
      }).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson["documents"][0]["detectedLanguages"][0]["iso6391Name"]);
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
        return "xx";
      });

      const query = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/3c886efb-9253-403b-a733-f6041e3493e4?subscription-key=1d9161e8d8f44e3eb1b83cf8dd9f8e99&timezoneOffset=-360&q=' ;


      fetch(query+ encodeURIComponent(this.state.message))
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
            const message  = this.ProcessIntent(responseJson["topScoringIntent"]["intent"]);
            console.log(message);
              this.state.data.messages.push({
                id: message.length,
                time: 0,
                type: 'out',
                text: message ,
              });

              this.scrollToEnd(true);
          return responseJson;
        })
        .catch((error) => {
          console.error(error);
          return "xx";
        });

    this.setState({ message: '' });
    this.scrollToEnd(true);
  };

  static onNavigationTitlePressed = (navigation, user) => {
    navigation.navigate('ProfileV1', { id: user.id });
  };

  static onNavigationAvatarPressed = (navigation, user) => {
    navigation.navigate('ProfileV1', { id: user.id });
  };

  static renderNavigationTitle = (navigation, user) => (
    <TouchableOpacity onPress={() => Chat.onNavigationTitlePressed(navigation, user)}>
      <View style={styles.header}>
        <RkText rkType='header5'>{`${user.firstName} ${user.lastName}`}</RkText>
        <RkText rkType='secondary3 secondaryColor'>Online</RkText>
      </View>
    </TouchableOpacity>
  );

  static renderNavigationAvatar = (navigation, user) => (
    <TouchableOpacity onPress={() => Chat.onNavigationAvatarPressed(navigation, user)}>
      <Avatar style={styles.avatar} rkType='small' img={user.photo} />
    </TouchableOpacity>
  );

  renderDate = (date) => (
    <RkText style={styles.time} rkType='secondary7 hintColor'>
      {moment().add(date, 'seconds').format('LT')}
    </RkText>
  );

  renderItem = ({ item }) => {
    const isIncoming = item.type === 'in';
    const backgroundColor = isIncoming
      ? RkTheme.current.colors.chat.messageInBackground
      : RkTheme.current.colors.chat.messageOutBackground;
    const itemStyle = isIncoming ? styles.itemIn : styles.itemOut;

    return (
      <View style={[styles.item, itemStyle]}>
        {!isIncoming && this.renderDate(item.time)}
        <View style={[styles.balloon, { backgroundColor }]}>
          <RkText rkType='primary2 mediumLine chat' style={{ paddingTop: 5 }}>{item.text}</RkText>
        </View>
        {isIncoming && this.renderDate(item.time)}
      </View>
    );
  };

  render = () => (
    <RkAvoidKeyboard
      style={styles.container}
      onResponderRelease={Keyboard.dismiss}>

      <FlatList
        ref={this.setListRef}
        extraData={this.state}
        style={styles.list}
        data={this.state.data.messages}
        keyExtractor={this.extractItemKey}
        renderItem={this.renderItem}
      />
      <View style={styles.footer}>
        <RkButton style={styles.plus} rkType='clear'>
          <RkText rkType='awesome secondaryColor'>{FontAwesome.plus}</RkText>
        </RkButton>
        <RkTextInput
          onFocus={this.scrollToEnd}
          onBlur={this.scrollToEnd}
          onChangeText={this.onInputChanged}
          value={this.state.message}
          rkType='row sticker'
          placeholder="Add a comment..."
        />
        <RkButton onPress={this.onSendButtonPressed} style={styles.send} rkType='circle highlight'>
          <Image source={require('../../assets/icons/sendIcon.png')} />
        </RkButton>
      </View>
    </RkAvoidKeyboard>

  )
}

const styles = RkStyleSheet.create(theme => ({
  header: {
    alignItems: 'center',
  },
  avatar: {
    marginRight: 16,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.screen.base,
  },
  list: {
    paddingHorizontal: 17,
  },
  footer: {
    flexDirection: 'row',
    minHeight: 60,
    padding: 10,
    backgroundColor: theme.colors.screen.alter,
  },
  item: {
    marginVertical: 14,
    flex: 1,
    flexDirection: 'row',
  },
  itemIn: {},
  itemOut: {
    alignSelf: 'flex-end',
  },
  balloon: {
    maxWidth: scale(250),
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 15,
    borderRadius: 20,
  },
  time: {
    alignSelf: 'flex-end',
    margin: 15,
  },
  plus: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginRight: 7,
  },
  send: {
    width: 40,
    height: 40,
    marginLeft: 10,
  },
}));
