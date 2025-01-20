import React from 'react';

const userDirectoryContext = React.createContext({
    lightTheme:'',
    toggleTheme: () => {},
})

export default userDirectoryContext;