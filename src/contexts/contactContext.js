import React, { createContext, useState, useEffect } from 'react';
import ProductService from '../services/product.service';
export const ContactsContext = createContext();
const { Provider } = ContactsContext;
export const ContactsProvider = (props) => {
    const [globalData, setGlobalData] = useState([]);
    useEffect(() => {
        const fetchGlobalData = async () => {
          const url ="global-data"; 
          let response = await ProductService.getAllData(url);           
          if (response.status === 200) { 
            setGlobalData(response.data.data);
          }
        };  
        fetchGlobalData();  
        return () => {};
    }, [setGlobalData]); 
    return(  
        <Provider value={[globalData, setGlobalData]}>  
          {props.children}
        </Provider>  
    );
  
}
