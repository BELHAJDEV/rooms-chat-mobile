import { Alert, StyleSheet, Text, View } from 'react-native'
import {useState, useEffect} from 'react';
import { ListItem ,Avatar } from "@rneui/themed";

import { collection, getDocs,} from "firebase/firestore";
import auth,{ db } from "../../Firebase";

const CustomListItem = ({id , chatName}) => {
    const [messages , setMessages] = useState([]);

    const getMessages = (id) => {
        
        getDocs(collection(db, `Chats/${id}/messages`))
        .then(
          (snapshot) => 
          setMessages(snapshot.docs.map((doc) => doc.data()))
        ).catch(error => Alert.alert(error.message));
      };
      useEffect(()=> {
        let isMounted = true;
        if(isMounted){
            getMessages(id);

        }    
        return () => {
        // 👇️ when component unmounts, set isMounted to false
        isMounted = false;
        };
      },[id,messages]);

  return (
    
    <ListItem bottomDivider>
        <Avatar rounded source={{
            uri : 
            'https://thumbs.dreamstime.com/b/default-avatar-profile-flat-icon-social-media-user-vector-portrait-unknown-human-image-default-avatar-profile-flat-icon-184330869.jpg'}} 
        />
        <ListItem.Content>
            <ListItem.Title style={{fontWeight : 'bold'}}>
            {chatName}
            </ListItem.Title>
            {messages.length !== 0 && <ListItem.Subtitle 
            numberOfLines={1}
            ellipsizeMode='tail'
            >
            { messages.length !== 0 
            && messages?.[messages.length-1].senderName}
             :
            {messages.length !== 0 && messages?.[0].chatText}
            </ListItem.Subtitle>}
            
        </ListItem.Content>
    </ListItem>
    
  )
}

export default CustomListItem

const styles = StyleSheet.create({})