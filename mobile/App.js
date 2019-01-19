/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {AppState, Platform, StyleSheet, Text, View, Button} from 'react-native';

import PushNotification from 'react-native-push-notification';

import OneSignal from 'react-native-onesignal';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

//exemplo: https://medium.com/@mstifflin/how-to-set-up-local-notifications-for-android-in-react-native-f062232c4be8

export default class App extends Component {

  componentDidMount(){
    OneSignal.init('4b02704f-f535-4b1a-bd6e-b07fe0f7daa4');

    AppState.addEventListener('change', this.handleAppStateChange);

  }
  // This will notify the user in 3 seconds after sending the app to the 
  // background (like after pressing the home button or switching apps)
  handleAppStateChange(appState) {
    if (appState === 'background') {
      // Schedule a notification
      var date = new Date();

      PushNotification.localNotificationSchedule({
        title : 'Titulo da notificacao agendada em backgound',
        message: 'Notificacao local agendada '+ date.toLocaleTimeString(), // (required)
        date: new Date(Date.now() + (10 * 1000)) // in 3 secs,
      });

/*
      var agend = new Date();
      agend.setHours(16, 10, 0);

      PushNotification.localNotificationSchedule({
        title : 'Notificacao as 16:10',
        message: 'devera rodar as 16:10 '+ agend.toLocaleTimeString(), // (required)
        date: agend
      });
    }
    */
  };

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  };


  sendLocalNotification() {
    var date = new Date();

    PushNotification.localNotification({
      title : 'Titulo da notificacao pelo botao',
      message: 'Notificacao disparada pelo botao '+ date.toLocaleTimeString()
    });
  };


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Teste de Notificacao</Text>


        <Button title='Clique para notificar agora'
          onPress={this.sendLocalNotification} />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});
