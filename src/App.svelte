<script>
	import { onDestroy } from 'svelte'

	const formatCurrency = (raw) => new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: selectedCurrency,
			minimumIntegerDigits: 1,
			maximumFractionDigits: 2
		}).format(raw)

	const bezosPerMillisecond = 2.489
	let millisecondsSincePageLoad = 0
	$: secondsSincePageLoad = (millisecondsSincePageLoad / 1000).toFixed(0)
	$: bezosEarnedSinceLoad = formatCurrency(millisecondsSincePageLoad * bezosPerMillisecond * rates[selectedCurrency])

	let userSalary = 50000
	$: secondsToEarn = Math.floor((userSalary / rates[selectedCurrency]) / (bezosPerMillisecond * 1000))

	const interval = setInterval(() => millisecondsSincePageLoad += 250, 250)
	onDestroy(() => clearInterval(interval))

	let selectedCurrency = 'USD'
	let rates = {
		'USD': 1
	}

	// async code
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

<h1>Bezos Earnings Calculator</h1>
<p>In 2018, Jeff Bezos earned $78.5 Billion. This is equivalent to $215 Million per day, or $2,489 per second.</p>

<p>It would take Jeff Bezos {secondsToEarn} seconds to earn your annual salary of <input type="number" bind:value={userSalary} /><select bind:value={selectedCurrency} on:change="{e => selectedCurrency = e.target.value}">
	{#each Object.keys(rates).sort() as currency (currency)}
		<option value={currency}>{currency}</option>
	{/each}
</select></p>

<p>In the {secondsSincePageLoad} {secondsSincePageLoad === '1' ? 'second' : 'seconds'} this page has been open, Jeff Bezos has earned {bezosEarnedSinceLoad}</p>