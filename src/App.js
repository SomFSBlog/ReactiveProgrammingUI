import React, { useState, useRef, useEffect } from 'react';
import "./App.css";
import axios from "axios";
import { AppBar, Toolbar, Grid, Typography } from '@material-ui/core';

import TextField from "@mui/material/TextField";

import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@mui/material/CircularProgress';

import Button from "@material-ui/core/Button";

export const useStyles = makeStyles(() => ({
  appBar: {
    background: "#383C39",
    width: "100%"
  },
  Capgeminilogo: {
    width: "40%",
    height: "85px",
    marginleft: "20px"
  },
  logo: {
    width: "50%",
    height: "60px",
    marginTop: "4px"
  },
  toggle: {
    '&  .Mul-checked': {
      color: "#843298",
      transforms: 'translateX(25px) !important'
    },
    '& .MuiSwitch- track': { backgroundColor: "white" }
  },
  toggleLabel: { color: "white" },
  applicationStatus: {
    color: 'coral',
    fontSize: "35px",
    fontFamily: "Poppins, Helvetica, sans-serif"
  },
}));

function App() {

  const [input, setInput] = useState('');

  const [spinner, setSpinner] = useState(false);

  const classes = useStyles();
  const [timer, setTimer] = useState(0);

  const [start, setStart] = useState(false);

  const firstStart = useRef(true);
  const tick = useRef();

  useEffect(() => {

    if (firstStart.current) {
      firstStart.current = !firstStart.current;
      return;
    }

    if (start) {

      tick.current = setInterval(() => {
        setTimer((timer) => timer + 1);

      }, 1000);
    } else {
      clearInterval(tick.current);
    }

    return () => clearInterval(tick.current);

  }, [start]);


  const toggleStart = () => {

    setTimer(0);
    setStart(!start);
  };

  const toggleStop = () => {
    setStart(start);

  };

  const dispSecondsAsMins = (seconds) => {

    console.log("seconds" + seconds);
    const mins = Math.floor(seconds / 60);

    const seconds_ = seconds % 60;
    return mins.toString() + ":" + (seconds_ === 0 ? "00" : seconds_.toString());
  };

  const [response, setResponse] = useState('Response will be rendered here!!!')

  function synchronous() {

    console.log('Synchronous call');

    toggleStart(); setSpinner(true);

    axios.get("http://localhost:8080/reactiveApi/blocking/" + input).then(res => {

      console.log(res.data);
      setResponse(res.data.toString().replace(/],/g, '] \n\n'));
      setSpinner(false);

      toggleStop();

    });
  }



  function asynchronous() {

    toggleStart();

    setSpinner(true);

    console.log('Reactive call');

    axios.get("http://localhost:8080/reactiveApi/non-blocking/" + input).then(res => {
      console.log(res.data);
      setResponse(res.data);
      setSpinner(false);
      toggleStop();
    });
  }

  function clearTextBox() {
    setInput('');

    setTimer(0);

    toggleStop(start);

    console.log('Response will be rendered here !!!');

    setResponse('Response will be rendered here!!!');

  }

  return (
    <>
      <AppBar position="sticky" className={classes.appBar} style={{ marginBottom: "50px" }}>
        <Toolbar >

          <Grid container alignItems="center" >
            <Grid iten xs={8} md={2} >

            </Grid >

            <Grid iten xs={8} md={3} style={{ display: 'inline- flex' }}>

            </Grid >

            <Grid iten xs={8} md={3} style={{ display: 'inline - flex' }}>

              <Typography className={classes.applicationStatus}> SOMFSBLOG </Typography>

            </Grid >


            <Grid iten xs={8} md={3} style={{ display: 'inline - flex' }}>


            </Grid >
          </Grid >
        </Toolbar >
      </AppBar >

      <div className="container" >

        <h1 style={{ color: 'coral', margin: 12, fontFamily: "Poppins, Helvetica, sans-serif" }}>Reactive Programming</h1>
        <p style={{ color: 'blue', margin: 12, fontFamily: "Poppins, Helvetica, sans-serif", fontSize: "20px" }}> Fetch Customer Details </p>
        <TextField
          label="No of Customer details required"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ margin: '1%', width: '30%' }}
        />

        < div style={{ marginTop: '1%', marginBottom: '1%' }}>


          <Button title="test1" style={{ marginLeft: '1%', color: '#FBC600', minWidth: 30, backgroundColor: '#383C39' }}
            color="primary" variant="outlined" onClick={synchronous} >

            Non - Reactive

          </Button >

          <Button title="test2" style={{ marginLeft: '5%', color: '#FBC600', minWidth: 38, backgroundColor: '#383C39' }}
            color="primary" variant="outlined" onClick={asynchronous}>

            Reactive </Button >

          <Button title="test3" style={{ marginLeft: '5%', color: '#FBC600', width: 30, backgroundColor: '#383C39' }}
            color="primary" variant="outlined" onClick={clearTextBox}>

            Clear </Button >

          <Typography style={{ marginLeft: '1%', marginTop: '1%', color: 'forestgreen', fontSize: 22 }}>Time Taken: <span>{dispSecondsAsMins(timer)}</span> (min:sec)</Typography>

        </div >

        {spinner ? <div style={{ position: 'relative', border: '1px solid black', margin: 15, textAlign: 'center', minHeight: 200 }}>
          <span style={{ position: 'absolute', top: '10%', marginleft: '4%', color: 'grey' }}>Please wait while loading....</span>

          <CircularProgress style={{ marginTop: '7%' }} /> </div> : <textarea style={{ position: 'relative', border: '1px solid black', margin: 16, maxHeight: 200 }}
            value={response} >
        </textarea >
        }

      </div >
    </>);
}
export default App