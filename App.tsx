import "react-native-gesture-handler";

import React, { Component } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableHighlightBase,
  View,
} from "react-native";
import TodoItemComponent from "./src/components/TodoItem";
import Header from "./src/components/Header";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import TodoItem from "./src/models/TodoItem";
import TodoController from "./src/controllers/TodoController";
import AddItem from "./src/components/AddItem";

interface IProps {}

interface IState {
  tarefas: TodoItem[];
}

export default class App extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      tarefas: [],
    };
    this.changeStatus = this.changeStatus.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.findTarefaIndex = this.findTarefaIndex.bind(this);
    this.addItem = this.addItem.bind(this);
  }

  todoController: TodoController = new TodoController();

  componentDidMount() {
    this.todoController.getAll().then((response) => {
      this.setState({ tarefas: response.data });
    });
  }

  render() {
    return (
      <SafeAreaProvider>
        <SafeAreaView>
          <Header />
          <View style={styles.container}>
            <AddItem addItem={this.addItem} />
            <FlatList
              data={this.state.tarefas}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TodoItemComponent
                  changeStatus={this.changeStatus}
                  tarefa={item}
                  deleteItem={this.deleteItem}
                ></TodoItemComponent>
              )}
              extraData={this.state}
            ></FlatList>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  addItem(itemName: string) {
    if (itemName !== "") {
      this.todoController
        .addItem({ name: itemName, isComplete: false })
        .then((resp) => {
          let item: TodoItem = resp.data;
          this.setState({
            tarefas: [...this.state.tarefas, item],
          });
        });
    }
  }

  changeStatus(childItem: TodoItem) {
    let tarefas: TodoItem[] = this.state.tarefas;
    let index: number = this.findTarefaIndex(childItem);
    this.todoController.updateItem(childItem).then(
      () => {
        tarefas[index] = childItem;
        this.setState({
          tarefas: tarefas,
        });
      },
      (resp) => {
        console.error(resp);
      }
    );
  }

  deleteItem(item: TodoItem) {
    this.todoController.deleteItem(item.id).then(
      () => {
        let tarefas: TodoItem[] = this.state.tarefas;
        let index: number = this.findTarefaIndex(item);
        tarefas.splice(index, 1);
        this.setState({
          tarefas: tarefas,
        });
        console.log("Removido com sucesso!");
      },
      (err) => {
        console.error(err);
      }
    );
  }

  findTarefaIndex(item: TodoItem): number {
    return this.state.tarefas.findIndex(
      (stateItem) => stateItem.id === item.id
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
