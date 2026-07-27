<script lang="ts">
	import { nav } from '$lib/nav';

	let open = $state(false);
</script>

<svelte:window
	onkeydown={(e) => {
		if (e.key === 'Escape') open = false;
	}}
/>

<div class="menu">
	{#if open}
		<!-- Backdrop closes on tap. It sits behind the panel but above the page,
		     so the panel itself stays clickable. -->
		<button class="backdrop" aria-label="Menü schließen" onclick={() => (open = false)}
		></button>
		<nav class="panel">
			{#each nav as item (item.href)}
				<a href={item.href} onclick={() => (open = false)}>{item.label}</a>
			{/each}
		</nav>
	{/if}

	<button
		class="toggle"
		aria-expanded={open}
		aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
		onclick={() => (open = !open)}
	>
		<span></span>
		<span></span>
		<span></span>
	</button>
</div>

<style>
	.menu {
		position: absolute;
		bottom: 14px;
		left: 14px;
		z-index: 20;
	}

	/* Covers the frame, not the viewport — the frame is the positioning context. */
	.backdrop {
		position: fixed;
		inset: 0;
		z-index: -1;
		border: none;
		background: transparent;
	}

	.panel {
		position: absolute;
		bottom: 52px;
		left: 0;
		display: flex;
		min-width: 160px;
		flex-direction: column;
		gap: 10px;
		border: 2px solid var(--paper);
		border-radius: 10px;
		background: #161616;
		box-shadow: 5px 5px 0 var(--accent);
		padding: 14px 20px;
	}

	.panel a {
		font-family: var(--font-mono);
		font-size: var(--text-lg);
		letter-spacing: 1px;
		color: var(--paper);
	}

	.toggle {
		display: flex;
		width: 40px;
		height: 40px;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 5px;
		border: none;
		background: transparent;
		cursor: pointer;
		padding: 0;
	}

	.toggle span {
		width: 20px;
		height: 2px;
		background: var(--paper);
		transition: transform 0.2s ease, opacity 0.2s ease;
	}

	/* Burger morphs into an X while open. */
	.toggle[aria-expanded='true'] span:nth-child(1) {
		transform: translateY(7px) rotate(45deg);
	}
	.toggle[aria-expanded='true'] span:nth-child(2) {
		opacity: 0;
	}
	.toggle[aria-expanded='true'] span:nth-child(3) {
		transform: translateY(-7px) rotate(-45deg);
	}
</style>
