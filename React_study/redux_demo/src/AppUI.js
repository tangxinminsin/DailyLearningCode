import React, { Component } from 'react';
import 'antd/dist/antd.css'
import { Input, Button, List } from 'antd'

class AppUI extends Component {
    render() { 
        return (  
            <div style={{ margin: '10px' }}>
        <div>
          <Input
            value={this.props.inputValue}
            style={{ width: '250px', marginRight: '10px' }}
            onChange={this.props.changeInputValue}
          />
          <Button onClick={this.props.add} type="primary">增加</Button>
        </div>
        <div style={{ margin: '10px', width: '300px' }}>
          <List
            bordered
            dataSource={this.props.list}
            renderItem={(item,index)=>(<List.Item onClick={()=>{this.props.deleteItem(index)}}>{item}</List.Item>)}
          />
        </div>
      </div>
        );
    }
}
 
export default AppUI;