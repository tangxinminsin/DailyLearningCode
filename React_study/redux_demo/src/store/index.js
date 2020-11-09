import { createStore , applyMiddleware ,compose } from 'redux'  //  引入createStore方法
import reducer from './reducer'    
import createSagaMiddleware from 'redux-saga'   //创建saga中间件
import mySagas from './sagas'   //引入saga

const sagaMiddleware = createSagaMiddleware() 


const composeEnhancers =   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}):compose

    const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware))

const store = createStore( reducer, enhancer) // 创建数据存储仓库

sagaMiddleware.run(mySagas)
export default store   //暴露出去








// import { createStore , applyMiddleware ,compose } from 'redux'  //  引入createStore方法
// import reducer from './reducer'    
// import thunk from 'redux-thunk'

// const composeEnhancers =   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}):compose

// const enhancer = composeEnhancers(applyMiddleware(thunk))

// const store = createStore( reducer, enhancer) // 创建数据存储仓库
// export default store   //暴露出去















// import { createStore  } from 'redux'  //  引入createStore方法
// import reducer from './reducer'    


// const store = createStore( 
//     reducer, 
//     window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION___
//     ) // 创建数据存储仓库
// export default store   //暴露出去