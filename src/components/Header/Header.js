import React from "react";
import { MenuItem, TextField, createTheme } from "@mui/material";
import "./Header.css";
import { ThemeProvider } from "@emotion/react";
import categories from "../../data/category";
const Header = ({ category, setCategory, word, setWord, lightMode}) => {

    const handleChange = (Language)=>{
        setCategory(Language)
        setWord("")
    }
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: lightMode?"#000":"#fff",
      },
      mode: lightMode?"light":"dark",
    },
    
  });
  return (
    <div className="Header">
      <span className="title">{word? word: "Word Hunt" }</span>
      <div className="inputs">
        <ThemeProvider theme={darkTheme}>
          <TextField label="Search a Word" variant="standard"  value={word} onChange={(e)=>{setWord(e.target.value)}} />
          <TextField
            className="select"
            select
            label="Language"
            value={category}
            onChange={(e) => {
              handleChange(e.target.value);
            }}
            variant="standard"
          >
            {categories.map((option) => {
              return (
                <MenuItem key={option.label} value={option.label}>
                  {option.value}
                </MenuItem>
              );
            })}
          </TextField>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default Header;
