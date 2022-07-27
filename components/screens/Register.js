import { useState,useLayoutEffect } from 'react';
import { StyleSheet,View, Text, KeyboardAvoidingView } from 'react-native'
import { StatusBar } from "expo-status-bar";
import { Button, Input } from '@rneui/base';

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";


import auth from '../../Firebase';

const Register = ({navigation}) => {
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    function Navigate(){
        navigation.navigate('Register');
    }

    function Register(){
        
        createUserWithEmailAndPassword(auth, email, password)
        .then((authUser) => {
            updateProfile(auth.currentUser ,{
                displayName : username
            })
        })
        .catch(error => alert(error.message));
    }

    useLayoutEffect(()=> {
        navigation.setOptions({
            // headerBackTitle : 'ABC'
        })
    },[navigation]);

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <StatusBar style="light" />
        <Text style={styles.title}>Create an account</Text>
        <View style={styles.inputContainer}>
            <Input  placeholder='Username'  value={username} onChangeText={setUsername}/>
            <Input  placeholder='Email' value={email} onChangeText={setEmail}/>
            <Input placeholder='Password'  secureTextEntry value={password} onChangeText={setPassword}/>
        </View>

        <Button containerStyle={styles.btn} title="Register" onPress={Register}/>
        <View style={{height : 80}} />

    </KeyboardAvoidingView>
  )
}

export default Register

const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center',
        padding : 10,
      
    },
    title : {
        fontSize : 22,
        marginVertical : 30
    },
    inputContainer : {
        width : 300,
    },
    btn : {
        width : 200,
        marginTop : 10
    },
})