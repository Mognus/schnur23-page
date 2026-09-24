<script lang="ts">
	import Brand from '$lib/components/Brand.svelte';
</script>

<svelte:head>
	<title>sign — schnur23</title>
	<meta name="description" content="Created by LuXXer." />
</svelte:head>

<!-- Direct flex child of .content, so it takes the leftover height itself and
     centres the signature in it. -->
<section class="sign">
	<p class="eyebrow">CREATED BY</p>

	<!-- Rings travel further than the component default. duration goes up with
	     spread so the extra distance does not turn into extra speed. -->
	<Brand href="https://luxxer23.de" spread={5} duration={15} />

	<figure class="note">
		<blockquote>
			„Da sah der Pāṇḍava die ganze Welt, vielfach geteilt und doch an einem Ort
			vereint, im Leib des Gottes der Götter.“
		</blockquote>
		<figcaption>— Bhagavad Gita 11,13</figcaption>
	</figure>
</section>

<style>
	.sign {
		display: flex;
		flex: 1 1 auto;
		min-height: 0;
		/* .content centers its children, which sizes them to their content. The
		   section has to claim the full column itself, otherwise the clip below
		   sits at the width of the text block and cuts the rings off there. */
		width: 100%;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		/* The rings need room to travel before they fade out. */
		gap: clamp(28px, 7dvh, 64px);
		/* Brand deliberately lets its rings escape, so they are bounded here —
		   at the page area rather than at the width of the lettering. */
		overflow: clip;
		/* Read by Brand.svelte — the brand should carry the page, so it steps
		   past the schnur23 type scale here. */
		--brand-size: clamp(1.75rem, 9cqi, 3.25rem);
	}

	.eyebrow {
		margin: 0;
		font-family: var(--font-mono);
		font-size: var(--text-lg);
		letter-spacing: 4px;
		color: rgb(244 242 236 / 0.55);
	}

	.note {
		/* Capped in characters, not pixels: this is a block of prose and around
		   50 characters per line is where it stays readable. */
		max-width: 48ch;
		margin: 0;
		font-family: var(--font-body);
		font-size: var(--text-sm);
		line-height: 1.7;
		letter-spacing: 0.5px;
		text-align: center;
		text-wrap: balance;
		color: rgb(244 242 236 / 0.45);
	}

	.note blockquote {
		margin: 0;
	}

	.note figcaption {
		margin-top: 8px;
		font-family: var(--font-mono);
		letter-spacing: 2px;
		color: rgb(244 242 236 / 0.35);
	}
</style>
