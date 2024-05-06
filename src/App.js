import React, { useEffect, useState } from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import { alpha, styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import Switch from '@mui/material/Switch';
import Header from "./components/Header/Header";
import Definitions from "./components/Definitions/Definitions";
export default function App() {
  const [word, setWord] = useState("");
  const [meanings, setMeanings] = useState([]);
  const [category, setCategory] = useState("en");
  const [lightMode, setLightMode] = useState(false)
  const LightMode = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: grey[600],
      '&:hover': {
        backgroundColor: alpha(grey[600], theme.palette.action.hoverOpacity),
      },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: grey[600],
    },
  }));


  const dictionary_api = async () => {
    try {
      const data = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`
      );
      setMeanings(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(meanings);
  useEffect(() => {
    dictionary_api();
  }, [word,category]);
  return (
    <div style={{ height: "100vh", background:lightMode?"#fff":"#282c34", color:lightMode?"black":"white", transition:"all 0.8s linear" }}>
      <Container
        maxWidth="md"
        style={{ display: "flex", flexDirection: "column",justifyContent: "space-evenly" , height: "100vh" }}
      >
        <div style={{position:"absolute", top:0, right:15,paddingTop:10}}>
             <span>{lightMode?"Dark": "Light"} mode</span>
              <LightMode checked={lightMode} onChange={()=>{setLightMode(!lightMode)}}/>
        </div>
        <Header category={category} setCategory={setCategory} word={word} setWord={setWord} lightMode={lightMode}/>
        {meanings && <Definitions word={word} meanings={meanings} category={category} lightMode={lightMode}/>}
      </Container>
    </div>
  );
}
