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
        <Card style={{ flex: 1,  borderWidth:0 }}>
          <Chat />
        </Card>
        <Divider style={{ width: 1, height:'100%' }} />

        <Layout style={{}}>
          <SwapSummary />
        </Layout>

      </Layout>
    </Layout>
  );
};

export default SwapScreen;
