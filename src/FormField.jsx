import React from 'react';

//Imported Material UI components and styles.
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

// MaterialUI styling.
const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 300,
    },
}));


//This functional component looks a lot more complicated than its essentials because it uses imported Material UI components for UI purposes!
//before I refactored this code and imported the Material UI, the function was four lines long, and simply returned the following:
/*
<div>
    <label>{human_label}</label>
    <input name={name} type={type} onChange={handleChange} />
</div>
*/
//It worked great but lacked polish. I think the Material UI is worth the extra lines of code! Hope you agree.


function FormField({name, type, human_label, handleChange, handleCheckboxChange}){
    const classes = useStyles();
    return (
        <div>
        {type === 'text' || type === 'email' ?          
            <TextField
                required
                name={name}
                label={human_label}
                type={type}
                className={classes.textField}
                margin="normal"
                variant="outlined"
                onChange={handleChange}
            />
            :
            null
        }
        {type === 'date' ?          
            <TextField
                required
                id="date"
                name={name}
                label={human_label}
                type={type}
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={handleChange}
            />
            :
            null
        }
        {type === 'checkbox' ?  
            <div className='checkbox'>       
            <FormControlLabel 
                required
                control={<Checkbox onChange={handleCheckboxChange} />} 
                label={human_label}
                labelPlacement="start"
                name={name}
            />
            </div>
            :
            null
        }
        </div>
    )
}

export default FormField;

