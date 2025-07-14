import React, { useState } from "react";
import {
  Layout,
  Card,
  Text,
  Button,
  Input,
  Select,
  SelectItem,
  IndexPath,
  Divider,
} from "@ui-kitten/components";
import { SwapSummary } from "@/components/SwapSummary";
import { Chat } from "@/components/Chat";
import { Header } from "@/components/Header";

const SwapScreen: React.FC = () => {
  const [fromToken, setFromToken] = useState("");
  const [toToken, setToToken] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const tokens = ["ETH", "USDC", "DAI", "WBTC"];

  return (
    <Layout
      style={{
        flex: 1,
        padding: 10,
        borderRadius: 8,
        margin: 12,
        maxWidth: 1200,
        alignSelf: "center",
      }}
    >
      <Header />

      <Layout style={{ flexDirection: "row", flex: 1, gap: 16 }}>
        <Card style={{ flex: 1, maxWidth: 600, borderWidth:0 }}>
          <Chat />
        </Card>
        <Divider style={{ width: 1, height:'100%' }} />

        <Layout style={{}}>
          <SwapSummary />
        </Layout>

        {/* Right Panel - Chat */}
      </Layout>
    </Layout>
  );
};

export default SwapScreen;
