<script lang="ts">
	import LinkCard from '$lib/components/LinkCard.svelte';
	import { links, banknoteFor } from '$lib/links';
</script>

<svelte:head>
	<title>schnur23</title>
	<meta name="description" content="Alle Links von schnur23 an einem Ort." />
</svelte:head>

<img class="logo" src="/schnur23-logo.png" alt="schnur23" width="220" height="110" />

<div class="divider"></div>

<nav class="links" aria-label="Links">
	{#each links as link, i (link.label)}
		<LinkCard label={link.label} href={link.href} note={banknoteFor(i)} index={i} />
	{/each}
</nav>

<div class="sticker-row">
	<img src="/schnur23-avatar.png" alt="" width="170" height="170" />
	<div class="rule"></div>
</div>

<div class="stay-tuned">
	<span>STAY TUNED!</span>
</div>

<style>
	/* These elements are direct flex children of .content in +layout.svelte —
	   there is no wrapper — so the vertical fit is tuned from here. */

	.logo {
		flex: 0 1 auto;
		width: 100%;
		max-width: 220px;
		height: clamp(64px, 12dvh, 110px);
		object-fit: contain;
	}

	.divider {
		flex: none;
		width: 100%;
		height: 1px;
		background: repeating-linear-gradient(90deg, var(--paper) 0 8px, transparent 8px 14px);
		opacity: 0.5;
	}

	.links {
		display: flex;
		/* Grows into spare space and shrinks first when there is none. The
		   min-height: 0 is what allows the shrinking at all. */
		flex: 1 1 auto;
		min-height: 0;
		flex-direction: column;
		/* "safe" keeps the first card reachable once the stack overflows —
		   plain centering would push it out of the scrollable area. */
		justify-content: safe center;
		/* Last resort only: everything above is meant to make this unnecessary. */
		overflow-y: auto;
		/* Cards are rotated, offset by up to 10px and carry a 5px shadow.
		   overflow-y forces overflow-x to clip, so the box is widened by the
		   same amount and pulled back with a negative margin. */
		width: calc(100% + 32px);
		margin-inline: -16px;
		padding: 6px 16px;
	}

	.sticker-row {
		display: flex;
		flex: 0 1 auto;
		min-height: 0;
		width: 100%;
		height: clamp(80px, 19dvh, 170px);
		align-items: center;
		gap: 16px;
	}

	/* Decorative mascot: alt="" keeps it out of the accessibility tree. */
	.sticker-row img {
		height: 100%;
		width: auto;
		max-width: 170px;
		flex-shrink: 0;
		object-fit: contain;
	}

	.rule {
		flex: 1;
		height: 1px;
		background: repeating-linear-gradient(90deg, var(--paper) 0 6px, transparent 6px 10px);
		opacity: 0.4;
	}

	.stay-tuned {
		position: relative;
		flex: none;
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
