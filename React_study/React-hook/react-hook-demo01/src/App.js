//hook写法
import React, { useState } from 'react';

function App(){
  let [ count, stateCount] = useState(0)
    return(
      <div>
        <p>you clicked {count} times</p>
        <button onClick={()=>{stateCount(count+1)}}>click</button>
      </div>
    );

}
export default App;

//原始写法
// import React, { Component } from 'react';
// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { count:0 }
//   }
//   render() { 
//     return(
//       <div>
//         <p>you clicked {this.state.count} times</p>
//         <button onClick={this.addtimes.bind(this)}>click</button>
//       </div>
//     );
//   }
//   addtimes(){
//     this.setState({count:this.state.count+1})
//   }
// }
 
// export default App;