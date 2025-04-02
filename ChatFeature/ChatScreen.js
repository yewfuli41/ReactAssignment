import { View, Text, TouchableNativeFeedback } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { styles } from './ChatDesign';
import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QuickReplies } from 'react-native-gifted-chat/lib/QuickReplies';
import { useRoute } from '@react-navigation/native';
import ChatBotOpts from './ChatBotOpts.json';

/**main references:
 * 1. https://youtu.be/bGGeD5RkdzQ?si=-q6VQxjBIOb97BvO by Pradip Debnath 
 * 2. https://www.npmjs.com/package/react-native-gifted-chat 
 * 3. quick replies from useEffect: https://stackoverflow.com/questions/61891106/quick-replies-press-function-gifted-chat-react-native 
*/

const ChatScreen = () => {
    const route = useRoute();
    const { name } = route.params;

    const [messages, setMessages] = useState([]);
    const [opt, setOptions] = useState(ChatBotOpts);
   
    useEffect(() => {
        setMessages([
            // one {} in blue means 1 reply/send
            { //  1st send
                _id: 1, 
                text: `Hey ${name} 😃 I am Pearly Bot.`, // greet msg
                createdAt: new Date(), // date of chat
                // by who: by user id 2 with  name Pearly Bot
                user: {  
                    _id: 2, 
                    name: 'Pearly Bot',
                },
            },

        ])
    }, [])

    /**Use call back because: 
     * no need recreate function everytime component re-render, if yes then performance drop
    */
    // pass msg as an array
    const onSend = useCallback((messages = []) => {
        const selectedMessage = messages[0];  // read 1st msg
    
        // check the selectedMessage is from the quickReply or not
        if (selectedMessage.quickReply) {
            const selectedOption = options
                .flatMap(opt => opt.subOptions || [])  // get sub-options
                .find(subOpt => subOpt.id === selectedMessage.quickReply.value);  // find selected one
    
            // selected option is found, append it as a bot response else just add it into chat
            if (selectedOption) {
                setMessages(previousMessages =>
                    GiftedChat.append(previousMessages, [
                        {
                            _id: new Date().getTime(),
                            text: selectedOption.text,
                            createdAt: new Date(),
                            user: {
                                _id: 2, // Bot's ID
                                name: 'Pearly Bot',
                            },
                        },
                    ])
                );
            }
        } else {
            setMessages(previousMessages =>
                GiftedChat.append(previousMessages, messages)
            );
        }
    }, []);  
    const renderBubble = (props) => {
        const { currentMessage } = props;
    
        return (
            <View>
                <Bubble
                    {...props}
                    wrapperStyle={{
                        right: { backgroundColor: '#15b5b0' },
                        left: { backgroundColor: 'rgba(123, 255, 255, 0.7)' },
                    }}
                />
    
                
                {currentMessage.quickReplies && (
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 5 }}>
                        {currentMessage.quickReplies.values.map((option, index) => (
                            <TouchableOpacity 
                                key={index}
                                style={styles.optionsContainer} 
                                onPress={() => handleQuickReply(option.value)}
                            >
                                <Text style={styles.optionText}>{option.title}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </View>
        );
    };

    const handleQuickReply = (value) => {
        const selectedOption = opt.flatMap(opt => opt.subOptions || []).find(subOpt => subOpt.id === value);
    
        if (selectedOption) {
            setMessages(previousMessages =>
                GiftedChat.append(previousMessages, [
                    {
                        _id: new Date().getTime(),
                        text: selectedOption.text,
                        createdAt: new Date(),
                        user: {
                            _id: 2, // Bot's ID
                            name: 'Pearly Bot',
                        },
                    },
                ])
            );
        }
    };

    return (
        <SafeAreaProvider>
            <View style={styles.container}>
                <View style={styles.headerContainer}> 
                <Text style={styles.header}>Pearly Bot</Text>
                </View>
               
                <GiftedChat
                    messages={messages}
                    onSend={messages => onSend(messages)}
                    alwaysShowSend
                    user={{
                        _id: 1,
                    }}
                    renderBubble={renderBubble}
                    renderAvatarOnTop
                    renderAvatar={(props) => (
                        <Ionicons name="person-circle-outline" size={40} color="#15b5b0" />
                    )}  
                />
            </View>
        </SafeAreaProvider>

    );
};

export default ChatScreen;


