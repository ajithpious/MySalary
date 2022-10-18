import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import RegSuccess from '../screens/RegSuccess';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CredentialsContext } from '../components/CredentialsContext';
const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <CredentialsContext.Consumer>
        {({storedCredentials})=>(
            <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                {
                storedCredentials ? 
                <Stack.Screen options={{headerShown:false}} name="Home" component={HomeScreen} />
                : <>
                <Stack.Screen options={{headerShown:false}} name="Login" component={LoginScreen} />
                <Stack.Screen options={{headerShown:false}} name="SignUp" component={SignUpScreen} />
                </>
            }
            <Stack.Screen options={{headerShown:false}} name="RegSuccess" component={RegSuccess} />
            {/* <Stack.Screen options={{headerShown:false}} name="Home" component={HomeScreen} /> */}
            </Stack.Navigator>
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