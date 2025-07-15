import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ScrollView } from 'react-native';
import { ChatInput } from './ChatInput';
import { Layout, Text, Button, Select, SelectItem, IndexPath } from '@ui-kitten/components';
import { useAgent2Agent } from '@/context/agentContext';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai' | 'agent';
  timestamp: Date;
  agentId?: string;
}

export const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I can help you with token swaps and routing. You can also connect to other AI agents for specialized assistance.',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);

  const [selectedAgentIndex, setSelectedAgentIndex] = useState<IndexPath>(new IndexPath(0));
  const [isAgent2AgentMode, setIsAgent2AgentMode] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  
  const { client, isConnected, sendToAgent, initialize } = useAgent2Agent();
    const messagesEndRef = useRef<HTMLDivElement | null>(null);


  // Sample agent IDs - replace with actual available agents
  const availableAgents = [
    'routing-specialist',
    'defi-expert', 
    'price-analyzer',
    'risk-assessor'
  ];

  useEffect(() => {
    // Only initialize once
    if (!isInitialized) {
      const initializeClient = async () => {
        const config = {
          agentId: 'your-agent-id',
          apiKey: process.env.EXPO_PUBLIC_GEMINEI_API_KEY || 'your-api-key',
          baseUrl: 'http://localhost:3000',
          enableWebSocket: false
        };
        
        const success = await initialize(config);
        console.log('Agent2Agent initialized:', success);
        setIsInitialized(true);
      };

      initializeClient();
    }
  }, [isInitialized, initialize]);

    useEffect(() => {
    // Scroll to the bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);



  const handleSendMessage = async (text: string) => {
    console.log('Sending message:', text);
    
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, newMessage]);

    console.log('isagent2AgentMode:', isAgent2AgentMode, 'isConnected:', isConnected, 'client:', client);
    
    if (isAgent2AgentMode && isConnected && client) {
      console.log('Sending to Agent2Agent API...');
      
      // Send message using the simple chat API format
      const response = await client.sendChatMessage(text);
      
      console.log('API Response:', response);
      
      if (response.success) {
        const agentResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: response.data?.response || response.data?.message || response.data || 'Response received',
          sender: 'agent',
          timestamp: new Date(),
          agentId: availableAgents[selectedAgentIndex.row],
        };
        setMessages(prev => [...prev, agentResponse]);
      } else {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: `Error: ${response.error}`,
          sender: 'ai',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } else {
      console.log('Using regular AI response (Agent2Agent mode disabled)');
      // Regular AI response
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: 'I understand you want to help with that. Let me analyze the best routing options for you.',
          sender: 'ai',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };
  const handleAgentMessage = (agentMessage: any) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text: agentMessage.content,
      sender: 'agent',
      timestamp: new Date(),
      agentId: agentMessage.sender,
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const getMessageBackgroundColor = (message: Message) => {
    switch (message.sender) {
      case 'user':
        return '#3366FF';
      case 'agent':
        return '#00E096';
      default:
        return '#F7F9FC';
    }
  };

return (
    <Layout style={{ flex: 1, padding: 0, borderRadius: 8, flexDirection: 'column', }}>
    <Text category='h6' style={{ margin: 16, marginBottom: 0 }}>AI Assistant</Text>
    
    {/* Agent2Agent Controls */}
    <Layout style={{ marginBottom: 16, padding: 12, backgroundColor: '#F7F9FC', borderRadius: 8 }}>
      <Text category='s1' style={{ marginBottom: 8 }}>
        Agent2Agent: {isConnected ? '🟢 Connected' : '🔴 Disconnected'}
      </Text>
      <Text
        category='label'
        style={{
          marginBottom: 8,
          color: isAgent2AgentMode ? '#00C48C' : '#FF3D71',
          fontWeight: 'bold',
          fontSize: 15,
          letterSpacing: 1,
        }}
      >
        Agent Mode ON
      </Text>
      {/* <Text category='c1' appearance='hint'>
        Using agent: <Text category='c1'>routing-specialist</Text>
      </Text> */}
    </Layout>

   <ScrollView
        style={{ flex: 1, margin: 16, marginBottom: 0 }}
        contentContainerStyle={{ paddingBottom: 16 }}
        keyboardShouldPersistTaps="handled"
      >

  {messages.map((message) => {
    const isUser = message.sender === 'user';
    const isAgent = message.sender === 'agent' || message.sender === 'ai';
    const avatarUrl = isUser
      ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuClvXfuTyuKQtkPFLejFpmKenH89OKxlbOkUKV4fKeXHv0Uepnhr7m1rOJU1xjZH3nTcVw4rnHLveT7Xj2hQK99dtuNHY2A9W9jdZvQ_8vPExBmuStDw9LcJZ91pCmQXU9E5OEDefNOzexaWzoJghLFRi2Odi11bSFGrc28xnwXNhjcKIJz1t_fvgzdGqzsdPkSVhZBx7pr9t-VxoRjLYdvBw983FP9BQRuRe7UaEn-aaMNREFV6NcvBzw9YIS_8kQdYIm186ZGiyKG'
      : 'https://lh3.googleusercontent.com/aida-public/AB6AXuDg1L_3aOJYggDYTDuG2-ldEtClu1fDcL6t2SaCDjrGyG59rzir7T888Gc0pxbZp3wkcRjlz-Nr5-_O3VdSlA-qP_kA5bX_RjOdJRTPpwzu3nBznrxL1N_JbSLwSRwi3jlfH862eOzlhdtogvBPSiV4Oq1_22f8UmCLcRQoT8CPQ4QciKb8LkULgUG9fCn9lPMrbil-3pwLv4MKRBIEysfMzjSmQfi6WbdY_EYhL3a1xkwdc6MBbUBk0cN10X5cPKvpUXK_Vqgcvgpd';

    return (
      <Layout
        key={message.id}
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          gap: 12,
          padding: 16,
          justifyContent: isUser ? 'flex-end' : 'flex-start',
        }}
      >
        {!isUser && (
          <Layout
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: '#eee',
              backgroundImage: `url(${avatarUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              marginRight: 8,
            }}
          >
            <img
              src={avatarUrl}
              alt="avatar"
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                objectFit: 'cover',
              }}
            />
          </Layout>
        )}
        <Layout
          style={{
            flex: 1,
            flexDirection: 'column',
            gap: 4,
            alignItems: isUser ? 'flex-end' : 'flex-start',
          }}
        >
          <Text
            style={{
              color: '#51946b',
              fontSize: 13,
              maxWidth: 360,
              textAlign: isUser ? 'right' : 'left',
            }}
          >
            {isUser ? 'User' : message.agentId || 'CryptoSwap AI'}
          </Text>
          <Text
            style={{
              fontSize: 16,
              backgroundColor: isUser ? '#39e079' : '#e8f2ec',
              color: '#0e1a13',
              borderRadius: 16,
              paddingVertical: 12,
              paddingHorizontal: 16,
              maxWidth: 360,
            }}
          >
            {message.text}
          </Text>
        </Layout>
        {isUser && (
          <Layout
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: '#eee',
              marginLeft: 8,
            }}
          >
            <img
              src={avatarUrl}
              alt="avatar"
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                objectFit: 'cover',
              }}
            />
          </Layout>
        )}
      </Layout>
    );
  })}

   <div ref={messagesEndRef} />
</ScrollView>
    
    <Layout style={{ padding: 16,  }}>
      <ChatInput onSend={handleSendMessage} />
    </Layout>
  </Layout>
);
}