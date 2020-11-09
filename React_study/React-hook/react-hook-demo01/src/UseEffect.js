//useEffect代替常用生命周期函数(componentDidMount,componentDidUpdate)
import React, { useState , useEffect } from 'react';
function UseEffect(){
    const [ count , setCount ] = useState(0);
    useEffect(()=>{
        console.log(`useEffect=>You clicked ${count} times`)
    })


    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={()=>{setCount(count+1)}}>click me</button>
        </div>
    )
}
export default UseEffect;


// import React, { Component } from 'react';

// class UseEffect extends Component {
//     constructor(props) {
//         super(props);
//         this.state = { count:0 }
//     }
//     componentDidMount(){
//         console.log(`ComponentDidMount=>You clicked ${this.state.count} times`)
//     }
//     componentDidUpdate(){
//         console.log(`componentDidUpdate=>You clicked ${this.state.count} times`)
//     }
//     render() { 
//         return (
//         <div>
//             <p>You clicked {this.state.count} times</p>
//             <button onClick={this.addCount.bind(this)}>Chlick me</button>
//         </div>
//           );
//     }
//     addCount(){
//         this.setState({count:this.state.count+1})
//     }
// }
 
// export default UseEffect;