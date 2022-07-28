import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import CustomListItem from "../UI/CustomListItem";
import { Avatar } from "@rneui/themed";
import auth, { db } from "../../Firebase";
import { AntDesign, EvilIcons } from "@expo/vector-icons";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, addDoc, getDocs, query } from "firebase/firestore";
// import {Avatar } from "@rneui/themed";

const Home = ({ navigation }) => {
  const [chats, setChats] = useState([]);
  const [username, setUsername] = useState();


  const getChats = async () => {
    getDocs(collection(db, "Chats")).then((snapshot) =>
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  };
  useEffect(() => {
    getChats();
  }, [chats]);

  const signoutUser = () => {
    signOut(auth)
      .then(() => navigation.replace("Login"))
      .catch((err) => alert(err.message));
  };

  const addChat = async (name) => {
    try {
      const docRef = await addDoc(collection(db, "Chats"), {
        chatName: name,
        createrId: auth?.currentUser?.uid,
        createrName: auth?.currentUser?.displayName,
      });
      // console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      // console.error("Error adding document: ", e);
      Alert.alert(e);
    }
  };

  useLayoutEffect(() => {
    let isMounted = true;

    if(isMounted){

    navigation.setOptions({
      headerTitle: "Rooms",
      headerStyle: {
        backgroundColor: "#fff",
      },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
      headerRight: () => (
        <View style={styles.headerRightContainer}>
          <TouchableOpacity
            onPress={() => {
              Alert.prompt("Add a new Chat", "", (text) => {
                addChat(text);
              });
            }}
          >
            <EvilIcons name="pencil" size={30} color="black" />
          </TouchableOpacity>
            {auth?.currentUser?.displayName !== null ? (
              <TouchableOpacity style={styles.avatar}>
            <Text
              style={{
                color: "white",
                textTransform: "capitalize",
                fontWeight: "bold",
              }}
            >
            
              {auth?.currentUser?.displayName[0]}
              {/* {auth.currentUser.displayName !== '' ? auth?.currentUser?.displayName[0] : ''} */}
            </Text>
          </TouchableOpacity>
            ): null} 
          
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity style={styles.signoutContainer} onPress={signoutUser}>
          <AntDesign name="logout" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
    }

    return () => {
      isMounted = false;
    };
  }, [navigation]);

  

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView>
        
        {chats.map(({ id, data: { chatName } }) => (
          <TouchableOpacity
            key={id}
            onPress={() =>
              navigation.navigate("Chat", { chatId: id, chatName: chatName })
            }
            activeOpacity={0.5}
          >
            <CustomListItem id={id} chatName={chatName} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatar: {
    width: 35,
    height: 35,
    backgroundColor: "#0096FF",
    borderRadius: "50%",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },

  signoutContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerRightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
