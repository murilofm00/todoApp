import React, { Component } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import TodoItem from "../models/TodoItem";
import { AntDesign } from "@expo/vector-icons";

interface IProps {
  tarefa: TodoItem;
  changeStatus?: (item: TodoItem) => void;
  deleteItem?: (item: TodoItem) => void;
}
interface IState {
  tarefa?: TodoItem;
}
export default class TodoItemComponent extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.changeStatus = this.changeStatus.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  render() {
    return (
      <View style={styles.todoItem}>
        <Switch
          value={this.props.tarefa.isComplete}
          onValueChange={this.changeStatus}
        ></Switch>
        <Text style={styles.description}>{this.props.tarefa.name}</Text>
        <AntDesign
          name="minuscircleo"
          size={24}
          color="black"
          onPress={this.deleteItem}
        />
      </View>
    );
  }

  changeStatus(value: any) {
    if (this.props.changeStatus) {
      this.props.changeStatus({
        ...this.props.tarefa,
        isComplete: value,
      });
    }
  }

  deleteItem() {
    if (this.props.deleteItem) this.props.deleteItem(this.props.tarefa);
  }
}

const styles = StyleSheet.create({
  todoItem: {
    padding: 15,
    margin: 3,
    backgroundColor: "#f8f8f8",
    borderColor: "#eee",
    flexDirection: "row",
    flex: 1,
  },
  description: {
    paddingLeft: 10,
    flex: 1,
  },
});
