import React from "react";
import "./Definitions.css";
export default function Definitions({ word, category, meanings, lightMode}) {
  return (
    <div className="Meanings">
      {
        meanings[0] && word && category==="en" &&(
          <audio src={meanings[0].phonetics[0] && meanings[0].phonetics[0].audio }style={{background:"#fff", borderRadius:"10px"}} controls>
            Your browser doesn't support audio element
          </audio>
        )
      }
      {word === "" ? (
        <span className="Subtitle">Start by searching for a word</span>
      ) : (
        meanings.map((mean) =>
          mean.meanings.map((item) =>
            item.definitions.map((def) => (
              <div
                className="singleMean"
                style={{ backgroundColor: lightMode?"#3b5360":"White", color: lightMode?"White":"black" }}
              >
                <b>Definition: {def.definition}</b>
                <hr style={{backgroundColor:"black", width:"100%"}}/>
                {def.example && (
                    <span>
                        <b>Example: </b>
                        {def.example}
                    </span>
                )}
            
                     {def.synonyms && def.synonyms[0] && (
                  <span>
                    <b>Synonyms :</b> {def.synonyms.map((s) => `${s}, `)}
                  </span>
                )}
             
              </div>
            ))
          )
        )
      )}
    </div>
  );
}
