import React, { useState} from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import RandomGrid from './Grid.js';
import jsonDictionary  from './full-wordlist.json';
import solutions from './boggle_solver.js';
import { useFormik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import VirtualizedList from './solutionList.js'

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
let usedAnswer = new Set(); 
let answer = solutions(gridItems, dict);
let eState = 0, qState = 0; 

export default function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [visible2, setVis2] = useState(false); 
  const classes = useStyles();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { Answer: "" },
    onSubmit: (values, actions) => {
          
        if(usedAnswer.has(values.Answer))
          eState = 1;
        else if((!answer.has(values.Answer)) || (values.Answer.length <= 2))
          eState = 2;
        else{
          usedAnswer.add(values.Answer);
          eState = 0; 
        }

        // Set back to blank
        formik.values.Answer = "";
        actions.setSubmitting(false);
        actions.resetForm();
    }
  });

  function handleQuit() {
    console.log("hi");
    setVis2(!visible2);
    qState = 1;
  }

  function handleStart(){
    gridItems = RandomGrid();
    dict = Array.from(jsonDictionary.words);
    usedAnswer = new Set(); 
    answer = solutions(gridItems, dict);
    setIsVisible(!isVisible)
    qState = 0; 
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
        handleStart()
      }}> 
        New Game
      </Button>
    
      {/* Secondary button*/}
      <Button variant="contained" color="secondary" onClick={() => {handleQuit()}}>
        Quit
      </Button> {/* End of secondary button */}
      </div>








      { qState !== 1 ? (
        <form onSubmit={formik.handleSubmit} id='wordInput'>
        <label htmlFor="Answer"></label>
        <input
            autoComplete="off"
            id="Answer"
            name="Answer"
            type="Answer"
            onChange={formik.handleChange}
            value={formik.values.Answer}
        />
        <button type="submit">Submit</button>
        </form>
      ) : (<p>Game Ended</p>)}

      { eState === 1 ? (
        <p>Already Entered!</p>
      ) : (<></>)}

      { eState === 2 ? (
          <p>Invalid Word!</p>
      ) : (<></>)}  

      { qState === 1 ? (
          <VirtualizedList></VirtualizedList>
      ) : (<></>)}

      </header>
    </div>
  );
}