import React, { Component } from 'react';
import propTypes from 'prop-types'

class Children extends Component {
    constructor(props){
        super(props)
        this.handleClick=this.handleClick.bind(this)
    }

    render() { 
        return ( 
            
        <li  
        onClick={this.handleClick}
        >
             {this.props.gname}-{this.props.content}
        </li>
         );
    }
    handleClick(){
        this.props.deleteItem(this.props.index)
    }
}

Children.propTypes={
    gname:propTypes.string.isRequired,
    content:propTypes.string,
    index:propTypes.number,
    deleteItem:propTypes.func
}

//设置参数默认值
Children.defaultProps={
    gname:"123"
}
export default Children;