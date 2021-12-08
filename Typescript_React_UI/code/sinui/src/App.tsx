/*
 * @Author: tangxinmin
 * @Date: 2021-09-23 15:22:11
 * @LastEditors: tangxinmin
 * @LastEditTime: 2021-10-08 11:02:54
 * @Description: file content
 */
import React from 'react';
import Button from './components/Button/button';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <Button>hello</Button>
      <Button className="classButton" style={{ background: 'red' }}>hello</Button>
      <Button btnType='primary' size='sm' onClick={(e) => { e.preventDefault() }}>hello</Button>
      <Button btnType='danger' size='lg'>hello</Button>
      <Button btnType='default' disabled>hello</Button>
      <Button btnType='link' size='lg' href="https://www.baidu.com/" target='_blank'>hello</Button>
    </div>
  );
}

export default App;
