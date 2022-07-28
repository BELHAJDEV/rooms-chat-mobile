import { useState,useRef, useEffect } from 'react';
import { StyleSheet,View, Image, KeyboardAvoidingView, Alert } from 'react-native'
import { StatusBar } from "expo-status-bar";
import { Button, Input } from '@rneui/base';
import Logo from '../../assets/logo-icon.png';

import { onAuthStateChanged, signInWithEmailAndPassword  } from 'firebase/auth';
import auth from '../../Firebase';

const Login = ({navigation}) => {

    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');

    function Navigate(){
        navigation.navigate('Register');
    }

    function Login(){
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            // console.log(userCredential.user.uid)
            // ...
            navigation.replace('Home')

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // console.log(errorMessage)
            Alert.alert(errorMessage)
        });
    }

    useEffect(()=> {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              console.log(user.displayName)
              navigation.replace('Home')
            }
          });
    },[])

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <StatusBar style="light" />
        
        
        <Image source={Logo} style={styles.logo} />
        
        <View style={styles.inputContainer}>
            <Input type ='email'  placeholder='Email' autoFocus value={email} onChangeText={setEmail}/>
            <Input type='password' placeholder='Password'  secureTextEntry value={password} onChangeText={setPassword}/>
        </View>

        <Button containerStyle={styles.btn} title="Login" onPress={Login}/>
        <Button containerStyle={styles.btn} title="Register" type="outline" onPress={Navigate}/>
        <View style={{height : 75}} />

    </KeyboardAvoidingView>
  )
}

export default Login

const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center',
        padding : 10
    },
    logo :{
        width : 100, 
        height : 100,
       
    },
    inputContainer : {
        width : 300,
    },
    btn : {
        width : 200,
        marginTop : 10
    },

})