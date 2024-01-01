import {useState, createContext, useContext} from 'react';

const HomeTabContext=createContext()

function HomeTabContextProvider ( {children} ){
    const [selectedTab, setSelectedTab] = useState('all');

    return <HomeTabContext.Provider value={{selectedTab, setSelectedTab }} >
     		{children}
     </HomeTabContext.Provider>
};


function  useHomeTabContext(){
  const context= useContext(HomeTabContext)
  if(!context){
    return console.error('useHomeTabContext must be used within HomeTab Context Provider')
  }

  return context
}

export  {HomeTabContextProvider, useHomeTabContext };
