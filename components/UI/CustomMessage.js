import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CustomMessage = ({isMymessage , msg, date, sender}) => {
  return (
    <View style={!isMymessage ? styles.container : styles.myContainer}>
        <View style={!isMymessage ? styles.messageContainer : styles.myMessageContaier}>
        
            <View style={!isMymessage ? styles.avatar : styles.myAvatar}>
              <Text style={!isMymessage ? { color : 'white'} :''}>{sender[0]}</Text>
            </View>

            <View style={styles.rightText}>
                <View style={!isMymessage ? styles.message : styles.myMessage}>
                <Text style={!isMymessage ? styles.myMessageText : styles.messageText}>{msg}</Text>
                </View>
                <Text style={{
                  marginTop : 5,
                  color : 'gray',
                  textAlign : 'center'
                  }}>{
                    new Date(
                    date?.toDate()
                    ).toUTCString()
                }</Text>
            </View>
        </View>        

    </View>
  )
}

export default CustomMessage

const styles = StyleSheet.create({
    container : {
        width : '100%',
        marginVertical : 10,
        paddingLeft : 10
        
    },
    myContainer : {
        width : '100%',
        marginVertical : 10,
        paddingRight : 10,
        alignItems : 'flex-end'
    },
    messageContainer : {
        width : '60%',
        flexDirection : 'row',
        paddingVertical : 10,
        alignItems : 'flex-end',
        
        
    },
    myMessageContaier : {
        width : '60%',
        flexDirection : 'row-reverse',
        paddingVertical : 10,
        alignItems : 'flex-end',
        
    },

    avatar: {
        width: 35,
        height: 35,
        backgroundColor: "#0096FF",
        borderRadius: "50%",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
      },
      myAvatar : {
        width: 35,
        height: 35,
        backgroundColor: "#ECECEC",
        borderRadius: "50%",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 10,
      },
      
      rightText : {
        flex : 1
      },
      message : {
        backgroundColor : '#0096FF',
        paddingVertical : 20,
        paddingHorizontal : 10,
        width : '100%',
        borderTopLeftRadius : 10,
        borderTopRightRadius : 10,
        borderBottomRightRadius : 10,
        
        
      },
      myMessage : {
        backgroundColor : '#ECECEC',
        paddingVertical : 20,
        paddingHorizontal : 10,
        width : '100%',
        fontSize : 17,eftRadius : 10,
        borderTopRightRadius : 10,
        borderBottomLeftRadius : 10,
      },
      messageText : {
        fontSize : 17,
        
      },
      myMessageText : {
        fontSize : 17,
        color : '#fff'
      },
      
})