import { useState } from "react";

function ChatArea({ sessionId, chatHistory, setChatHistory }) {
  const [input, setInput] = useState("");

  const sendQuestion = async () => {
    if (!input.trim() || !sessionId) return;

    // Append the new question locally for smoother UI
    setChatHistory([...chatHistory, { question: input, answer: null }]);

    // Post question to backend
    const res = await fetch("http://localhost:5000/api/question", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, question: input }),
    });
    const data = await res.json();

    // Replace the last question without answer then add answer
    let historyCopy = [...chatHistory];
    historyCopy.push({ question: input, answer: data.answer });
    setChatHistory(historyCopy);

    setInput("");
  };

  return (
    <div className="flex flex-col flex-grow p-4 overflow-auto">
      <div className="flex-grow space-y-6">
        {chatHistory.map(({ question, answer }, idx) => (
          <div key={idx} className="space-y-2">
            <div className="font-semibold">Q: {question}</div>
            {answer && (
              <>
                <div>{answer.table.description}</div>
                <table className="table-auto border-collapse border border-gray-500 mt-1">
                  <thead>
                    <tr>
                      {answer.table.headers.map((header, i) => (
                        <th key={i} className="border border-gray-400 px-2 py-1 bg-gray-300 dark:bg-gray-700">{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {answer.table.rows.map((row, i) => (
                      <tr key={i}>
                        {row.map((cell, j) => (
                          <td key={j} className="border border-gray-400 px-2 py-1">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="flex space-x-4 mt-1">
                  <button className="px-2 py-1 bg-green-300 rounded hover:bg-green-400">👍 Like</button>
                  <button className="px-2 py-1 bg-red-300 rounded hover:bg-red-400">👎 Dislike</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4">
        <input
          type="text"
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") sendQuestion(); }}
          placeholder="Ask your question..."
        />
      </div>
    </div>
  );
}

export default ChatArea;
