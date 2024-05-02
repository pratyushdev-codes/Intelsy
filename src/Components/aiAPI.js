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
    <div style={{backgroundColor:"#0D1117"}}>
      <form
        onSubmit={generateAnswer}
        className="w-full md:w-2/3 m-auto text-center rounded bg-gray-50 py-2"
      >
        
        <textarea
          required
          className="border rounded w-11/12 my-2 min-h-fit p-3"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask anything"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-300 p-3 rounded-md hover:bg-blue-400 transition-all duration-300"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Answer"}
        </button>
      </form>
      <div className="w-full md:w-2/3 m-auto text-center rounded bg-gray-50 my-1">
        <ReactMarkdown className="p-3">{answer}</ReactMarkdown>
      </div>
    </div>
  );
}

export default AiAPI;
