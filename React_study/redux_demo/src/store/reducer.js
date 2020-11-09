import {CHANGE_INPUT,ADD_LIST ,DELETE_ITEM,GET_LIST} from './actionTypes'

//默认数据
const defaultState = {
    inputValue : '',
    list:[]
} 

export default (state = defaultState,action)=>{  //就是一个方法函数

   if(action.type=== CHANGE_INPUT){
    let newState = JSON.parse(JSON.stringify(state)) //深度拷贝state
    newState.inputValue = action.value
    return newState
   }

   if(action.type=== ADD_LIST){
    let newState = JSON.parse(JSON.stringify(state)) //深度拷贝state
    newState.list.push(newState.inputValue)  //push新的内容到列表中去
    newState.inputValue = ''
    return newState
   }

   if(action.type=== DELETE_ITEM){
    let newState = JSON.parse(JSON.stringify(state)) //深度拷贝state
    newState.list.splice(action.index,1) 
    return newState
   }

   if(action.type=== GET_LIST){
    let newState = JSON.parse(JSON.stringify(state)) //深度拷贝state
    newState.list = action.data.data.list
    return newState
   }

    return state
}