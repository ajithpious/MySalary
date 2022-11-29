import React, { useContext } from 'react';
import {
  Button,
  Container,
  Icon,
  ScreenContainer,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { RadioButton, Button as PaperButton, Badge, DataTable } from "react-native-paper";
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from '../components/CredentialsContext';
import { db } from '../firebase';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const Profile = props => {
  const {storedCredentials,setStoredCredentials}=useContext(CredentialsContext)
  const { theme } = props;
  const navigation=useNavigation()
  const [username,setUsername]=useState("")
  const usersDB = db.collection('users');

  const handleLogout = () => {
    AsyncStorage.removeItem('loginCredentials')
      .then(() => {
        setStoredCredentials('');
      })
      .catch((error) => console.log(error))
  }
  const getUserName = async () => {
    const user = usersDB.doc(storedCredentials)
    const data = await user.get()
    // console.logs(data.data()['username'])
    // return data.data()['username']
    return data.data()['username']

}
useEffect(()=>{
  getUserName().then((name)=>{
    setUsername(name)
  })

},[])
  return (
    <ScreenContainer
      style={styles.screenContainerJb}
      scrollable={true}
      hasSafeArea={false}
    >
      <ImageBackground
        style={styles.imageBackgroundNb}
        source={require("../config/Images/img.jpg")}
        resizeMode="cover"
      />
      <Container
        style={styles.containerEA}
        elevation={0}
        useThemeGutterPadding={true}
      >
        <Image
          style={StyleSheet.flatten([
            styles.imageA3,
            { borderRadius: theme.borderRadius.global },
          ])}
          resizeMode="cover"
          source={require("../config/Images/img.jpg")}
        />
        <Text
          style={StyleSheet.flatten([
            styles.textPr,
            theme.typography.headline3,
          ])}
        >
          {username}
        </Text>
        <PaperButton style={styles.buttonP2} mode="contained" uppercase={false}>
        <Text color='white'
        >
          edit
        </Text>
        </PaperButton>
      </Container>
      <Container useThemeGutterPadding={true} elevation={0}>

          
        <Touchable
          style={StyleSheet.flatten([
            styles.touchableOk,
            { borderColor: theme.colors.divider },
          ])}
          onPress={()=>{navigation.navigate('ProfileSettings')}}
        >
          <View style={styles.viewKs}>
            <Text style={theme.typography.body1}>Profile Settings</Text>
            <Icon
              style={styles.iconFE}
              size={24}
              color={theme.colors.strong}
              name="MaterialIcons/settings"
            />
          </View>
        </Touchable>
        <Touchable
          style={StyleSheet.flatten([
            styles.touchableOm,
            { borderColor: theme.colors.divider },
          ])}
        >
          <View style={styles.viewYR}>
            <Text style={theme.typography.body1}>Notifications</Text>
            <Icon
              style={styles.iconCl}
              color={theme.colors.strong}
              name="MaterialIcons/notifications"
              size={24}
            />
          </View>
        </Touchable>
        
        <Touchable
          style={StyleSheet.flatten([
            styles.touchableJg,
            { borderColor: theme.colors.divider },
          ])}
          onPress={handleLogout}
        >
          <View style={styles.viewAl}>
            <Text style={theme.typography.body1}>Log Out</Text>
            {/* <Icon
              style={styles.iconZb}
              size={24}
              name="MaterialIcons/payment"
              color={theme.colors.strong}
            /> */}
          </View>
        </Touchable>
      </Container>
    </ScreenContainer>
  );
};
const styles = StyleSheet.create({
  screenContainerJb: {
    justifyContent: 'space-evenly',
  },
  viewKs: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  viewYR: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  viewS1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewAl: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  imageBackgroundNb: {
    width: '100%',
    height: 250,
  },
  imageA3: {
    height: 120,
    width: 120,
  },
  containerEA: {
    alignItems: 'center',
    marginTop: -65,
  },
  textPr: {
    width: '100%',
    textAlign: 'center',
    marginTop: 16,
  },
  touchableOk: {
    borderTopWidth: 1,
    paddingTop: 12,
    paddingBottom: 12,
    marginTop: 32,
  },
  iconFE: {
    height: 24,
    width: 24,
  },
  iconCl: {
    width: 24,
    height: 24,
  },
  iconZz: {
    width: 24,
    height: 24,
  },
  iconZb: {
    height: 24,
    width: 24,
  },
  buttonP2: {
    marginTop: 16,
    alignSelf: 'center',
    width: '50%',
  },
  touchableOm: {
    paddingBottom: 12,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  touchableBp: {
    paddingBottom: 12,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  touchableJg: {
    paddingBottom: 12,
    paddingTop: 12,
    borderTopWidth: 1,
  },
});
export default withTheme(Profile);