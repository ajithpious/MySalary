import { ActivityIndicator, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { auth, db } from '../firebase'
import { cos } from 'react-native-reanimated'
import { CredentialsContext } from '../components/CredentialsContext'

const SignUpScreen = () => {

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const {storedCredentials,setStoredCredentials}=useContext(CredentialsContext)
    const usersDB = db.collection('users');
    const handleRegister = () => {
        setLoading(true)
        auth.createUserWithEmailAndPassword(email, password)
            .then(async (userCredentials) => {
                const user = userCredentials.user;
                console.log(user.email)
                
                const userRef=usersDB.doc(user.email);
                await userRef.set({
                    "username":name,
                    'shifts':""
                  });
                // navigation.navigate('RegSuccess');
                setLoading(false)
                setStoredCredentials(user.email)
            }).catch(error => {
                console.log(error)
                alert(error.message)
                setLoading(false)
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
                    placeholder='Name'
                    value={name}
                    onChangeText={text => setName(text)}
                    style={styles.input}
                />
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
                {!loading && <TouchableOpacity
                    style={styles.button}
                    onPress={handleRegister}
                >
                    <Text style={styles.buttonOutlineText}>Register</Text>
                </TouchableOpacity>

                }
                {loading && <TouchableOpacity
                    style={styles.button}
                    disabled={true}
                >
                    <ActivityIndicator size="small" color="white" />
                </TouchableOpacity>}
                <Text
                    style={[styles.LoginText]}
                    onPress={() => navigation.navigate('Login')}
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
        justifyContent: "center",
        alignItems: 'center',
        marginTop: 20

    },
    button: {
        backgroundColor: "#0782F9",
        width: '100%',
        padding: 15,
        borderRadius: 10,

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
        textAlign: 'center',
        color: "white",
        fontWeight: '700',
        fontSize: 16

    },
    LoginText: {
        marginTop: 10,
        color: "#0782F9",
        fontWeight: '400',
        fontSize: 16

    }
})