const Footer = () => {
    let myQuotes = [
        "Surround Yourself With Motivated People",
        "There is hope, even when your brain tells you there isn’t.",
        "“Even if you’re on the right track, you’ll get run over if you just sit there.” —Will Rogers",
        "“In the midst of winter, I finally learned that there was in me an invincible summer.” —Albert Camus",
        "“Our greatest glory is not in never falling, but in rising every time we fall.” —Confucius",
        "“It’s not whether you win or lose, it’s how you play the game.” —Grantland Rice",
        ""
    ];
    var randomQuote = myQuotes[Math.floor(Math.random() * myQuotes.length)];
    return (
      <div className="footer">
          <label> {randomQuote}</label>
      </div>
    )
  };
  export default Footer;