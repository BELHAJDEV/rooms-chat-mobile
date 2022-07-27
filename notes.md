const signout = ()=>{
    signOut(auth)
    .then(()=> console.log("Sign-out successful."))
    .catch(err => console.log(err))
  }

  <TouchableOpacity key={id}  
        onPress={()=> navigation.navigate('Chat',{
            chatId : id
        })}>
        <CustomListItem id={id} chatName={chatName} />
        </TouchableOpacity>