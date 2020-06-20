import React from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const handleClick = async (e) => {
    const a1 = document.getElementById("a1").value;
    const q = document.getElementById("q").value;
    const n = document.getElementById("n").value;

    const response = await axios.get(`api/suma/${a1}/${q}/${n}`);
    document.getElementById("result").innerText = `Suma ciagu: ${response.data.sumaCiagu}`;
	//console.log(response.data);
  };

  return (
    <div className="App">
      <header className="App-header">
	<div id="result">
	</div>

        <div>
          <form>
            <div>
            	<label>Podaj pierwszy wyraz ciagu geometrycznego</label>
                <input type="text'" id="a1"/>
	    </div>
	    <div>
		<label>Podaj iloraz ciagu geometrycznego</label>
		<input type="text" id="q"/>
	    </div>
      <div>
		<label>Podaj ilosc wyrazow ciagu geometrycznego </label>
		<input type="text" id="n"/>
	    </div>
            <button type="button" onClick={handleClick}>Oblicz sume ciagu dla podanych argumentow</button>
          </form>
	</div>
      </header>
    </div>
  );
}

export default App;