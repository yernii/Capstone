const User = require("../../models/User");
const Article = require("../../models/Article");
const { Configuration, OpenAIApi } = require("openai");

const gpt3ModelId = "text-davinci-003";

const configuration = new Configuration({
  apiKey: "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",
});

async function getArticles(req, res) {
  try {
    // const user = await User.findOne({ email: req.user.email });
    // if (!user) {
    //   return res.status(401).send({ message: "Unauthorized" });
    // }

    const articles = await Article.find().populate("author");
    res.status(200).send(articles);
  } catch (err) {
    res.status(500).send({ message: "Error getting articles", error: err });
  }
}

async function getArticle(req, res) {
  try {
    const article = await Article.findById(req.params.id).populate("author");
    res.status(200).send(article);
  } catch (err) {
    res.status(500).send({ message: "Error getting articles", error: err });
  }
}
async function getOwnArticles(req, res) {
  try {
    const articles = await Article.find({ author: req.params.id }).populate(
      "author"
    );
    res.status(200).send(articles);
  } catch (err) {
    res.status(500).send({ message: "Error getting articles", error: err });
  }
}

async function postArticle(req, res) {
  try {
    // const user = await User.findOne({ email: req.user.email });
    // if (!user) {
    //   return res.status(401).send({ message: "Unauthorized" });
    // }

    const article = new Article({
      title: req.body.title,
      body: req.body.body,
      author: req.body.author, //assign author's id to the article
      tag: req.body.tag,
    });

    await article.save();

    res.status(201).send(article);
  } catch (err) {
    res.status(500).send({ message: "Error creating article", error: err });
  }
}

async function updateArticle(req, res) {
  try {
    // const user = await User.findOne({ email: req.user.email });
    // if (!user) {
    //   return res.status(401).send({ message: "Unauthorized" });
    // }

    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).send({ message: "Article not found" });
    }

    if (article.author.toString() !== user._id.toString()) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    article.title = req.body.title;
    article.body = req.body.content;

    await article.save();

    res.status(200).send(article);
  } catch (err) {
    res.status(500).send({ message: "Error updating article", error: err });
  }
}

async function summarize(req, res) {
  const { text, importance, isChecked } = req.body;
  // this is output[
  //   { start: 0, end: 1, text: 's', tag: 'tagA' },
  //   {
  //     start: 1,
  //     end: 3,
  //     text: 'df',
  //     tag: 'Medium Important',
  //     color: '#42f5f5'
  //   }
  // ]
  if (isChecked && Array.isArray(importance)) {
    let importance_filtered = importance
      .map(
        (item, index) =>
          `${index + 1}) text: "${item.text}" ; importance: ${
            item.tag.split(" ")[0]
          }`
      )
      .join("\n");
  }
  if (!text) {
    return res.status(400).json({ message: "Missing required data: text" });
  }

  try {
    const openai = new OpenAIApi(configuration);
    const gpt3Response = await openai.createCompletion({
      model: gpt3ModelId,
      prompt: isChecked
        ? `Below is the text, and it has an importance metrics where parts of the text can have importance from low, medium, important. If it is important focus on it more in detail, if low you can put less attention to it. Text:${text} Importance:${importance_filtered}`
        : `Please summarize the following text in detail around 1000 words if possible:\n\n${text}\n\nSummary:`,
      max_tokens: 4000,
      n: 1,
      stop: null,
      temperature: 0.7,
    });
    const summary = gpt3Response.data.choices[0].text.trim();
    return res.status(200).json({ summary });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to summarize text" });
  }
}
async function generateQ(req, res) {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ message: "Missing required data: text" });
  }

  try {
    const openai = new OpenAIApi(configuration);
    const gpt3Response = await openai.createCompletion({
      model: gpt3ModelId,
      prompt: `Please create me a set of questions based on this text to practice text understanding:\n\n${text}\n:`,
      max_tokens: 160,
      n: 1,
      stop: null,
      temperature: 0.7,
    });
    const questions = gpt3Response.data.choices[0].text.trim();
    return res.status(200).json({ questions });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to summarize text" });
  }
}

module.exports = {
  getArticles,
  postArticle,
  summarize,
  updateArticle,
  getOwnArticles,
  getArticle,
  generateQ,
};
