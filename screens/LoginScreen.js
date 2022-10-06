import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/core'
import AsyncStorage from '@react-native-community/async-storage';

const LoginScreen = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigation=useNavigation();
    const handleSignUp=()=>{
        navigation.navigate('SignUp')
    }
    const saveValueFunction = () => {
        if (email) {
          AsyncStorage.setItem('email', email);
          setEmail('');
        } 
      
        if (password) {
          AsyncStorage.setItem('password', password);
          setPassword('');
        }
        getValueFunction();
      };

      const getValueFunction = () => {

        if(email==null && password==null)
        {
          handleLogin();
        }
        else{
      
            if (email) {
              AsyncStorage.getItem('email', email);
              setEmail('');
            } 
      
            if (password) {
              AsyncStorage.getItem('password', password);
              setPassword('');
            }
      
            auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => navigation.navigate('Home'))
            .catch(error => alert(error))
         }
      };
    const handleLogin=()=>{
        auth.signInWithEmailAndPassword(email,password)
        .then(userCredentials=>{
            const user=userCredentials.user;
            navigation.navigate('Home');
            console.log(user.email)
        }).catch(error=>alert(error.message))
    }


  return (
    <KeyboardAvoidingView
     style={styles.container}
     behavior="padding"
     >
      <View style={styles.inputContainer}>
        <TextInput 
        placeholder='Email'
        value={email}
        onChangeText={text=>setEmail(text)}
        style={styles.input}
        />
        <TextInput 
        placeholder='Password'
        value={password}
        onChangeText={text=>setPassword(text)}
        style={styles.input}
        secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
        onPress={saveValueFunction}
        style={styles.button}
        >
            <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={handleSignUp}
        style={[styles.button,styles.buttonOutline]}
        >
            <Text style={[styles.buttonOutlineText]}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    inputContainer:{
        width:"80%"

    },
    input:{
        backgroundColor:"white",
        paddingHorizontal:15,
        paddingVertical:10,
        borderRadius:10,
        marginTop:5

    },
    buttonContainer:{
        width:"60%",
        justifyContent:'center',
        alignItems:'center',
        marginTop:40

    },
    button:{
        backgroundColor:"#0782F9",
        width:'100%',
        padding:15,
        borderRadius:10

    },
    buttonText:{
        color:'white',
        fontWeight:'700',
        fontSize:16

    },
    buttonOutline:{
        backgroundColor:"white",
        marginTop:5,
        borderColor:"#0782F9",
        borderWidth:2

    },
    buttonOutlineText:{
        color:"#0782F9",
        fontWeight:'700',
        fontSize:16

    },
})