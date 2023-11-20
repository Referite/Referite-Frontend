import { CSSProperties } from 'react';

// css properties for loading screen
export const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderWidth: "0.5vw"
  };

export const loaderContainerStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    position: 'absolute', 
    top: 0,
    left: 0,
    zIndex: 1000
  };