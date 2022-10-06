import { View, Text, KeyboardAvoidingView, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'


const RegSuccess = () => {
    
    const navigation=useNavigation();
  return (
    <KeyboardAvoidingView
         style={styles.container}
         behavior="padding"
         >
          <View style={styles.buttonContainer}>
            <Text
            style={styles.LoginText}
            >
                Registred Successfully.
                <Text
                style={styles.SignInText}
                onPress={()=>navigation.navigate('Login')}
                >
                Sign In
                </Text>
            </Text>
          </View>
        </KeyboardAvoidingView>
  )
}

export default RegSuccess

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    buttonContainer:{
        width:"60%",
        justifyContent:'center',
        alignItems:'center',
        marginTop:40

    },
    LoginText:{
        marginTop:10,
        color:"#0782F9",
        fontWeight:'700',
        fontSize:16

    },
    SignInText:{
        marginTop:10,
        textDecorationLine:'underline',
        color:"#0782F9",
        fontWeight:'700',
        fontSize:16,
        alignItems:"center"

    }
})