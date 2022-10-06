import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { auth } from '../firebase'

const SignUpScreen = () => {

    const [email,setEmail] = useState('')
    const [name,setName]=useState('')
    const [password,setPassword] = useState('')
    const navigation=useNavigation();
    // useEffect(()=>{
    //     const unsubscribe=auth.onAuthStateChanged(user=>{
    //         console.log("State changed");
    //         if(user){
    //             navigation.navigate("Home");
    //         }
    //     })
    //     return unsubscribe;

    // },[])
    const handleRegister=()=>{
        auth.createUserWithEmailAndPassword(email,password)
        .then(userCredentials=>{
            const user=userCredentials.user;
            console.log(user.email)
            navigation.navigate('RegSuccess');
        }).catch(error=>alert(error.message))
    }

    return (
        <KeyboardAvoidingView
         style={styles.container}
         behavior="padding"
         >
          <View style={styles.inputContainer}>
          <TextInput 
            placeholder='Name'
            value={name}
            onChangeText={text=>setName(text)}
            style={styles.input}
            />
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
            style={styles.button}
            onPress={handleRegister}
            >
                <Text style={styles.buttonOutlineText}>Register</Text>
            </TouchableOpacity>
            <Text
            style={[styles.LoginText]}
            onPress={()=>navigation.navigate('Login')}
            >
                Already Registered? Sign In.
            </Text>
            
          </View>
          {/* <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            >
                <Text style={styles.text}>
                    dver
                </Text>
            </TouchableOpacity>
          </View> */}
        </KeyboardAvoidingView>
      )
    }
    
    export default SignUpScreen
    
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
            justifyContent:"center",
            alignItems:'center',
            marginTop:20
    
        },
        button:{
            backgroundColor:"#0782F9",
            width:'100%',
            padding:15,
            borderRadius:10,
    
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
            textAlign:'center',
            color:"white",
            fontWeight:'700',
            fontSize:16
    
        },
        LoginText:{
            marginTop:10,
            color:"#0782F9",
            fontWeight:'400',
            fontSize:16
    
        }
    })