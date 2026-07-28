<script lang="ts">
	import { page } from '$app/state';
	import { nav } from '$lib/nav';
</script>

<!-- Desktop counterpart to BurgerMenu. Which of the two is shown is not this
     component's business — the layout owns that breakpoint. -->
<aside class="sidebar">
	<a class="brand" href="/" aria-label="schnur23 — Startseite">
		<img src="/schnur23-logo.webp" alt="" width="700" height="369" />
	</a>

	<nav aria-label="Hauptnavigation">
		{#each nav as item (item.href)}
			<a
				href={item.href}
				aria-current={page.url.pathname === item.href ? 'page' : undefined}
			>
				{item.label}
			</a>
		{/each}
	</nav>
</aside>

<style>
	.sidebar {
		display: flex;
		flex-direction: column;
		/* Never shrinks: the content column takes the hit when space runs out. */
		flex: none;
		width: 240px;
		gap: 28px;
		border-right: 2px solid var(--paper);
		background: var(--bg);
		padding: 24px 20px;
	}

	.brand img {
		width: 100%;
		height: auto;
		object-fit: contain;
	}

	nav {
		display: flex;
		flex-direction: column;
		gap: 14px;
	}

	nav a {
		font-family: var(--font-graffiti);
		font-size: var(--text-lg);
		letter-spacing: 1px;
		color: var(--paper);
		/* Slight tilt so the tags do not sit on a ruler-straight line. */
		transform: rotate(-1.5deg);
		transform-origin: left center;
		transition: color 0.15s ease, transform 0.15s ease;
	}

	nav a:hover,
	nav a:focus-visible {
		color: var(--accent);
		transform: rotate(-1.5deg) translateX(4px);
	}

	/* Current route stays marked without relying on colour alone. */
	nav a[aria-current='page'] {
		color: var(--accent);
		text-decoration: underline wavy;
		text-underline-offset: 5px;
	}
</style>
