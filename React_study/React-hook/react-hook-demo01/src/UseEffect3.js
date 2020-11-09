import React, { useState , createContext,useContext } from 'react';
const ContextPage = createContext()

function ChildrenPage(){
    const count = useContext(ContextPage)
return(<h2>{count}</h2>)
}

function UseEffect3(){
    const [ count , setCount ] = useState(0);
    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={()=>{setCount(count+1)}}>click me</button>
            <ContextPage.Provider value={count}>
                <ChildrenPage></ChildrenPage>
            </ContextPage.Provider>
        </div>
    )
}
export default UseEffect3;