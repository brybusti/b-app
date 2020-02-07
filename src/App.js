import React, { useState} from 'react';
import './App.css';
import TextInput from './TextInput.js'
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import RandomGrid from './Grid.js';
import jsonDictionary  from './full-wordlist.json';
import solutions from './boggle_solver.js';
import {Formik, Form, Field, ErrorMessage} from 'formik'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

let gridItems = RandomGrid();
let dict = Array.from(jsonDictionary.words);
const answer = solutions(gridItems, dict);

export default function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [visible2, setVis2] = useState(false); 
  const classes = useStyles();

  function refreshPage() {
    console.log("hi");
    setIsVisible(!isVisible);
  }
  
  function NestedGrid() {
    var x = -1;  
    
    function FormRow() {
      x++;
      return (
        <React.Fragment>
          <Grid item xs={2}>
            <Paper className={classes.paper}>{gridItems[x][0]}</Paper>
          </Grid>
          <Grid item xs={2}>
            <Paper className={classes.paper}>{gridItems[x][1]}</Paper>
          </Grid>
          <Grid item xs={2}>
            <Paper className={classes.paper}>{gridItems[x][2]}</Paper>
          </Grid>
          <Grid item xs={2}>
            <Paper className={classes.paper}>{gridItems[x][3]}</Paper>
          </Grid>
          
        </React.Fragment>
      );

    } // End of FormRow
    
  
    return (
      <div className={classes.root}>
        <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
          <Grid container justify="center" item xs={8} spacing={2}>
            <FormRow />
          </Grid>
          <Grid container justify="center" item xs={8} spacing={2}>
            <FormRow />
          </Grid>
          <Grid container justify="center" item xs={8} spacing={2}>
            <FormRow />
          </Grid>
          <Grid container justify="center" item xs={8} spacing={2}>
            <FormRow />
          </Grid>
        </Grid>
      </div>
    );
  } // End of NestedGrid

  
  return (
    <div className="App">
      <header className="App-header">
      <div>
      {isVisible ?
        (<div> 
            <Grid  container direction="row" justify="center" alignItems="center">
              {<NestedGrid/>}   
            </Grid>
        </div>) : (<div></div>)
      }   
      </div>

      <div>
      <Button variant="contained" color="primary" onClick={() =>  {
        setIsVisible(!isVisible)
      }}> 
        New Game
      </Button>
    
      {/* Secondary button*/}
      <Button variant="contained" color="secondary" onClick={() => {refreshPage()}}>
        Quit
      </Button> {/* End of secondary button */}
      </div>

      <text />
      </header>
    </div>
  );
}