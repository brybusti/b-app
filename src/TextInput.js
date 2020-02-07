import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';


export default function TextInput({promptText}){
    

    const useStyles = makeStyles(theme => ({
        root: {
          '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200,
          },
        },
      }));

      const classes = useStyles(); 

    function getUserInput() {
        const promptResponse = prompt({promptText});
        console.log(promptResponse);
        //setText(promptResponse);
        
    }

    return(
        <form className={classes.root} noValidate autoComplete="off">
            <div>
                <TextField onClick={() => getUserInput()}  />
                
            </div>
        </form>
    );
}
