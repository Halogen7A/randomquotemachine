import React from 'https://esm.sh/react@18.2.0'
import ReactDOM from 'https://esm.sh/react-dom@18.2.0'



const getRandomBgColor = () => {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    var bgColor = "rgb(" + r + "," + g + "," + b + ")";
    return bgColor;
}


const QuoteBox = ({ quote, handleNewQuote, handleTweet }) => (
  <div id="quote-box">
    <p id="text">
      {quote.quote}
    </p>
  
    <h5 id="author">
      {quote.author}
    </h5>
    
    <div class="buttons">
      <button id="new-quote" onClick={handleNewQuote}>
        New Quote
      </button>

      <button id="tweet-button" onClick={handleTweet}>
        <a
          target="_top"
          id="tweet-quote"
          >Tweet this quote!</a>
      </button>
    </div>
    
  </div>
  
)

const App = () => {
  const [quote, newQuote] = React.useState("");
  const [bgcolor, newBgColor] = React.useState(getRandomBgColor());
  
  React.useEffect(() => {document.body.style.backgroundColor = bgcolor}, [bgcolor]);
  React.useEffect(() => {getRandomQuote()}, [])
  
  const getRandomQuote = () => {
    fetch("https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json")
    .then(response => response.json())
    .then(data => {
      let dataQuotes = data.quotes;
      let randomNum = Math.floor(Math.random() * dataQuotes.length);
      newQuote(dataQuotes[randomNum]);
    })
  }
  const handleNewQuote = () => {
    getRandomQuote();
    newBgColor(getRandomBgColor());
  }
  
  const handleTweet = () => {
    document.getElementById("tweet-quote").setAttribute("href", `https://twitter.com/intent/tweet?text=${quote.quote}${quote.author}`);
  }
  
  return (
    <div class="wrapper">
      <QuoteBox quote={quote} handleNewQuote={handleNewQuote} handleTweet={handleTweet}/>
    </div>
  )
}
ReactDOM.render(<App />, document.querySelector("#app"))