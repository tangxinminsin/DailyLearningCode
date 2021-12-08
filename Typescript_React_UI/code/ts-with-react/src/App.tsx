/*
 * @Author: tangxinmin
 * @Date: 2021-09-18 15:23:17
 * @LastEditors: tangxinmin
 * @LastEditTime: 2021-09-23 13:59:56
 * @Description: file content
 */
import React, { useState } from 'react';
import logo from './logo.svg';
import useURLLoader from './hooks/useURLLoader';
import './App.css';

interface IShowRequest {
  message: string,
  status: string
}

const App: React.FC = () => {
  const [update, setUpdate] = useState(false)
  const [data, loading] = useURLLoader('https://dog.ceo/api/breeds/image/random', [update])
  const dogResult = data as IShowRequest
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div onClick={() => setUpdate(!update)}><button>update</button></div>
        {
          loading ? <div>读取中</div> :
            <div>
              <img src={dogResult && dogResult.message} alt="" />
            </div>
        }
      </header>
    </div>
  );
}

export default App;
