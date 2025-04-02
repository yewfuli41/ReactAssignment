import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../Types';
import style from './styleSheet';

type FAQItem = {
    question: string;
    answer: string;
};

type FAQScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, 'FAQ'>;
    route: RouteProp<RootStackParamList, 'FAQ'>;
};

//not sure if here need to implement a database or file to store the QnA or just hardcode
const FAQScreen = ({navigation, route}: FAQScreenProps) => {
    const [expandedId, setExpandedId] = useState<number | null>(null);

    const faqData: FAQItem[] = [
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
            <Text style={style.title}>Frequently Asked Questions</Text>

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
