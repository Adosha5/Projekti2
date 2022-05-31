import React, {useState} from 'react';

export const Context = React.createContext();



const DataProvider = props => {

    const [count, setCount] = useState('');
    const [admin, setAdmin] = useState(false);

    return(
        <Context.Provider value={{count, setCount, admin, setAdmin}}>
         {props.children}   
        </Context.Provider>
    )
}

export default DataProvider;