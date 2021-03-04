import React, { Component } from "react";
import { TextInput, View, StyleSheet } from "react-native";
import TodoItem from "../models/TodoItem";
import { Ionicons } from "@expo/vector-icons";

interface IProps {
  addItem: (item: string) => void;
}
interface IState {
  itemName: string;
}
export default class AddItem extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.onChangeText = this.onChangeText.bind(this);
    this.submitItem = this.submitItem.bind(this);
    this.state = {
      itemName: "",
    };
  }

  render() {
    return (
      <View style={styles.todoItem}>
        <TextInput
          style={styles.name}
          onChangeText={(text) => this.onChangeText(text)}
          value={this.state.itemName}
        />
        <Ionicons
          style={styles.addButton}
          name="add"
          size={24}
          color="#277CB4"
          onPress={this.submitItem}
        />
      </View>
    );
  }

  onChangeText(text: string) {
    this.setState({
      itemName: text,
    });
  }

  submitItem(): void {
    this.props.addItem(this.state.itemName);
  }
}

const styles = StyleSheet.create({
  todoItem: {
    padding: 15,
    margin: 15,
    backgroundColor: "#f8f8f8",
    flexDirection: "row",
    flex: 1,
    borderWidth: 0.5,
    borderColor: "#59A1B4",
    borderRadius: 8,
  },
  name: {
    paddingLeft: 10,
    flex: 1,
    borderWidth: 0.5,
    borderColor: "#090A1A",
    borderRadius: 8,
    marginRight: 15,
  },
  addButton: {
    borderWidth: 0.5,
    borderColor: "#277CB4",
    borderRadius: 8,
    paddingHorizontal: 15,
  },
});
