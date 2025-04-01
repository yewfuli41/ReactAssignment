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
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Frequently Asked Questions</Text>

            {faqData.map((faq, index) => (
                <View key={index} style={styles.faqItem}>
                    <TouchableOpacity
                        style={styles.faqQuestion}
                        onPress={() => toggleFAQ(index)}
                    >
                        <Text style={styles.questionText}>{faq.question}</Text>
                        <Text style={styles.expandIcon}>
                            {expandedId === index ? '−' : '+'}
                        </Text>
                    </TouchableOpacity>

                    {expandedId === index && (
                        <View style={styles.faqAnswer}>
                            <Text style={styles.answerText}>{faq.answer}</Text>
                        </View>
                    )}
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#ffffff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    faqItem: {
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
    },
    faqQuestion: {
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    questionText: {
        fontSize: 16,
        fontWeight: '500',
        flex: 1,
    },
    expandIcon: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    faqAnswer: {
        padding: 15,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    answerText: {
        fontSize: 16,
    },
});

export default FAQScreen;
