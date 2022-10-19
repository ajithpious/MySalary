import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { CredentialsContext } from './components/CredentialsContext';
import RootStack from './navigation/RootStack';



export default function App() {
  const [appReady,setAppReady]=useState(false);
  const [storedCredentials,setStoredCredentials]=useState("");
  const checkLoginCredentials=()=>{
    AsyncStorage.getItem('loginCredentials')
    .then((result)=>{
      if(result!==null){
        setStoredCredentials(JSON.parse(result))
      }else{
        setStoredCredentials(null);
      }
      console.log("result=",storedCredentials)
    })
    .catch(error=>console.log(error))
  }
  if(!appReady){
    return (
      <AppLoading
        startAsync={checkLoginCredentials}
        onFinish={()=>setAppReady(true)}
        onError={console.warn}
      />
    )
  }
  return (
    <CredentialsContext.Provider value={{storedCredentials,setStoredCredentials}}>
      <RootStack/>
    </CredentialsContext.Provider>
  );
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
