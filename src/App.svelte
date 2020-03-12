<script>
	import { onDestroy } from 'svelte'

	const formatCurrency = (raw) => new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
			minimumIntegerDigits: 1,
			maximumFractionDigits: 2
		}).format(raw)

	const bezosPerMillisecond = 2.489
	let millisecondsSincePageLoad = 0
	$: secondsSincePageLoad = (millisecondsSincePageLoad / 1000).toFixed(1)
	$: bezosEarnedSinceLoad = formatCurrency(millisecondsSincePageLoad * bezosPerMillisecond)

	let userSalary = 50000
	$: secondsToEarn = userSalary / (bezosPerMillisecond * 1000)

	const interval = setInterval(() => millisecondsSincePageLoad += 250, 250)
	onDestroy(() => clearInterval(interval))
</script>

<h1>Bezos Earnings Calculator</h1>
<p>In 2018, Jeff Bezos earned $78.5 Billion. This is equivalent to $215 Million per day, or $2,489 per second.</p>

<input type="number" bind:value={userSalary}>
<p>It would take Jeff Bezos {secondsToEarn.toFixed(0)} seconds to earn your annual salary.</p>

<p>In the {secondsSincePageLoad} seconds this page has been open, Jeff Bezos has earned {bezosEarnedSinceLoad}</p>