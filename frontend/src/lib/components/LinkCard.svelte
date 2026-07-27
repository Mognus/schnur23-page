<script lang="ts">
	import type { Banknote } from '$lib/links';

	let {
		label,
		href,
		note,
		index
	}: { label: string; href: string | null; note: Banknote; index: number } = $props();

	// Later cards overlap earlier ones, so the stack reads top to bottom.
	const stackStyle = $derived(
		`--note-bg:${note.bg}; --note-border:${note.border}; --note-ink:${note.ink};` +
			`--tilt:${note.tilt}deg; --shift:${note.shift}px; z-index:${index + 1};`
	);
</script>

<!-- A card without a href is not a link yet, so it must not render as one. -->
<svelte:element
	this={href ? 'a' : 'div'}
	href={href ?? undefined}
	target={href ? '_blank' : undefined}
	rel={href ? 'noopener noreferrer' : undefined}
	class="note"
	class:soon={!href}
	style={stackStyle}
>
	<span class="denom" aria-hidden="true">{note.denom}</span>
	<span class="icon" aria-hidden="true">{note.icon}</span>

	<span class="body">
		<span class="brand">SCHNUR23</span>
		<span class="label">{label}</span>
		{#if !href}
			<span class="badge">// SOON</span>
		{/if}
	</span>

	<span class="currency" aria-hidden="true">€</span>
</svelte:element>

<style>
	.note {
		position: relative;
		display: flex;
		width: 100%;
		/* Gives a little on short screens before the stack starts scrolling. */
		min-height: clamp(46px, 7dvh, 56px);
		align-items: center;
		justify-content: space-between;
		border: 3px double var(--note-border);
		border-radius: 2px;
		background: var(--note-bg);
		box-shadow: 5px 5px 0 var(--accent);
		padding: 8px 24px;
		/* Negative margin makes the notes overlap like a stack of bills. */
		margin-top: -5px;
		transform: rotate(var(--tilt)) translateX(var(--shift));
		transition: transform 0.15s ease, box-shadow 0.15s ease;
	}

	.note:not(.soon):hover,
	.note:not(.soon):focus-visible {
		transform: rotate(var(--tilt)) translateX(var(--shift)) translateY(-2px);
		box-shadow: 0 6px 0 rgb(0 0 0 / 0.5), 0 10px 22px rgb(0 0 0 / 0.45);
	}

	.denom {
		position: absolute;
		top: 3px;
		left: 6px;
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--note-ink);
		opacity: 0.65;
	}

	.icon {
		font-size: var(--text-lg);
		line-height: 1;
		color: var(--note-ink);
	}

	.body {
		display: flex;
		flex: 1;
		flex-direction: column;
		align-items: center;
		gap: 1px;
	}

	.brand {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		line-height: 1;
		color: var(--note-ink);
		opacity: 0.6;
	}

	.label {
		font-family: var(--font-display);
		font-size: var(--text-lg);
		line-height: 1.1;
		letter-spacing: 2px;
		color: var(--note-ink);
		white-space: nowrap;
	}

	.badge {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		letter-spacing: 3px;
		color: var(--note-ink);
		opacity: 0.7;
	}

	.currency {
		font-family: var(--font-display);
		font-size: var(--text-xl);
		color: var(--note-ink);
	}
</style>
