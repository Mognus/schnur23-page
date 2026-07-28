<script lang="ts">
	let {
		// \n is a real line break here — .title uses white-space: pre-line.
		title = 'FREIER\nFREIER23',
		href = undefined,
		waves = 3,
		duration = 9,
		spread = 2.8
	}: {
		title?: string;
		href?: string;
		/** Number of rings travelling outward at the same time. */
		waves?: number;
		/** Seconds for one ring to go from the text box to its full size. */
		duration?: number;
		/** How far a ring grows, as a multiple of the text box. */
		spread?: number;
	} = $props();

	// Negative delays spread the rings evenly across one cycle. Without them all
	// rings would start stacked on the first frame and pulse in unison.
	const delays = $derived(Array.from({ length: waves }, (_, i) => (-i * duration) / waves));
</script>

<div class="brand" style="--duration: {duration}s; --spread: {spread};">
	<div class="core">
		{#each delays as delay, i (i)}
			<span class="ring" style="animation-delay: {delay}s" aria-hidden="true"></span>
		{/each}

		<!-- Without a href this is a signature, not navigation, so it must not
		     render as a link. -->
		<svelte:element
			this={href ? 'a' : 'span'}
			{href}
			target={href ? '_blank' : undefined}
			rel={href ? 'noopener noreferrer' : undefined}
			class="title"
		>
			{title}
		</svelte:element>
	</div>
</div>

<style>
	.brand {
		display: grid;
		place-items: center;
		/* Deliberately does not clip: this box is only as big as the text, so
		   clipping here would swallow the rings the moment they leave it.
		   Bounding them is the caller's job. */
	}

	/* Sized by the text alone — the rings are absolute and scale off this box,
	   which is what lets the whole thing work without pixel props. */
	.core {
		position: relative;
		display: grid;
		place-items: center;
	}

	.ring {
		position: absolute;
		/* Starts slightly outside the glyphs instead of cutting through them. */
		inset: -14px;
		border: 1px solid var(--paper);
		opacity: 0.4;
		pointer-events: none;
		animation: brand-wave var(--duration) linear infinite;
	}

	@keyframes brand-wave {
		from {
			opacity: 0.4;
			transform: scale(1);
		}
		to {
			opacity: 0;
			transform: scale(var(--spread));
		}
	}

	.title {
		/* Overridable from the outside: set --brand-size on any ancestor. */
		font-family: var(--font-brand);
		font-size: var(--brand-size, var(--text-2xl));
		font-weight: 800;
		line-height: 1;
		/* Keeps the \n in the title as a line break. */
		white-space: pre-line;
		letter-spacing: -0.02em;
		text-align: center;
		text-transform: uppercase;
		color: var(--paper);
	}

	a.title {
		transition: color 0.15s ease;
	}

	a.title:hover,
	a.title:focus-visible {
		color: var(--accent);
	}
</style>
