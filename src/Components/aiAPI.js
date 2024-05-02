import React, { useState } from 'react';
import axios from 'axios'; // Don't forget to import axios

const AiAPI = () => {
const [question , setQuestion]= useState("");
  async function generateAnswer() {
    console.log("Loading");
    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyAc7yWVfIu85Q68ryHsnIjR6CwzrJt25cw",
        method: 'post',
        data: {
          "contents": [{
            "parts": [{
              "text": question
            }]
          }]
        }
      });
      console.log(response["data"]["candidates"][0]["content"]["parts"][0]["text"]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <div> 
        <textarea value={question} onChange={(e)=>setQuestion(e.target.value)}></textarea>
      <button onClick={generateAnswer}>Generate Answer</button>
    </div>
  );
};

export default AiAPI;
