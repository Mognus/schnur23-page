<svelte:head>
	<title>schnur23</title>
	<meta name="description" content="Alle Links von schnur23 an einem Ort." />
</svelte:head>

<img class="logo" src="/schnur23-logo.png" alt="schnur23" width="220" height="110" />

<div class="divider"></div>

<!-- LinkCard list lands here in the next step. -->

<div class="stay-tuned">
	<span>STAY TUNED!</span>
</div>

<style>
	.logo {
		width: 220px;
		height: 110px;
		object-fit: contain;
		margin-top: 10px;
	}

	.divider {
		width: 100%;
		height: 1px;
		background: repeating-linear-gradient(90deg, var(--paper) 0 8px, transparent 8px 14px);
		opacity: 0.5;
	}

	.stay-tuned {
		position: relative;
		border: 3px solid var(--accent);
		border-radius: 6px;
		padding: 8px 26px;
		transform: rotate(-4deg);
	}

	/* Inner hairline — the double-stroke sticker look from the mockup. */
	.stay-tuned::before {
		content: '';
		position: absolute;
		inset: 3px;
		border: 1px solid var(--accent);
		border-radius: 3px;
		opacity: 0.6;
	}

	.stay-tuned span {
		font-family: var(--font-display);
		font-size: var(--text-2xl);
		letter-spacing: 3px;
		color: var(--accent);
	}
</style>
