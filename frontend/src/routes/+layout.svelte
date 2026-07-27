<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import TerminalBar from '$lib/components/TerminalBar.svelte';
	import Ticker from '$lib/components/Ticker.svelte';
	import BurgerMenu from '$lib/components/BurgerMenu.svelte';

	let { children } = $props();

	const tickerText = '★ NEUER DROP BALD ★ FRANKFURT ⟷ ERFURT ★ FOLGT UNS ';
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="page">
	<!-- Film-grain overlay. feTurbulence beats a noise PNG here: no extra
	     request and it stays sharp at any pixel density. -->
	<svg width="0" height="0" aria-hidden="true">
		<filter id="grain">
			<feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
			<feColorMatrix type="saturate" values="0" />
		</filter>
	</svg>
	<div class="grain" aria-hidden="true"></div>

	<div class="frame">
		<TerminalBar />
		<Ticker text={tickerText.repeat(2)} />

		<div class="content">
			<div class="scanlines" aria-hidden="true"></div>
			<div class="version" aria-hidden="true">v0.02 BETA</div>

			{@render children()}

			<BurgerMenu />
		</div>
	</div>
</div>

<style>
	.page {
		position: relative;
		display: flex;
		min-height: 100dvh;
		width: 100%;
		align-items: stretch;
		justify-content: center;
		overflow: hidden;
		background: var(--bg);
		font-family: var(--font-body);
	}

	.grain {
		position: absolute;
		inset: 0;
		filter: url(#grain);
		opacity: 0.05;
		mix-blend-mode: overlay;
		pointer-events: none;
	}

	.frame {
		position: relative;
		z-index: 1;
		display: flex;
		width: 100%;
		max-width: var(--frame-width);
		min-height: 100dvh;
		flex-direction: column;
		border: 2px solid var(--paper);
		margin: 0 auto;
		/* Lets LinkCard and friends react to the frame width instead of the
		   viewport, so the same component survives the desktop layout. */
		container-type: inline-size;
	}

	.content {
		position: relative;
		display: flex;
		flex: 1;
		flex-direction: column;
		align-items: center;
		gap: 20px;
		background: var(--bg);
		box-shadow: inset 0 0 60px rgb(0 0 0 / 0.4);
		padding: 32px 24px 28px;
	}

	.scanlines {
		position: absolute;
		inset: 0;
		background: repeating-linear-gradient(
			0deg,
			rgb(255 255 255 / 0.05) 0 1px,
			transparent 1px 4px
		);
		mix-blend-mode: overlay;
		pointer-events: none;
		animation: scan 0.6s linear infinite;
	}

	@keyframes scan {
		from {
			background-position: 0 0;
		}
		to {
			background-position: 0 8px;
		}
	}

	.version {
		position: absolute;
		top: 12px;
		right: 16px;
		border: 1px solid rgb(244 242 236 / 0.3);
		padding: 1px 6px;
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		letter-spacing: 2px;
		color: rgb(244 242 236 / 0.4);
		transform: rotate(3deg);
	}
</style>
