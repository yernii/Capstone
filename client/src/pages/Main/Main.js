import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Main.css";

function Main() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await fetch("/content/articles");
        const data = await response.json();
        setArticles(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchArticles();
  }, []);

  return (
    <div className="pin_container">
      {articles.map((article, index) => (
        <Link
          to={`/articles/${article._id}`}
          className={`item card card_${
            index % 3 === 0 ? "large" : index % 3 === 1 ? "medium" : "small"
          }`}
          key={article._id}
        >
          <div class="article">
            <h2 class="article__title">{article.title}</h2>
            <div class="article__meta">
              <p class="article__tag">Tag: {article.tag}</p>
              <p class="article__author">By: {article.author?.name}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Main;
