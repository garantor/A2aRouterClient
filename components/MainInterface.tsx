import React, { useState } from 'react';
import { Layout, Card, Text, Button, Input, Select, SelectItem } from '@ui-kitten/components';
import { SwapSummary } from './SwapSummary';
import { Chat } from './Chat';

export const MainInterface: React.FC = () => {
  const [fromToken, setFromToken] = useState('');
  const [toToken, setToToken] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const tokens = ['ETH', 'USDC', 'DAI', 'WBTC'];

  return (
    <Layout style={{ flex: 1 }}>
      <Layout style={{ flexDirection: 'row', flex: 1, gap: 16 }}>
        {/* Left Panel - Swap Interface */}
        <Card style={{ flex: 1 }}>
          <Text category='h5' style={{ marginBottom: 16 }}>Token Swap</Text>
          
          <Layout style={{ marginBottom: 16 }}>
            <Text category='label' style={{ marginBottom: 8 }}>From Token</Text>
            <Select
              value={tokens[selectedIndex]}
              onSelect={index => setSelectedIndex(index as any)}
            >
              {tokens.map((token, index) => (
                <SelectItem key={index} title={token} />
              ))}
            </Select>
          </Layout>

          <Layout style={{ marginBottom: 16 }}>
            <Text category='label' style={{ marginBottom: 8 }}>To Token</Text>
            <Select
              value={toToken}
              onSelect={index => setToToken(tokens[index as any])}
            >
              {tokens.map((token, index) => (
                <SelectItem key={index} title={token} />
              ))}
            </Select>
          </Layout>

          <Layout style={{ marginBottom: 16 }}>
            <Text category='label' style={{ marginBottom: 8 }}>Amount</Text>
            <Input
              placeholder="Enter amount"
              value={amount}
              onChangeText={setAmount}
            />
          </Layout>

          <Button onPress={() => console.log('Execute swap')}>
            Execute Swap
          </Button>

          <Layout style={{ marginTop: 24 }}>
            <SwapSummary />
          </Layout>
        </Card>

        {/* Right Panel - Chat */}
        <Card style={{ flex: 1 }}>
          <Chat />
        </Card>
      </Layout>
    </Layout>
  );
};