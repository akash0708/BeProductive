import { useState } from "react";
// import "./App.css";
import axios from "axios";
import ReactMarkdown from "react-markdown";

function App() {
  const [question, setQuestion] = useState("");
  const [qaPairs, setQaPairs] = useState([]);
  const [generatingAnswer, setGeneratingAnswer] = useState(false);

  async function generateAnswer(e) {
    setGeneratingAnswer(true);
    e.preventDefault();
    setQaPairs((prevQaPairs) => [
      ...prevQaPairs,
      { question, answer: "Loading your answer... \n It might take up to 10 seconds" },
    ]);

    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyD4UE6-0QdB1QCtxXE-1k7EQv-3VHQJP1Q",
        method: "post",
        data: {
          contents: [{ parts: [{ text: question }] }],
        },
      });

      let fullAnswer = response.data.candidates[0].content.parts[0].text;
      let words = fullAnswer.split(" ");
      let truncatedAnswer = words.slice(0, 50).join(" ");
      const finalAnswer = truncatedAnswer + (words.length > 50 ? "..." : "");

      setQaPairs((prevQaPairs) => {
        const newQaPairs = [...prevQaPairs];
        newQaPairs[newQaPairs.length - 1].answer = finalAnswer;
        return newQaPairs;
      });
    } catch (error) {
      console.log(error);
      setQaPairs((prevQaPairs) => {
        const newQaPairs = [...prevQaPairs];
        newQaPairs[newQaPairs.length - 1].answer =
          "Sorry - Something went wrong. Please try again!";
        return newQaPairs;
      });
    }

    setGeneratingAnswer(false);
  }

  return (
    <div className="bg-white h-screen p-3 flex flex-col justify-end items-center">
      <form
        onSubmit={generateAnswer}
        className="w-full md:w-2/3 lg:w-1/2 xl:w-2/3 text-center rounded-lg shadow-lg bg-white border py-6 px-4 transition-all duration-500 transform hover:scale-105"
      >
        <textarea
          required
          className="border border-gray-300 rounded w-full my-2 min-h-fit p-3 transition-all duration-300 focus:border-black focus:shadow-lg"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask anything"
        ></textarea>
        <button
          type="submit"
          className={`bg-slate-500 text-white p-3 rounded-md hover:bg-black-600 transition-all duration-300 ${
            generatingAnswer ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={generatingAnswer}
        >
          Generate answer
        </button>
      </form>
      <div className="w-full md:w-2/3 lg:w-1/2 xl:w-2/3 my-4 flex flex-col fixed mb-64 scroll-my-1">
        {qaPairs.map((qa, index) => (
          <div
            key={index}
            className="text-center rounded-lg bg-white my-4 shadow-lg p-4 transition-all duration-500 transform hover:scale-105 scroll-smooth"
          >
            <div className=" bg-slate-300 p-1 pl-7 text-white rounded-lg font-poppins font-bold text-left">
               <p>{qa.question}</p>
            </div>
            <div className="flex font-medium rounded-lg p-1 pl-7 font-poppins text-left mt-2">
              <p>Ans: </p>
              <ReactMarkdown>{qa.answer}</ReactMarkdown>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;