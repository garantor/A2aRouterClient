import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { ChatInput } from './ChatInput';
import { Layout, Text } from '@ui-kitten/components';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I can help you with token swaps and routing. What would you like to do?',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);

  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: 'I understand you want to help with that. Let me analyze the best routing options for you.',
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <Layout style={{ flex: 1, padding: 16,  borderRadius: 8 }}>
      <Text category='h6' style={{ marginBottom: 16 }}>AI Assistant</Text>
      
      <ScrollView style={{ flex: 1, marginBottom: 16 }}>
        {messages.map((message) => (
          <Layout
            key={message.id}
            style={{
              alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
              backgroundColor: message.sender === 'user' ? '#3366FF' : '#F7F9FC',
              padding: 12,
              borderRadius: 12,
              marginBottom: 8,
              maxWidth: '80%',
            }}
          >
            <Text
              style={{
                color: message.sender === 'user' ? 'white' : 'black',
              }}
            >
              {message.text}
            </Text>
          </Layout>
        ))}
      </ScrollView>
      
      <ChatInput onSend={handleSendMessage} />
    </Layout>
  );
};