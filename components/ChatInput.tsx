import React, { useState } from 'react';
import { Icon, Layout, Input, Button } from '@ui-kitten/components';
interface ChatInputProps {
  onSend: (message: string) => void;
}

const SendIcon = (props: any) => (
  <Icon {...props} name='paper-plane-outline'/>
);

export const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Layout style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 8 }}>
      <Input
        style={{ flex: 1 }}
        placeholder="Type your message..."
        value={message}
        onChangeText={setMessage}
        // on={handleKeyPress}
        multiline
      />
      <Button
        accessoryLeft={SendIcon}
        onPress={handleSend}
        disabled={!message.trim()}
      />
    </Layout>
  );
};