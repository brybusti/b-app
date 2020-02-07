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
//import VirtualizedList from './solutionList.js'
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';

let gridItems, dict, usedAnswer, answers, itr, itr2, eState = 0, qState = -1;

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

const useStyles2 = makeStyles(theme => ({
  root: {
    width: '100%',
    height: 400,
    maxWidth: 300,
    backgroundColor: theme.palette.text.secondary,
  },
}));


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
        else if((!answers.has(values.Answer)) || (values.Answer.length <= 2))
          eState = 2;
        else{
          usedAnswer.add(values.Answer);
          answers.delete(values.Answer);
          eState = 0; 
        }

        // Set back to blank
        formik.values.Answer = "";
        actions.setSubmitting(false);
        actions.resetForm();
    }
  });

  function handleQuit() {
    if(isVisible){
      setIsVisible(!isVisible)
      setVis2(!visible2);
      qState = 1;
    }  
  }

  function handleStart(){
    qState = 0; 

    if(!isVisible){
      gridItems = RandomGrid();
      dict = Array.from(jsonDictionary.words);
      usedAnswer = new Set(); 
      answers = solutions(gridItems, dict);
      setIsVisible(!isVisible)
    }    
  }
  




  function renderRow(props) {
    const { index, style } = props;
    itr = Array.from(answers); 
    itr2 = Array.from(usedAnswer);


    if(qState === 0){
      return (
        <ListItem button style={style} key={index}>
          <ListItemText color="red" primary={
            itr2[index]
          } />
        </ListItem>
      );
    }
    else{
      return (
        <ListItem button style={style} key={index}>
          <ListItemText color="red" primary={
            itr[index]
          } />
        </ListItem>
      );
    }
    
  }
  
  renderRow.propTypes = {
    index: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
  };
  
  function VirtualizedList() {
    const classes2 = useStyles2();
    
    if(qState === 0){
      return (

        <div className={classes2.root}>
          <FixedSizeList height={400} width={300} itemSize={46} itemCount={usedAnswer.size}>
            {renderRow}
          </FixedSizeList>
        </div>
      );
    }
    else if(qState === 1){
      return (

      <div className={classes2.root}>
        <FixedSizeList height={400} width={300} itemSize={46} itemCount={answers.size}>
          {renderRow}
        </FixedSizeList>
      </div>
    );
    }
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
        <p>BOGGLE</p>
      </div>

      <div>
      {isVisible ?
        (<div> 
            <Grid  container direction="row" justify="center" alignItems="center">
              {<NestedGrid/>}   
            </Grid>
        </div>) : (<div></div>)
      }   
      </div>

      <p></p>

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

      { qState === 0 ? (
          <div>
            <p>Found Words:</p>
            <VirtualizedList></VirtualizedList>
          </div>   
      ) : (<></>)}

      { qState === 1 ? (
        <div>
          <p>Missed Words:</p>
          <VirtualizedList></VirtualizedList>
        </div>
      ) : (<></>)}

      </header>
    </div>
  );
}