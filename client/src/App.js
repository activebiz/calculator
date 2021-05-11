import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormLabel from "@material-ui/core/FormLabel";
import Typography from "@material-ui/core/Typography";
import "./App.css";
import { postData, combinedWith, either } from './service';
import { format } from 'date-fns'

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

function App() {
  const classes = useStyles();
  const initialState = {
    selectedFormula: undefined,
    inputA: undefined,
    inputB: undefined,
    result: undefined,
    error: false,
    helperText: 'Please select a formula',
  };

  const [state, setState] = useState(initialState);
  const { selectedFormula, inputA, inputB, result, error, helperText } = state;

  const handleRadioChange = (event) => {
    setState((prevState) => ({
      ...prevState,
      selectedFormula: event.target.value,
      error: false,
      helperText: ' ',
    }));    
  };

  const getResult = () => {
    let value = undefined;
    if (selectedFormula === 'combinedWith') {
      value = combinedWith(inputA, inputB);
    } else if (selectedFormula === 'either') {
      value = either(inputA, inputB);
    }
    return value;    
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (selectedFormula === "combinedWith" || selectedFormula === 'either') {
      try {
        const calcResult = getResult();
        const today = format(new Date(), "dd/MM/yyyy'T'HH:mm:ss.SSSxxx")
        await postData({ timestamp: today, inputA, inputB, selectedFormula, result: calcResult })
        setState((prevState) => ({
          ...prevState,
          result: calcResult,
          error: false,
          helperText: 'Data generated!',
        }));
      } catch (e) {
        setState((prevState) => ({
          ...prevState,
          error: true,
          helperText: e.message,
        }));
      }

    } else {
      setState((prevState) => ({
        ...prevState,
        error: true,
        helperText: 'Please select a formula.'
      }));
    }
  };

  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    > 
      <div className="App">
      <Typography variant="h2" component="h2">
        Calculator
      </Typography>        
        <div>
          <FormControl
            component="fieldset"
            error={error}
            className={classes.formControl}
          >
            <FormLabel component="legend">Select a formula</FormLabel>
            <RadioGroup
              aria-label="Combined With"
              name="combinedWith"
              value={selectedFormula}
              onChange={handleRadioChange}
            >
              <FormControlLabel
                value="combinedWith"
                control={<Radio />}
                label="Combined With"
              />
              <FormControlLabel
                value="either"
                control={<Radio />}
                label="Either"
              />
            </RadioGroup>
            <div>
              <TextField
                required
                id="inputA"
                label="A"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                onChange={(e) => {
                  setState((prevState) => ({
                    ...prevState,
                    inputA: parseInt(e.target.value),
                  }));
                }}
              />
              <TextField
                required
                id="inputB"
                label="B"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                onChange={(e) => {
                  setState((prevState) => ({
                    ...prevState,
                    inputB: parseInt(e.target.value),
                  }));
                }}
              />
            </div>
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              className={classes.button}
            >
              Generate Data
            </Button>
            <FormHelperText>Result: {result}</FormHelperText>            
            <FormHelperText>{helperText}</FormHelperText>            
          </FormControl>
        </div>
      </div>
    </form>
  );
}

export default App;
