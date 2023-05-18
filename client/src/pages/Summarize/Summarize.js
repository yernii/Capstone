import React, { useState } from "react";
import "./Summarize.css";

function SummarizeForm() {
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [summary, setSummary] = useState("");
  const [questions, setQuestions] = useState("");

  const handleSummarize = async () => {
    setSubmitting(true);
    try {
      const response = await fetch("/content/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: text,
          importance: [],
          isChecked: false,
        }),
      });
      const data = await response.json();
      setSummary(data.summary);
    } catch (err) {
      console.error(err);
    }
    setSubmitting(false);
  };
  const handleGenerateQ = async () => {
    setSubmitting(true);
    try {
      const response = await fetch("/content/generate-questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: text,
        }),
      });
      const data = await response.json();
      setQuestions(data.questions);
    } catch (err) {
      console.error(err);
    }
    setSubmitting(false);
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };
  if (submitting) {
    return <div>Loading...</div>;
  }

  return (
    <div className="custom-summarize-container">
      <div className="summarize-container">
        <form className="form-summarize" onSubmit={handleSummarize}>
          <label htmlFor="text-input">Enter text to summarize:</label>
          <textarea
            type="text"
            id="text-input"
            className="textarea-summarize"
            value={text}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="submit_post_btn"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Summarize"}
          </button>
          <div>{summary}</div>
        </form>
      </div>
      <div className="generate-questions-div">
        <button
          type="submit"
          onClick={handleGenerateQ}
          className="submit_post_btn"
        >
          Generate comprehension questions
        </button>
        <div className="questions-output">{questions}</div>
      </div>
    </div>
  );
}

export default SummarizeForm;
