import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { CredentialsContext, DataContext } from './components/CredentialsContext';
import RootStack from './navigation/RootStack';
import { NativeBaseProvider } from 'native-base';
import { BaseTheme } from './Theme/';
import config from './nativeBase.config';
import { Provider as PaperProvider } from 'react-native-paper';
import {
  en,
  // fr,
  // nl,
  // de,
  // pl,
  // pt,
  // ar,
  // ko
  // fr
  enGB,
  registerTranslation,
} from 'react-native-paper-dates'


export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [storedCredentials, setStoredCredentials] = useState("");
  const [shiftData, setShiftData] = useState("");
  useEffect(()=>{
    // e.g in your index.js
registerTranslation('en', en)
// registerTranslation('fr', fr)
// registerTranslation('nl', nl)
// registerTranslation('pl', pl)
// registerTranslation('pt', pt)
// registerTranslation('de', de)
// registerTranslation('ar', ar)
// registerTranslation('ko', ko)
// registerTranslation('fr', fr)
registerTranslation('en-GB', enGB)
    console.log("effect data=",shiftData)
  },[])
  const checkLoginCredentials = () => {
    AsyncStorage.getItem('loginCredentials')
      .then((result) => {
        if (result !== null) {
          setStoredCredentials(JSON.parse(result))
        } else {
          setStoredCredentials(null);
        }
        console.log("result=", storedCredentials)
      })
      .catch(error => console.log(error))
    AsyncStorage.getItem('shifts')
      .then((result) => {
        console.log("result=", result)
        if (result !== null) {
          // console.log("res=",JSON.parse(result))
          setShiftData(JSON.parse(result))
          // console.log("")
        } else {
          setShiftData({});
        }
        // console.log("data=",shiftData)
      })
      .catch(error => console.log(error))
  }
  if (!appReady) {
    return (
      <AppLoading
        startAsync={checkLoginCredentials}
        onFinish={() => setAppReady(true)}
        onError={console.warn}
      />
    )
  }
  console.log("dd=",shiftData)
  return (
    <NativeBaseProvider theme={BaseTheme} config={config}>
      <PaperProvider>
      <DataContext.Provider value={{shiftData,setShiftData}}>
        <CredentialsContext.Provider value={{ storedCredentials, setStoredCredentials }}>
          <RootStack />
        </CredentialsContext.Provider>
      </DataContext.Provider>
      </PaperProvider>
    </NativeBaseProvider>
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
