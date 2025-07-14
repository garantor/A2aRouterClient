import { Button, Icon, Text } from "@ui-kitten/components";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

const LogoIcon = () => (
  <Icon name="globe-outline" fill="#39E079" style={styles.logoIcon} />
);

const QuestionIcon = () => (
  <Icon
    name="question-mark-circle-outline"
    fill="#0e1a13"
    style={styles.questionIcon}
  />
);

const NavLink = ({
  title,
  isActive = false,
}: {
  title: string;
  isActive?: boolean;
}) => (
  <TouchableOpacity>
    <Text style={[styles.navLink, isActive && styles.activeNavLink]}>
      {title}
    </Text>
  </TouchableOpacity>
);

export const Header = () => {
  return (
    <View style={styles.container}>
      {/* Left side - Logo and title */}
      <View style={styles.leftSection}>
        {/* <LogoIcon /> */}
        <Text style={styles.title}>Router - AI</Text>
      </View>

      {/* Right side - Navigation and buttons */}
      <View style={styles.rightSection}>
        {/* Navigation links */}
        <View style={styles.navContainer}>
          {/* <NavLink title="Home" /> */}
          {/* <NavLink title="Swap" isActive /> */}
          {/* <NavLink title="Pool" />
          <NavLink title="Vote" />
          <NavLink title="Docs" /> */}
        </View>

        {/* Action buttons */}
        <View style={styles.buttonContainer}>
          <Button
            style={styles.connectButton}
            size="small"
            status="basic"
            onPress={() => {}}
          >
            Connect Wallet
          </Button>

          <Button
            style={styles.helpButton}
            size="small"
            status="basic"
            accessoryLeft={QuestionIcon}
            onPress={() => {}}
          />
        </View>

        {/* Profile avatar */}
        <View style={styles.avatar}>
          <Image
            source={{
              uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjbwHnH3VrhfJGO6p3I_z4kwxx9qLMFrHriMy5dBCCfIY0fwEKTCsfuQINIUfrzOZNJqusRl0MKFQNpyhQwkAUSKCN7P4OvQ-gTOYXKsR4P7Eq_EGEMN-4r6GHGChAP8aG-FIGPnKYDV3A5_hezHNpyoaSYqztxp74DOT1n2pcrpvCIn2WriODG3ItolDenJ4EAAtZJS2Gr6BWOunD-FfjhKwwxwyQEfHpMGJliZxmgE6KV55w0gY8434v6JawvhsoVlRL648LYHuL",
            }}
            style={styles.avatarImage}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 40,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e8f2ec",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  logoIcon: {
    width: 16,
    height: 16,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#0e1a13",
    letterSpacing: -0.015,
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
    gap: 32,
  },
  navContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 36,
  },
  navLink: {
    fontSize: 14,
    fontWeight: "500",
    color: "#0e1a13",
  },
  activeNavLink: {
    color: "#39E079",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 8,
  },
  connectButton: {
    backgroundColor: "#e8f2ec",
    borderColor: "#e8f2ec",
    borderRadius: 20,
    paddingHorizontal: 16,
    height: 40,
  },
  helpButton: {
    backgroundColor: "#e8f2ec",
    borderColor: "#e8f2ec",
    borderRadius: 20,
    width: 40,
    height: 40,
    paddingHorizontal: 0,
    minWidth: 40,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0e1a13",
    letterSpacing: 0.015,
  },
  questionIcon: {
    width: 20,
    height: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
});
