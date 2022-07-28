import {
  Keyboard,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useLayoutEffect, useState, useRef, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAvoidingView, TouchableOpacity } from "react-native";
import CustomMessage from "../UI/CustomMessage";
import { collection, addDoc, getDocs,} from "firebase/firestore";
import auth, { db } from "../../Firebase";
import { updateDoc, serverTimestamp,orderBy } from "firebase/firestore";


const ChatScreen = ({ route, navigation }) => {
  const { chatId, chatName } = route.params;

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();

  const sendMessage = async() => {
    Keyboard.dismiss();
    // firebase.firestore.FieldValue.serverTimestamp()
    try {
        const docRef = await addDoc(collection(db, `Chats/${chatId}/messages`), {
            senderEmail : auth?.currentUser?.email,
            chatText : input,
            senderName : auth?.currentUser?.displayName,

        });
        const updateTimestamp = await updateDoc(docRef, {
            timestamp: serverTimestamp()
        });
        // console.log("Document written with ID: ", docRef.id);
        setInput('')
      } catch (e) {
        // console.error("Error adding document: ", e);
      }
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      title: chatName,
      headerTitleStyle: styles.title,
      headerBackTitle: "Chats",
    });
  }, []);
  const getMessages = (id) => {
    getDocs(collection(db, `Chats/${id}/messages`)).then(
      (snapshot) => 
      setMessages(snapshot.docs.map((doc) => doc.data()))
    );
  };
  useEffect(()=> {

    let isMounted = true;
        if(isMounted){
            getMessages(chatId);

        }    
        return () => {
        // 👇️ when component unmounts, set isMounted to false
        isMounted = false;
        };

  },[chatId,messages])
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <>
            <ScrollView
              ref={scrollRef}
              onContentSizeChange={() =>
                scrollRef.current.scrollToEnd({ animated: true })
              }
            >
              
              {messages.map((message,i) => (
              <CustomMessage 
              key={i} 
              isMymessage={message.senderEmail === auth?.currentUser?.email ? true : false} 
              msg={message.chatText}
              date={message.timestamp}
              sender={message.senderName}
              
              />

              ))}

            </ScrollView>
            <View style={styles.footer}>
              <TextInput
                placeholder="Type a message..."
                style={styles.textInput}
                value={input}
                onChangeText={setInput}
                onSubmitEditing={sendMessage}
              />

              <TouchableOpacity activeOpacity={0.5} onPress={sendMessage}>
                <Ionicons name="send" size={24} color="#2B68E6" />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
    
    
  },
  textInput: {
    flex: 1,
    bottom: 0,
    height: 40,
    marginRight: 15,
    borderColor: "transparent",
    backgroundColor: "#ECECEC",
    color: "grey",
    borderRadius: 30,
    paddingLeft: 10,
    fontSize: 17,
  },
});
