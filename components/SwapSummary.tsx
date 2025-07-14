import { Button, Card, Divider, Layout, Text } from "@ui-kitten/components";
import React from "react";
import { StyleSheet, View } from "react-native";

export const SwapSummary: React.FC = () => {
  const swapDetails = [
    { label: "Source Chain", value: "Ethereum" },
    { label: "Destination Chain", value: "Ethereum" },
    { label: "Input Token", value: "ETH" },
    { label: "Output Token", value: "USDC" },
    { label: "Amount", value: "1 ETH" },
    { label: "Estimated Gas Fee", value: "0.01 ETH" },
    { label: "Slippage", value: "0.5%" },
  ];

  return (
    <Card style={styles.container}>
      {/* Header */}
      <Text category="h5" style={styles.title}>
        Swap Summary
      </Text>

      {/* Swap Details */}
      <Layout style={styles.detailsContainer}>
        {swapDetails.map((detail, index) => (
          <View key={index}>
            <Layout style={styles.detailRow}>
              <Text category="s1" style={styles.labelText}>
                {detail.label}
              </Text>
              <Text category="s1" style={styles.valueText}>
                {detail.value}
              </Text>
            </Layout>
            {index < swapDetails.length - 1 && (
              <Divider style={styles.divider} />
            )}
          </View>
        ))}
      </Layout>

      {/* Swap Status Section */}
      <Layout style={styles.statusContainer}>
        <Layout style={styles.statusHeader}>
          <Text category="s1" style={styles.statusTitle}>
            Swap Status
          </Text>
        </Layout>

        {/* Progress Bar */}
        <Layout style={styles.progressContainer}>
          <View style={styles.progressBackground}>
            <View style={[styles.progressFill, { width: "50%" }]} />
          </View>
        </Layout>

        <Text category="s2" style={styles.statusText}>
          In Progress
        </Text>
      </Layout>

      {/* Confirm Button */}
      <Layout style={styles.buttonContainer}>
        <Button style={styles.confirmButton} status="success" size="medium">
          Confirm Swap
        </Button>
      </Layout>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 360,
    margin: 0,
    borderWidth:0
  },
  title: {
    marginBottom: 16,
    fontWeight: "bold",
    paddingHorizontal: 4,
  },
  detailsContainer: {
    paddingHorizontal: 4,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  labelText: {
    // color: "#51946b",
    fontSize: 14,
  },
  valueText: {
    color: "#0e1a13",
    fontSize: 14,
  },
  divider: {
    backgroundColor: "#d1e6d9",
    height: 1,
  },
  statusContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  statusHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statusTitle: {
    color: "#0e1a13",
    fontSize: 16,
    fontWeight: "500",
  },
  progressContainer: {
    width: "100%",
  },
  progressBackground: {
    height: 8,
    backgroundColor: "#d1e6d9",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#39e079",
    borderRadius: 4,
  },
  statusText: {
    color: "#51946b",
    fontSize: 14,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  confirmButton: {
    backgroundColor: "#39e079",
    borderColor: "#39e079",
    borderRadius: 20,
    height: 40,
  },
});
