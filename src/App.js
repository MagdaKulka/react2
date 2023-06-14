import './App.css';
import { useState } from 'react';

function App() {
	const [value, setValue] = useState(0);
	const [currency, setCurrency] = useState('EUR');
	const [result, setResult] = useState(0);
	const calculate = () => {
		setResult(0);
		if (value > 0) {
			const url = 'http://api.nbp.pl/api/exchangerates/rates/a/' + currency;
			fetch(url)
				.then((response) => response.json())
				.then((data) => {
					if (data.rates.length > 0 && data.rates[0].mid) {
						const rate = data.rates[0].mid;

						setResult((rate * value).toFixed(2));
					} else {
						window.alert('Wystąpił bład');
					}
				})
				.catch(() => window.alert('Wystąpił błąd'));
		} else {
			window.alert('Podaj poprawną wartość');
		}
	};
	return (
		<div>
			<div>Przelicznik walut</div>
			<input type='number' value={value} onChange={(event) => setValue(event.target.value)}></input>
			<select onChange={(event) => setCurrency(event.target.value)}>
				<option value='EUR'>EUR</option>
				<option value='USD'>USD</option>
				<option value='CHF'>CHF</option>
			</select>
			<button onClick={calculate}>Przelicz</button>
			<h>{result} zł</h>
		</div>
	);
}

export default App;
