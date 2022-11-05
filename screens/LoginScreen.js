import { ActivityIndicator, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState ,useContext} from 'react'
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/core'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CredentialsContext } from '../components/CredentialsContext'
const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation();
  const {storedCredentials,setStoredCredentials}=useContext(CredentialsContext)
  const handleSignUp = () => {
    navigation.navigate('SignUp')
  }
  const persistLogin = (email) => {
    AsyncStorage.setItem('loginCredentials',JSON.stringify(email))
    .then(()=>{
      setStoredCredentials(email)
    })
    .catch((error)=>{
      console.log(error)
    })
  }
  const handleLogin = () => {
    setLoading(true)
    auth.signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log(user.email)
        persistLogin(user.email)
        setLoading(false)
      }).catch(error => {
        setLoading(false)
        alert(error.message)
      })

  }
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      enabled={false}
    >
      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Email'
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder='Password'
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        { !loading && <TouchableOpacity
          onPress={handleLogin}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        }
        { loading && <TouchableOpacity
          disabled={true}
          style={styles.button}
        >
          <ActivityIndicator size="small" color="white" />
        </TouchableOpacity>

        }
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={[styles.buttonOutlineText]}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

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