<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import TerminalBar from '$lib/components/TerminalBar.svelte';
	import Ticker from '$lib/components/Ticker.svelte';
	import BurgerMenu from '$lib/components/BurgerMenu.svelte';

	let { children } = $props();

	const tickerText =
		'★ NEUER DROP BALD ★ FRANKFURT ⟷ ERFURT ★ FOLGT UNS ★ CAMEL069 NEVER FORGET. ';
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
		<div class="desktop-only"><Sidebar /></div>

		<!-- Bar and ticker sit inside this column, not above the frame, so the
		     ticker scrolls across the content only and leaves the sidebar alone. -->
		<div class="main">
			<TerminalBar />
			<Ticker text={tickerText.repeat(2)} />

			<div class="content">
				<div class="scanlines" aria-hidden="true"></div>
				<div class="version" aria-hidden="true">v0.02 BETA</div>

				{@render children()}

				<div class="mobile-only"><BurgerMenu /></div>
			</div>
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
		/* Full bleed at every size: the shell follows the viewport's aspect
		   ratio instead of pretending to be a phone on a desktop. Capping
		   happens further in, on the link stack. */
		width: 100%;
		/* Fixed, not min-height: the children can only size themselves against
		   the viewport if the frame actually commits to it. */
		height: 100dvh;
		/* A row now: the border has to wrap sidebar and content together. */
		flex-direction: row;
		border: 2px solid var(--paper);
	}

	.main {
		display: flex;
		/* Takes all remaining width and is the one that gives when space runs
		   short — the sidebar has flex: none. */
		flex: 1;
		min-width: 0;
		flex-direction: column;
		/* Moved down from .frame: components should measure the content column,
		   not the column plus a sidebar that may or may not be there. */
		container-type: inline-size;
	}

	/* The only place that knows about the 1024px breakpoint. Sidebar and
	   BurgerMenu stay dumb about when they are shown; a prop cannot carry this
	   because the server has no viewport to evaluate a media query against.
	   display: contents makes the wrappers vanish from layout, so the children
	   remain direct flex/positioning children of .frame and .content. */
	.desktop-only {
		display: none;
	}

	.mobile-only {
		display: contents;
	}

	@media (min-width: 1024px) {
		.desktop-only {
			display: contents;
		}

		.mobile-only {
			display: none;
		}
	}

	.content {
		position: relative;
		display: flex;
		flex: 1;
		/* Flex items default to min-height: auto and then refuse to shrink below
		   their content. Without this the page overflows instead of fitting. */
		min-height: 0;
		flex-direction: column;
		align-items: center;
		gap: clamp(8px, 2dvh, 20px);
		background: var(--bg);
		box-shadow: inset 0 0 60px rgb(0 0 0 / 0.4);
		/* Horizontal padding rides the frame width via container query units, so
		   a wider frame gets wider margins instead of one long line of content.
		   cqi resolves against .frame, which declares the container. */
		padding: clamp(16px, 3dvh, 32px) clamp(24px, 5cqi, 48px) clamp(14px, 3dvh, 28px);
		/* Every route inherits the fixed-height frame, so any page whose content
		   genuinely does not fit scrolls here instead of breaking the layout.
		   The linktree is tuned to never reach this point. */
		overflow-y: auto;
		overscroll-behavior: contain;
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
