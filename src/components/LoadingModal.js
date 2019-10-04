import {CircularProgress} from "@material-ui/core";
import React from "react";

const LoadingModal = () => (
  <div style={{
    position: 'absolute',
    top: '0px',
    left: '0px',
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}>
    <CircularProgress/>
  </div>
)

export default LoadingModal