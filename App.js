import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./components/screens/Login";
import Register from "./components/screens/Register";
import Home from "./components/screens/Home";
import ChatScreen from "./components/screens/ChatScreen";
export default function App() {

  const Stack = createNativeStackNavigator();

  const globalScreenOptions = {
    headerStyle : {
        backgroundColor : '#0096FF',
      
    },
    headerTitleStyle : {color : 'white'},
    headerTintColor : 'white'
    
  
}

  return (
    <NavigationContainer style={styles.container}>
      <StatusBar style="auto" />
      <Stack.Navigator 
      // initialRouteName="Login" 
      screenOptions={globalScreenOptions}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} options={{
          headerBackVisible : false,
          
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

});
