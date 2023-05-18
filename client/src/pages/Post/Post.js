import React, { useEffect, useState } from "react";
import { TextAnnotateBlend } from "react-text-annotate-blend";
import { useParams } from "react-router-dom";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import "./Post.css";

const init = [];

const demoText =
  "There are many stories about the origins of cyclo-cross. One is that European road racers in the early 1900s would race each other to the next town over from them and that they were allowed to cut through farmers' fields or over fences, or take any other shortcuts, in order to make it to the next town first. This was sometimes called steeple chase as the only visible landmark in the next town was often the steeple.";

function Post() {
  const [value, setValue] = useState(init);
  const [tag, setTag] = useState("tagA");
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [summary, setSummary] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  // handle checkbox change event
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };
  let { id } = useParams();

  useEffect(() => {
    async function fetchArticles() {
      setIsLoading(true);
      try {
        const response = await fetch(`/content/article/${id}`);
        const data = await response.json();
        setArticle(data);
      } catch (err) {
        console.error(err);
      }
      setIsLoading(false);
    }
    fetchArticles();
  }, [id]);

  const handleChange = (value) => {
    setValue(value);
  };

  const COLORS = {
    "Very Important": "rgb(179, 245, 66)",
    "Medium Important": "#42f5f5",
    "Low Important": "#4b46cd",
  };

  const handleSummarize = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/content/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: article, importance: value, isChecked }),
      });
      const data = await response.json();
      setSummary(data.summary);
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h3>{article.title}</h3>
      <div className="summarize-post-1">
        <TextAnnotateBlend
          style={{
            fontSize: "1.2rem",
          }}
          content={article.body}
          onChange={handleChange}
          value={value}
          getSpan={(span) => ({
            ...span,
            tag: tag,
            color: COLORS[tag],
          })}
        />
      </div>
      <FormControlLabel
        control={<Checkbox inputProps={{ "aria-label": "Checkbox demo" }} />}
        label="Consider importance"
      />
      <button className="submit_post_btn" onClick={handleSummarize}>
        Summarize
      </button>
      <div className="modal_summarize">{summary}</div>
      <select onChange={(e) => setTag(e.target.value)}>
        {Object.keys(COLORS).map((label) => (
          <option key={label} value={label}>
            {label}
          </option>
        ))}
      </select>
      {/* checkbox */}
      <br />
      <FormControlLabel
        control={
          <Checkbox
            checked={isChecked}
            onChange={handleCheckboxChange}
            inputProps={{ "aria-label": "Checkbox demo" }}
          />
        }
        label="Inspect mode"
      />
      {isChecked && (
        <>
          {" "}
          <h3>Current Stored Value</h3>
          <div>
            <pre>{JSON.stringify(value, null, 2)}</pre>
          </div>
          <button className="submit_post_btn">Save</button>
        </>
      )}
    </div>
  );
}

export default Post;
