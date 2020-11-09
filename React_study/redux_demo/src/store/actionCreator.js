import {CHANGE_INPUT,ADD_LIST ,DELETE_ITEM,GET_LIST,GET_MY_LIST} from './actionTypes'
import axios from 'axios'


export const changeInputAction = (value)=>({
    type:CHANGE_INPUT,
    value
})
export const addItemAction = ()=>({
    type:ADD_LIST,
})
export const deleteItemAction = (index)=>({
    type:DELETE_ITEM,
    index
})
export const getListAction = (data)=>({
    type:GET_LIST,
    data
})

export const getAppList = ()=>{
    return (dispatch)=>{
        axios.get('https://www.easy-mock.com/mock/5f22cf9d8e891b12a0ac55c6/react_test/list')
        .then((res)=>{
          const data = res.data
          const action = getListAction(data)
          dispatch(action)
        })
    }
}

export const getMyListAction = ()=>({
    type:GET_MY_LIST
})