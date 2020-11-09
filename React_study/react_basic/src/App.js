import React, {Component,Fragment} from 'react'
import './style.css'
import Children from './children'

class App extends Component{
    constructor(props){
        super(props)
        this.state={
            inputValue:'',
            list:['头部按摩','精油推背']
        }
    };


    render(){
        return  (
            <Fragment>
                <div>
                    <label htmlFor='input'>加入服务：</label>
                    {/* bind绑定this */}
                    <input id='input' className="input" value={this.state.inputValue} onChange={this.inputChange.bind(this)} /> 
                    <button onClick={this.add.bind(this)}> 增加服务 </button>
                </div>
                <ul>
                    {
                        this.state.list.map((item,index)=>{
                            return (
                                {/*
                                <li 
                                key={index+item}
                                onClick={this.delete.bind(this,index)}
                                dangerouslySetInnerHTML={{__html:item}}
                                >
                                   // { {item} }
                                  
                                </li>  
                                */
                               },
                                   <Children 
                                
                                   content={item} 
                                   key={index+item}  
                                   index={index}
                                   deleteItem={this.delete.bind(this)}
                                   />
                        
                            )
                        })
                        
                    }
                </ul> 
            </Fragment>
        )
    };
    
    inputChange(e){
        // this.state.inputValue = e.target.value
        this.setState({
            inputValue : e.target.value
        })
    }
    add(e){
        this.setState({
            list:[...this.state.list,this.state.inputValue]
        })
    }
    delete(index){
        let list = this.state.list
        list.splice(index,1)
        this.setState({
            list:list
        })
    }
}
export default App;