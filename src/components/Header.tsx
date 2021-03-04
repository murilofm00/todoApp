import React, { Component } from "react";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet, Switch, Text } from "react-native";

export default class Header extends Component {
  render() {
    return (
      <View style={styles.header}>
        <StatusBar
          style="auto"
          backgroundColor={styles.header.backgroundColor}
        />
        <Text style={styles.titulo}>Lista de Tarefas</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    paddingBottom: 20,
    alignItems: "center",
    backgroundColor: "#277CB4",
  },
  titulo: {
    fontSize: 25,
    padding: 4,
    color: "#fff",
  },
});
