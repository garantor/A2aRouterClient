import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Agent2AgentClient, Agent2AgentConfig, Agent2AgentMessage } from  '@/services/agentService'

interface Agent2AgentContextType {
  client: Agent2AgentClient | null;
  isConnected: boolean;
  availableAgents: string[];
  sendToAgent: (agentId: string, message: string) => Promise<boolean>;
  initialize: (config: Agent2AgentConfig) => Promise<boolean>;
}

const Agent2AgentContext = createContext<Agent2AgentContextType | undefined>(undefined);

interface Agent2AgentProviderProps {
  children: ReactNode;
  onMessage?: (message: Agent2AgentMessage) => void;
}
export const Agent2AgentProvider: React.FC<Agent2AgentProviderProps> = ({ 
  children, 
  onMessage 
}) => {
  const [client, setClient] = useState<Agent2AgentClient | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [availableAgents, setAvailableAgents] = useState<string[]>([]);

  const initialize = async (config: Agent2AgentConfig): Promise<boolean> => {
    try {
      const newClient = new Agent2AgentClient(config);
      const success = await newClient.initialize();
      
      if (success) {
        setClient(newClient);
        setIsConnected(true);
        
        // Only connect WebSocket if enabled in config
        if (config.enableWebSocket) {
          newClient.connectWebSocket((message) => {
            onMessage?.(message);
          });
        }

        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to initialize Agent2Agent:', error);
      return false;
    }
  };

  const sendToAgent = async (agentId: string, message: string): Promise<boolean> => {
    if (!client) return false;

    const agent2AgentMessage: Agent2AgentMessage = {
      id: Date.now().toString(),
      content: message,
      sender: 'user',
      recipient: agentId,
      timestamp: new Date(),
    };

    const response = await client.sendMessage(agent2AgentMessage);
    return response.success;
  };

  useEffect(() => {
    return () => {
      client?.disconnect();
    };
  }, [client]);

  const value: Agent2AgentContextType = {
    client,
    isConnected,
    availableAgents,
    sendToAgent,
    initialize,
  };

  return (
    <Agent2AgentContext.Provider value={value}>
      {children}
    </Agent2AgentContext.Provider>
  );
};

export const useAgent2Agent = (): Agent2AgentContextType => {
  const context = useContext(Agent2AgentContext);
  if (!context) {
    throw new Error('useAgent2Agent must be used within an Agent2AgentProvider');
  }
  return context;
};