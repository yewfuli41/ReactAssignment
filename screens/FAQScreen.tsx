import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { DrawerActions, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../Types';
import style from './styleSheet';
import Ionicons from 'react-native-vector-icons/Ionicons';

type FAQItem = {
    question: string;
    answer: string;
};

type FAQScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, 'FAQ'>;
    route: RouteProp<RootStackParamList, 'FAQ'>;
};

//not sure if here need to implement a database or file to store the QnA or just hardcode
const FAQScreen = (props:any) => {
    const navigation = useNavigation();
    const { name, route} = props;
    const [expandedId, setExpandedId] = useState<number | null>(null);

    const faqData: FAQItem[] = [ // hard code
        {
            question: 'How do I book an appointment?',
            answer: 'You can book an appointment by selecting a preferred date and time.'
        },
        {
            question: 'What is your cancellation policy?',
            answer: 'You can cancel appointments up to 24 hours before the scheduled time.'
        }
    ];

    const toggleFAQ = (id: number) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <ScrollView style={style.editProfilecontainer}>

            <View style={{flexDirection:'row', flex:1  }}>
                           <TouchableOpacity 
                           style={{ marginLeft:0, alignSelf:'flex-start' }}
                               onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                                   <Ionicons name="menu" size={28} color="black" />
                       </TouchableOpacity> 
                       <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={{ fontWeight: "bold", fontSize:24, justifyContent:'center'}}>Frequently Asked Questions</Text>
                        </View>
                       </View>  

            {faqData.map((faq, index) => (
                <View key={index} style={style.faqItem}>
                    <TouchableOpacity
                        style={style.faqQuestion}
                        onPress={() => toggleFAQ(index)}
                    >
                        <Text style={style.questionText}>{faq.question}</Text>
                        <Text style={style.expandIcon}>
                            {expandedId === index ? '−' : '+'}
                        </Text>
                    </TouchableOpacity>

                    {expandedId === index && (
                        <View style={style.faqAnswer}>
                            <Text style={style.answerText}>{faq.answer}</Text>
                        </View>
                    )}
                </View>
            ))}
        </ScrollView>
    );
};


export default FAQScreen;
