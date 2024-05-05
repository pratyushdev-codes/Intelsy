import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

function AiAPI() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function generateAnswer(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyAc7yWVfIu85Q68ryHsnIjR6CwzrJt25cw",
        {
          contents: [{ parts: [{ text: question }] }],
        }
      );
      setAnswer(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.log(error);
      setAnswer("Sorry, something went wrong. Please try again!");
    }
    setLoading(false);
  }

  return (
    <div style={{ backgroundColor: "#0D1117" , height:"80vh", borderRadius:"20px"}}>
      <form
        onSubmit={generateAnswer}
        className="w-full md:w-2/3 mx-auto text-center bg-gray-50 py-2"
      >
<textarea
  required
  value={question}
  onChange={(e) => setQuestion(e.target.value)}
  placeholder="  Ask anything. "
  style={{
    width: "90%",
    height:"15vh",
    borderRadius: "20px", // Adding border radius
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Adding box shadow
    fontSize: "18px", // Adjust the font size here
    fontFamily: "PT sans",
    color: "#036EFD",
  }}
></textarea>




        <button
          type="submit"
          className="btn btn-glow mx-2"
          style={{
            borderRadius: "20px",
            backgroundColor: "#EFF3F6",
            color: "#808080",
            fontWeight: "bold",
            width: "90%",
          }}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Answer"}
        </button>
      </form>
      <div className="w-full md:w-2/3 mx-auto text-left  bg-gray-50 my-1" style={{backgroundColor:"#248CF5", height:"50%",width:"90%", borderRadius:"20px"}}>
        <ReactMarkdown className="p-3">{answer}</ReactMarkdown>
      </div>
    </div>
  );
}

export default AiAPI;