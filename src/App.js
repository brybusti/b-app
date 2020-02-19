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
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import LoginButton from './LoginButton.js';
import { FixedSizeList } from 'react-window';
import {db} from './firebase';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// Needed global variables
let gridItems, gItems, dict, usedAnswer, answers, itr, itr2, cnt = 0, eState = 0, gMode = -1, qState = -1, score = 0, cState = -1;
let g2 = new Array(4).fill('c').map(row => Array(4).fill('c'));

// UseStyles to be used
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'black',
    //theme.palette.text.secondary,
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
  const [user, setUser] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [visible2, setVis2] = useState(false); 
  const [visible3, setV3] = useState(true);
  const [v4, sV4] = useState(true);
  const [c, setC] = useState(false);
  const [gShow, setG] = useState(false);
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

          if(values.Answer.length <= 4)
            score++;
          else if(values.Answer.length === 5)
            score += 2;
          else if(values.Answer.length === 6)
            score += 3;
          else if(values.Answer.length === 7)
            score += 5;
          else
            score += 11;

          usedAnswer.add(values.Answer);
          answers.delete(values.Answer);
          eState = 0; 
        }

        // Set back to blank
        formik.values.Answer = "";
        actions.setSubmitting(false);
        actions.resetForm();
    }
  }); // End of Formik



  // function readFromDB(){
  //   var grid = db.collection('challenges').doc('C-1').get().then(function(snapshot){
  //     console.log(snapshot.data().grid);
  //   })
  // }


  function handleQuit() {
    if(isVisible){
      setIsVisible(!isVisible)
      setVis2(!visible2);
      sV4(!v4);
      qState = 1;
    }  
  } // End of handleQuit (quit button)


  function handleCQuit(){
      setG(!gShow);
      setVis2(!visible2);
      sV4(!v4);
      qState = 1;
  } // End of handleCQuit (challenge quit button)

  function handleStart(){
    qState = 0; 
    sV4(!v4);

    if(!isVisible){
      gridItems = RandomGrid();
      dict = Array.from(jsonDictionary.words);
      usedAnswer = new Set(); 
      answers = solutions(gridItems, dict);
      setIsVisible(!isVisible);
      console.log(gridItems);
    }    
  } // End of handleStart (start button)
  

  function handleCPage(){
    setV3(!visible3);
    gMode = 1;
  } // End of handleCPage (challenge page)

  function handleRG(){
    setV3(!visible3);
    gMode = 0;
  } // End of handleRG (random/regular game)

  
  function handleC1(){
    db.collection('challenges').doc('C-1').get().then(function(instance){
      gItems = Array.from(instance.data().grid);
    });

    if(cnt === 0){
      cnt++;
      return;
    }
    else{
      
      gridItems = convertArray(gItems);
      console.log(gridItems);
      qState = 0; 
      sV4(!v4);
      setG(!gShow);
      setC(!c);
      dict = Array.from(jsonDictionary.words);
      usedAnswer = new Set(); 
      answers = solutions(gridItems, dict);
      cState = 0;
    } 
  } // End of handleC1

  function handleC2(){
    db.collection('challenges').doc('C-2').get().then(function(instance){
      gItems = Array.from(instance.data().grid);
    });
    
    if(cnt === 0){
      cnt++;
      return;
    }
    else{
      gridItems = convertArray(gItems);
      console.log(gridItems);
      qState = 0; 
      sV4(!v4);
      setG(!gShow);
      setC(!c);
      dict = Array.from(jsonDictionary.words);
      usedAnswer = new Set(); 
      answers = solutions(gridItems, dict);
      cState = 0;
    } 
  } // End of handleC2

  function handleC3(){
    db.collection('challenges').doc('C-3').get().then(function(instance){
      gItems = Array.from(instance.data().grid);
    });
    
    if(cnt === 0){
      cnt++;
      return;
    }
    else{
      gridItems = convertArray(gItems);
      console.log(gridItems);
      qState = 0; 
      sV4(!v4);
      setG(!gShow);
      setC(!c);
      dict = Array.from(jsonDictionary.words);
      usedAnswer = new Set(); 
      answers = solutions(gridItems, dict);
      cState = 0;
    } 
  } // End of handleC3


  function convertArray(arr){
    var m = 0; 

      for(var u = 0; u < 4; u++)
          for(var b = 0; b < 4; b++)
            g2[u][b] = arr[m++];
        
    return(g2);
  } // End of convertArray


  function handleReturn(){
    eState = 0;
    gMode = -1;
    qState = -1; 
    score = 0;
    cState = -1;
    cnt = 0;

    if(c)
      setC(!c);

    if(isVisible)
      setIsVisible(!isVisible);

    if(visible2)
      setVis2(!visible2);

    if(!visible3)
    setV3(!visible3);
  } // End of handleReturn


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
    
  } // End of renderRow
  
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
  } // End of VirtualizedList


  function NestedGrid() {
    var x = -1;  
    console.log(gridItems);

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

      

      {user != null ? 
        (visible3 ? (
          <div>
            <Button variant="contained" color="primary" onClick={() =>  {
              handleRG()
            }}> 
              Random Grid
            </Button>
          
            {/* Secondary button*/}
            <Button variant="contained" color="secondary" onClick={() => {handleCPage()}}>
              Challenges
            </Button> {/* End of secondary button */}
          </div>
        ) : (gMode === 0 ? 
            (


              <div>
      
          {user != null &&
            <p>Welcome, {user.displayName} ({user.email})</p> 
          } 
      <div>
        {isVisible ?
          (<div> 
              {"Score: " + score}
              <p></p>
              <div>
              <Grid  container direction="row" justify="center" alignItems="center">
                {<NestedGrid/>}   
              </Grid>
              </div>
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

      {v4 ? (
        <div>
          <p></p>
          <Button variant="contained" onClick={() => {handleReturn()}}>
            Main Page
          </Button> {/* End of secondary button */}
        </div>
      ): <></> }
      
      {/*div>
          <TextInput promptText="Enter Word" field="word" user={user} />
        </div>*/}


      { (qState !== 1) && (qState !== -1) ? ( 
        <div>
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
        </div>
      ) : (<div></div>)}

      { (qState !== 1) ? (<></>) : (
          <div>
            <p></p>
            {"Final Score: " + score}
            <p>Game Ended</p>
          </div>
      )}

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

      <p></p>
        </div>


            ) : (<div>

                {user != null &&
                  <p>Welcome, {user.displayName} ({user.email})</p> 
                } 

                <div>
                  { cState === -1 ? (
                    <div>

                  <p>Please select a challenge!</p>

                  <Button variant="contained" color="primary" onClick={() => {handleC1()}}> 
                    Challenge 1
                  </Button>
                
                  {/* Secondary button*/}
                  <Button variant="contained" color="secondary" onClick={() => {handleC2()}}>
                    Challenge 2
                  </Button> {/* End of secondary button */}

                  <Button variant="contained" color="primary" onClick={() => {handleC3()}}>
                    Challenge 3
                  </Button> {/* End of secondary button */}

                  {v4 ? (
                    <div>
                      <p></p>
                      <Button variant="contained" onClick={() => {handleReturn()}}>
                        Main Page
                      </Button> {/* End of secondary button */}
                    </div>
                  ): <></> }
                    </div>
                  ) : (

                    <div>
                    { c ? (
                      <div>
                      <div>
                        {gShow && (gridItems !== undefined) ?
                          (<div> 
                              {"Score: " + score}
                              <p></p>
                              <div>
                              <Grid  container direction="row" justify="center" alignItems="center">
                                {<NestedGrid/>}   
                              </Grid>
                              </div>
                          </div>) : (<div></div>)
                        }   
                      </div>
                      

                      <p></p>

                      <div>
                      {/* Secondary button*/}
                      <Button variant="contained" color="secondary" onClick={() => {handleCQuit()}}>
                        Quit
                      </Button> {/* End of secondary button */}
                      </div>

                      {v4 ? (
                        <div>
                          <p></p>
                          <Button variant="contained" onClick={() => {handleReturn()}}>
                            Main Page
                          </Button> {/* End of secondary button */}
                        </div>
                      ): <></> }


                      { (qState !== 1) && (qState !== -1) ? ( 
                        <div>
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
                        </div>
                      ) : (<div></div>)}

                      { (qState !== 1) ? (<></>) : (
                          <div>
                            <p></p>
                            {"Final Score: " + score}
                            <p>Game Ended</p>
                          </div>
                      )}

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

                      <p></p>
                        </div>
                    ) : (<>NO</>)}
                    </div>
                        
                  )}
                </div>

              </div>))) : (
          <div>
            <LoginButton setUser={(user) => setUser(user)} />
          </div>
        )}
      </header>
    </div>
  );
}