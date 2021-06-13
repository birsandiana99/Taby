const Footer = () => {
    let myQuotes = [
        "Surround Yourself With Motivated People",
        "quote 2",
        "quote 3"
    ];
    var randomQuote = myQuotes[Math.floor(Math.random() * myQuotes.length)];
    return (
      <div className="footer">
          <label> {randomQuote}</label>
      </div>
    )
  };
  export default Footer;