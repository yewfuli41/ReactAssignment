import { View, Text, TouchableOpacity,ToastAndroid } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { styles } from './ChatDesign';
import React, { useState, useCallback, useEffect, useContext} from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DrawerActions, useNavigation } from "@react-navigation/native";
import SwipeableScreen from '../screens/SwipeNavigation';
import io from 'socket.io-client';
import { useUser } from '../context/UserContext';
import { ThemeContext } from '../context/ThemeContext';

/**main references:
 * 1. https://youtu.be/bGGeD5RkdzQ?si=-q6VQxjBIOb97BvO by Pradip Debnath 
 * 2. https://www.npmjs.com/package/react-native-gifted-chat 
 * 3. quick replies from useEffect: https://stackoverflow.com/questions/61891106/quick-replies-press-function-gifted-chat-react-native 
*/

const ChatScreen = () => {
    const { userData } = useUser(); 
    const username = userData?.name || "User"; 
    const navigation = useNavigation();
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);
    const { theme } = useContext(ThemeContext);
   
   console.log("username", username);
    useEffect(() => {
       const socket_1 = io('http://10.0.2.2:5001/chat' ,
          { transports: ['websocket'],
            reconnection: true
       });

       setSocket(socket_1);

       socket_1.on('connect', () => {
        socket_1.emit('join_chat', { username });
        ToastAndroid.show('Connected to server!', ToastAndroid.SHORT);
      });
    
       socket_1.on('new_message',(msg) =>{
        setMessages(prev => GiftedChat.append(prev,[{
            _id:new Date().getTime(),
            text:msg.message,
            createdAt:new Date(msg.timestamp),
            user: {
                _id: msg.sender === 'Pearly'? 2:3, // Pearly id is 2, other's is 3
                name: msg.sender,
            },

        }]));

       });

       //user joined
       socket_1.on('user_joined',(data) =>{
        setMessages(prev => GiftedChat.append(prev,[{
            _id: new Date().getTime(),
            text: `${data.username} joined the chat`,
            createdAt: new Date(),
            system: true,
        }]));
       });

       //inactive
       socket_1.on('inactive_warning',(data) =>{
        ToastAndroid.show(data.message, ToastAndroid.LONG);
       });
       //inactive disconnect
       socket_1.on('inactive_disconnect', (data) => {
        ToastAndroid.show(data.message, ToastAndroid.LONG);
    });

       // end chat
       socket_1.on('chat_ended',(data) =>{
        ToastAndroid.show(data.message, ToastAndroid.LONG);
       });

       // set very first message
    setMessages([{
     _id: 1,
     text: `Hi ${username}, How can I help you? `,
     createdAt: new Date().getTime(),
     user: {
         _id: 2,
         name: 'Pearly',
     },
    }]);
      
    return ()=>{
        if(socket_1){
            socket_1.emit('end_chat');
            socket_1.disconnect();
        }
    }

    }, [username])

 

      const pearlyReply = (messages=[])=>{
        if(messages.length > 0 && socket){
            socket.emit('new_message',{
                message: messages[0].text,
                sender: username,
                user:{
                    _id: 2,
                    name: 'Pearly',
                }
            });
        }
        setMessages(previousMessages => GiftedChat.append(previousMessages, [pearlyReply]));
        };


     const onSend = (messages = []) => {
        if (messages.length > 0 && socket) {
            socket.emit('new_message', {
                message: messages[0].text,
                sender: username,
            });
           
        }
    };
           




    const renderBubble = (props) => {
   
    
        return (
            <View>
                <Bubble
                    {...props}
                    wrapperStyle={{
                        right: { backgroundColor: '#15b5b0' },
                        left: { backgroundColor: 'rgba(123, 255, 255, 0.7)' },
                    }}
                />
            </View>
        );
    };


    return (
        <SwipeableScreen
        screenIndex={3} 
        renderContent={() => (
        <SafeAreaProvider>
            <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
                <View style={[styles.headerContainer, { flexDirection: "row" }]}> 
                     
                <View style={styles.container}>
                <View style={{flexDirection: 'row',  alignItems: 'center', justifyContent: 'center',  width: '100%', position: 'relative' }}>
                       <TouchableOpacity 
                            style={{  position: 'absolute', left: 16, alignSelf: 'center', marginSTop:10 }} 
                           onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                        <Ionicons name="menu" size={28} color="black" />
                        </TouchableOpacity><Text style={{ fontWeight: "bold", fontSize:24}}> Pearly Live Chat</Text>
                </View>
                </View>
                </View>

               
               
                <GiftedChat
                    messages={messages}
                    onSend={messages => onSend(messages)}
                  
                    alwaysShowSend
                    user={{
                        _id: 3,
                         name: username
                    }}
                    renderBubble={renderBubble}
                    renderAvatarOnTop
                    renderAvatar={(props) => (
                        <Ionicons name="person-circle-outline" size={40} color="#15b5b0" />
                    )}  
                />
            </View>
        </SafeAreaProvider>)}/>

    );
};

export default ChatScreen;


