import { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { FIREBASE_AUTH } from "../helpers/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Register = ({ navigation }) => {
    const auth = FIREBASE_AUTH
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(()=>{
        AsyncStorage.getItem('token').then(token => {
            if(token !== null){
                navigation.navigate('home')
            }
        })
    }, [])

   

    const handleRegister = async () =>{
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password)
            const username = response.user.email.split('@')[0]
            console.log(response)
            Alert.alert('Register success','User ' + username + ' created',[
                {
                    text: 'ok',
                    onPress: () => navigation.navigate('home')
                }
            ])
        } catch (error) {
            // console.log(error)
            Alert.alert('Error on register')
        }

    }

    return(
        <View style={styles.container}>
            {/* <Text>Hello login screen</Text> */}
            <Text>{email}</Text>
            <Text>{password}</Text>
            <TextInput style={styles.input} placeholder="Email"
                value={email}
                onChangeText={setEmail}></TextInput>
            <TextInput style={styles.input} placeholder="Password"
                value={password}
                secureTextEntry
                onChangeText={setPassword}></TextInput>
            <Button style={styles.buttons} title="Register" onPress={handleRegister}></Button>
        </View>
    )
}

export default Register;

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