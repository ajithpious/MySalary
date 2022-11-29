import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import RegSuccess from '../screens/RegSuccess';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CredentialsContext, DataContext } from '../components/CredentialsContext';
import Home from '../screens/Home';
import { createStackNavigator } from '@react-navigation/stack';
import AI from '../screens/AI';
import Profile from '../screens/Profile';
import { Box, useColorMode, useColorModeValue, useToken } from 'native-base';
import Shifts from '../screens/Shifts';
import { useContext } from 'react';
import ProfileSettings from '../screens/ProfileSettings';
const Stack = createStackNavigator();

const RootStack = () => {
  const [lightBg, darkBg] = useToken(
    'colors',
    ['coolGray.50', 'blueGray.900'],
    'blueGray.900',
  );
  const bgColor = useColorModeValue(lightBg, darkBg)
  console.log(bgColor)
  const {storedShiftData}=useContext(DataContext)
  console.log("data=",storedShiftData)
  return (
    <CredentialsContext.Consumer>
      {({ storedCredentials }) => (
        <NavigationContainer 
        theme={{
          colors: { background: bgColor }
        }}
        >
          <Box flex={1}
            w="100%"
            _light={{
              bg: 'coolGray.50',
            }}
            _dark={{
              bg: 'blueGray.900',
            }}
            // bg={useColorModeValue('', 'blueGray.900')}
            _web={{
              overflowX: 'hidden',
            }}
          >
            <Stack.Navigator initialRouteName="Login">
              {
                storedCredentials ?
                  <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
                  : <>
                    <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
                    <Stack.Screen options={{ headerShown: false }} name="SignUp" component={SignUpScreen} />
                  </>
              }
              <Stack.Screen options={{ headerShown: false }} name="AIStack|amal" component={AI} />
              <Stack.Screen options={{ headerShown: false }} name="ProfileStack" component={Profile} />
              <Stack.Screen options={{ headerShown: false }} name="RegSuccess" component={RegSuccess} />
              <Stack.Screen options={{ headerShown: false }} name="NewHome" component={Home} />
              <Stack.Screen options={{ headerShown: false }} name="Shifts" component={Shifts} />
              <Stack.Screen options={{ headerShown: false }} name="ProfileSettings" component={ProfileSettings} />
            </Stack.Navigator>
          </Box>
        </NavigationContainer>
      )}
    </CredentialsContext.Consumer>
  )
}

export default RootStack

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});