import { useState, useEffect } from 'react';

function App() {
  const onChange = e => {
    console.log(e.target.value);
    console.log(e);
  };
  const [inverted, setInverted] = useState(false);
  const [loading, setLoding] = useState(true);
  const [coins, setCoins] = useState([]);
  const [amount, setAmount] = useState(0);
  const onInverted = () => {
    setInverted(current => !current);
  };

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
        <select onChange={onChange}>
          {coins.map(coin => (
            <option>
              {coin.name}({coin.symbol}) : ${coin.quotes.USD.price}USD ={' '}
              {Math.round((1 / coin.quotes.USD.price) * 10000) / 10000}{' '}
              {coin.symbol}
            </option>
          ))}
        </select>
      )}
      <div>
        <label htmlFor='dollor'>dollor : </label>
        <input id='dollor' placeholder='$' type='number' disabled={inverted} />
      </div>
      <div>
        <label htmlFor='coin'>선택된코인이름 : </label>
        <input
          id='coin'
          placeholder='선택된코인이름'
          type='number'
          disabled={!inverted}
        />
      </div>
      <button>reset</button>
      <button onClick={onInverted}>invert</button>
    </div>
  );
}

export default App;
