const Sentiment = require("sentiment");
const sentiment = new Sentiment();

exports.analyzeSentiment = (text) => {
  const result = sentiment.analyze(text);

  let label = "Neutral";
  let suggestion = "Try adding more engaging or emotional language.";

  if (result.score > 2) {
    label = "Positive";
    suggestion = "Great! Keep this upbeat tone for better engagement.";
  } else if (result.score < 0) {
    label = "Negative";
    suggestion = "Try to rephrase with a more positive or encouraging tone.";
  }

  return { score: result.score, label, suggestion };
};
