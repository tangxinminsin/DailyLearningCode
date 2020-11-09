import React, { Component } from 'react';
import AppUI from './AppUI'
import store from './store/index'
import {getMyListAction,changeInputAction,addItemAction,deleteItemAction} from './store/actionCreator'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
    this.changeInputValue = this.changeInputValue.bind(this)
    this.storeChange = this.storeChange.bind(this)  //转变this指向
    this.add = this.add.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
    store.subscribe(this.storeChange) //订阅Redux的状态
  }

  render() {
    return (
      <AppUI
      inputValue={this.state.inputValue}
      changeInputValue={this.changeInputValue}
      add = {this.add}
      list = {this.state.list}
      deleteItem={this.deleteItem}
      >
      </AppUI>
    );
  }

  componentDidMount(){
    const action =getMyListAction()
    store.dispatch(action)



    // const action = getAppList()
    // store.dispatch(action)
}

  changeInputValue(e) {
    const action = changeInputAction(e.target.value)
    store.dispatch(action)
  }

  add() {
    const action = addItemAction()
    store.dispatch(action)
  }
  deleteItem(index) {

    const action = deleteItemAction(index)
    store.dispatch(action)
  }
  storeChange() {
    this.setState(store.getState())
  }
}

export default App;