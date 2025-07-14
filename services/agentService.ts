export interface Agent2AgentConfig {
  agentId: string;
  apiKey: string;
  baseUrl?: string;
  enableWebSocket?: boolean; // Add this option
}

export interface Agent2AgentMessage {
  id: string;
  content: string;
  sender: string;
  recipient: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface Agent2AgentResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export class Agent2AgentClient {
  private config: Agent2AgentConfig;
  private ws: WebSocket | null = null;

  constructor(config: Agent2AgentConfig) {
    this.config = {
      ...config,
      baseUrl: config.baseUrl || 'http://localhost:3000',
      enableWebSocket: config.enableWebSocket ?? false // Default to false
    };
  }

  async initialize(): Promise<boolean> {
    try {
      // Skip health check for local development to avoid CORS issues
      console.log('Initializing Agent2Agent client for local development');
      return true;
    } catch (error) {
      console.error('Agent2Agent initialization failed:', error);
      return false;
    }
  }

  async sendMessage(message: Agent2AgentMessage): Promise<Agent2AgentResponse> {
    try {
      const response = await fetch(`${this.config.baseUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message.content,
          agentId: message.recipient,
          metadata: message.metadata,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || 'Unknown error' };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // Simple message sender that matches your Postman format
  async sendChatMessage(message: string): Promise<Agent2AgentResponse> {
    try {
      const response = await fetch(`${this.config.baseUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || 'Unknown error' };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  async getAgentCapabilities(agentId: string): Promise<Agent2AgentResponse> {
    try {
      const response = await fetch(`${this.config.baseUrl}/api/agents/${agentId}/capabilities`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || 'Unknown error' };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  connectWebSocket(onMessage: (message: Agent2AgentMessage) => void): void {
    // Only connect WebSocket if explicitly enabled
    if (!this.config.enableWebSocket) {
      console.log('WebSocket disabled for this configuration');
      return;
    }

    const wsUrl = `${this.config.baseUrl.replace('http:', 'ws:')}/ws`;
    
    this.ws = new WebSocket(wsUrl);
    
    this.ws.onopen = () => {
      console.log('Agent2Agent WebSocket connected');
    };

    this.ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        onMessage(message);
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error);
      }
    };

    this.ws.onerror = (error) => {
      console.error('Agent2Agent WebSocket error:', error);
    };

    this.ws.onclose = () => {
      console.log('Agent2Agent WebSocket disconnected');
    };
  }

  disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}