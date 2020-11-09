import React, { useReducer } from 'react';

function UseRuducer(){
  let [ count, dispatch] = useReducer((state,action)=>{
          switch(action) {
        case 'add':
            return state + 1;
        case 'sub':
            return state - 1;
        default: 
            return state;
    }
  },0)
    return(
      <div>
        <p>you clicked {count} times</p>
        <button onClick={()=>{dispatch('add')}}>Increamet</button>
        <button onClick={()=>{dispatch('sub')}}>Decreamet</button>
      </div>
    );

}
export default UseRuducer;



//JS  Reducer
// function countReducer(state, action) {
//     switch(action.type) {
//         case 'add':
//             return state + 1;
//         case 'sub':
//             return state - 1;
//         default: 
//             return state;
//     }
// }