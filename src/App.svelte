<script>
	import { onDestroy } from 'svelte'
	import { formatCurrency, formatTime } from './format'

	let millisecondsSincePageLoad = 0
	$: secondsSincePageLoad = (millisecondsSincePageLoad / 1000).toFixed(0)
	const interval = setInterval(() => millisecondsSincePageLoad += 250, 250)
	onDestroy(() => clearInterval(interval))

	const bezosPerMillisecond = 2.489
	$: bezosEarnedSinceLoad = formatCurrency(millisecondsSincePageLoad * bezosPerMillisecond * rates[selectedCurrency], selectedCurrency)

	let userSalary = 50000
	$: secondsToEarn = Math.ceil((userSalary / rates[selectedCurrency]) / (bezosPerMillisecond * 1000))

	let selectedCurrency = 'USD'
	let rates = {
		'USD': 1
	}

	async function loadExchangeRates () {
		const exchangeRatesResult = await fetch('https://api.exchangeratesapi.io/latest?base=USD')
		if (exchangeRatesResult.status !== 200) {
			console.log('failed to load exchange rates', exchangeRatesResult.status, await exchangeRatesResult.text())
			return
		}

		const exchangeRates = await exchangeRatesResult.json()
		rates = exchangeRates.rates
	}
	loadExchangeRates()
</script>

<style>
	body {
		font-family: Arial, Helvetica, sans-serif;
		text-align: center;
	}
</style>

<body>
	<h1>Bezos Earnings Calculator</h1>
	<p>In 2018, Jeff Bezos earned $78.5 Billion<a href="https://www.businessinsider.com/what-amazon-ceo-jeff-bezos-makes-every-day-hour-minute-2018-10"><sup>[1]</sup></a>. This is equivalent to $215 Million per day, or $2,489 per second.</p>

	<p>It would take Jeff Bezos {formatTime(secondsToEarn)} to earn your annual salary of <input type="number" bind:value={userSalary} step=2500 /><select bind:value={selectedCurrency} on:change="{e => selectedCurrency = e.target.value}">
		{#each Object.keys(rates).sort() as currency (currency)}
			<option value={currency}>{currency}</option>
		{/each}
	</select></p>

	<p>In the {formatTime(secondsSincePageLoad)} this page has been open, Jeff Bezos has earned {bezosEarnedSinceLoad}</p>
</body>