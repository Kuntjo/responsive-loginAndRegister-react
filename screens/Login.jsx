import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { FIREBASE_AUTH } from "../helpers/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { userSignIn } from "../reducers/auth";

const Login = ({ navigation, nav }) => {
    const auth = FIREBASE_AUTH
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const authState = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    const globalStyle = useSelector((state) => state.style.globalStyle)

    useEffect(()=>{
        AsyncStorage.getItem('token').then(token => {
            if(token !== null){
                navigation.navigate('home')
            }
        })
    }, [])

    // == ini tidak perlu kalau sudah pakai dispatch di line 94==
    // useEffect(()=>{
    //     if(authState.token !== null){
    //         Alert.alert('Login Success', 'Welcome user',[
    //             {
    //                 text: 'ok',
    //                 onPress: () => navigation.navigate('home')
    //             }
    //         ])
    //     }
    // }, [authState.token])

    //==Kalo login tanpa async storage==
    // const handleLogin = async () =>{
    //     // try {
    //     //     const response = await signInWithEmailAndPassword(auth, email, password)
    //     //         .then(res => console.log(res))
    //     //         .catch(error => console.log(error))
    //     // } catch (error) {
            
    //     // }

    //     //or
    //     // await signInWithEmailAndPassword(auth, email, password)
    //     // .then(res => console.log(res))
    //     // .catch(error => console.log(error))

    //     //or
    //     try {
    //         const response = await signInWithEmailAndPassword(auth, email, password)
    //         const username = response.user.email.split('@')[0]
    //         Alert.alert('Hello','Welcome, ' + username,[
    //             {
    //                 text: 'Ok',
    //                 onPress: () => navigation.navigate('home')
    //             }
    //         ])
    //         console.log(response)
    //     } catch (error) {
    //         // console.log(String(error))
    //         if(error.message === 'Firebase: Error (auth/invalid-email).'){
    //             Alert.alert('User Not Found','Cant find you bruh')
    //         } else {
    //             Alert.alert('Incorrect Password','Wrong password dummy')
    //         }
    //     }
    // }

    //== Login with AsycnStorage==
    // const handleLogin = () =>{
    //     signInWithEmailAndPassword(auth, email, password) // sign in user
    //         .then(response => response.user.getIdToken()) // call user token id
    //         .then(token => AsyncStorage.setItem('token', token)) //store token
    //         .then(() => {
    //             Alert.alert('Login Success', 'Welcome user',[
    //                 {
    //                     text: 'ok',
    //                     onPress: () => navigation.navigate('home')
    //                 }
    //             ])
    //         })
    // }

    const handleLogin = () =>{
        const payload = {
            email: email,
            password: password
        }
        dispatch(userSignIn(payload))
            .unwrap() // return promis eof action is asycn thunk action
            .then(() => {
                Alert.alert('Login Success', 'Welcome user',[
                    {
                        text: 'ok',
                        onPress: () => navigation.navigate('home')
                    }
                ])
            })
    }

    return(
        <View style={globalStyle.container}>
            {/* <Text>{authState.Login ? 'Loading...' : ''}</Text> */}
            {authState.loading ? <ActivityIndicator></ActivityIndicator> : ''}
            <Text>{email}</Text>
            <Text>{password}</Text>
            <TextInput style={styles.input} placeholder="Email"
                value={email}
                onChangeText={setEmail}></TextInput>
            <TextInput style={styles.input} placeholder="Password"
                value={password}
                secureTextEntry
                onChangeText={setPassword}></TextInput>
            <Button style={styles.buttons} title="Login" onPress={handleLogin}></Button>
            <Button style={styles.buttons} title="Create Account" onPress={ () => navigation.navigate('register')}></Button>
        </View>
    )
}

export default Login;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      padding: 12,
    },

    input: {
        borderColor: 'black',
        borderWidth: 1,
        marginVertical: 6,
        borderRadius: 4,
        borderStyle: 'solid',
        padding: 8
    },

    buttons: {
        paddingVertical: 4,
        marginVertical: 4
    }
  });