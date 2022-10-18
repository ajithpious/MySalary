import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { useNavigation } from '@react-navigation/native';
import { CredentialsContext } from '../components/CredentialsContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


const HomeScreen = () => {
  const navigation = useNavigation();
  const {storedCredentials,setStoredCredentials}=useContext(CredentialsContext)
  const handleLogout = () => {
    AsyncStorage.removeItem('loginCredentials')
    .then(()=>{
      setStoredCredentials('');
    })
    .catch((error)=>console.log(error))
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleLogout}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputContainer: {
    width: "80%"

  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5

  },
  buttonContainer: {
    width: "60%",
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40

  },
  button: {
    backgroundColor: "#0782F9",
    width: '100%',
    padding: 15,
    borderRadius: 10

  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16

  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2

  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: '700',
    fontSize: 16

  },
})