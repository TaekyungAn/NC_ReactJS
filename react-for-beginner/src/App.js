import { useState, useEffect } from 'react';

function App() {
  const [loading, setLoding] = useState(true);
  const [coins, setCoins] = useState([]);
  useEffect(() => {
    fetch('https://api.coinpaprika.com/v1/tickers')
      .then(res => res.json())
      .then(json => {
        setCoins(json);
        setLoding(false);
      });
  }, []);
  return (
    <div>
      <h1>The Coins! {loading ? '' : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loding...</strong>
      ) : (
        <select>
          {coins.map(coin => (
            <option>
              {coin.name}({coin.symbol}) : ${coin.quotes.USD.price}USD
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

export default App;
