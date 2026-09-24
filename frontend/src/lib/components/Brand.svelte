<script lang="ts">
	let {
		// \n is a real line break here — .title uses white-space: pre-line.
		title = 'LUX\nXER 23',
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

		<!-- One rises behind each digit of the 23. Each sits in a box clipped at
		     the top edge of the digits, so sliding past its bottom hides it
		     completely. They come before the title in the markup so the title
		     paints over their feet. -->
		<span class="peek devil" aria-hidden="true">
			<img src="/tux-devil.gif" alt="" width="103" height="100" />
		</span>
		<span class="peek angel" aria-hidden="true">
			<!-- Two elements, because the fretting is a transform as well and one
			     element runs only one animation per property: the outer one lifts,
			     the inner one frets. -->
			<span class="lift">
				<img class="fret" src="/tux-angel.gif" alt="" width="93" height="100" />
			</span>
		</span>

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
		/* Set here rather than on .title so the mascots can size in em too.
		   Overridable from the outside: set --brand-size on any ancestor. */
		font-size: var(--brand-size, var(--text-2xl));
	}

	.ring {
		position: absolute;
		/* Starts slightly outside the glyphs instead of cutting through them. */
		inset: -5px;
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
		/* Positioned so it paints over the mascots, which come first. */
		position: relative;
		font-family: var(--font-brand);
		font-weight: 800;
		line-height: 1;
		/* Keeps the \n in the title as a line break. */
		white-space: pre-line;
		letter-spacing: -0.02em;
		/* Left, not centred: the lines stack flush like a wordmark. .core still
		   centres the block itself, so only the lines align to each other. */
		text-align: left;
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

	/* Offsets are measured from the bottom right of .core, which is where the
	   23 sits, and in em so they follow --brand-size. The boxes match the GIF
	   aspect ratio so nothing sticks out sideways. */
	.peek {
		position: absolute;
		bottom: 0.58em;
		height: 1em;
		overflow: hidden;
		pointer-events: none;
	}

	.devil {
		right: 0.92em;
		width: 1.04em;
	}

	.angel {
		right: 0;
		width: 0.92em;
	}

	.peek img {
		display: block;
		height: 1em;
		width: auto;
		user-select: none;
	}

	.lift {
		display: block;
	}

	/* One 22s cycle: devil, angel, devil again, then both — angel first, devil
	   following, the angel startled, and the two leaving in the order they came.
	   translateY(110%) resolves against the element's own height, so it drops
	   just past the bottom of its clip box; 0 is the resting pose. */
	.devil img {
		animation: peek-devil 22s ease-in-out infinite;
	}

	.lift {
		animation: peek-angel 22s ease-in-out infinite;
	}

	.fret {
		/* Same duration as the peek, so the two timelines stay aligned. steps(1)
		   holds each pose and snaps to the next one. */
		animation: fret 22s steps(1, end) infinite;
		transform-origin: 50% 90%;
	}

	@keyframes peek-devil {
		0%,
		4% {
			transform: translateY(110%);
		}
		7%,
		14% {
			transform: translateY(0);
		}
		17%,
		36% {
			transform: translateY(110%);
		}
		39%,
		46% {
			transform: translateY(0);
		}
		49%,
		60% {
			transform: translateY(110%);
		}
		/* Joins the angel, and stays until after he has fled. */
		63%,
		88% {
			transform: translateY(0);
		}
		92%,
		100% {
			transform: translateY(110%);
		}
	}

	@keyframes peek-angel {
		0%,
		20% {
			transform: translateY(110%);
		}
		23%,
		30% {
			transform: translateY(0);
		}
		33%,
		54% {
			transform: translateY(110%);
		}
		/* Up first at the meeting, gone first once he has seen the company. */
		57%,
		80% {
			transform: translateY(0);
		}
		84%,
		100% {
			transform: translateY(110%);
		}
	}

	/* A glance right, a glance left, each held for a beat. scaleX(-1) mirrors
	   him; the stepped timing makes the turn instant instead of scaling him
	   through zero. */
	@keyframes fret {
		0%,
		64% {
			transform: translateX(0) scaleX(1);
		}
		67% {
			transform: translateX(-2px) scaleX(-1);
		}
		71% {
			transform: translateX(2px) scaleX(1);
		}
		74% {
			transform: translateX(-2px) scaleX(-1);
		}
		77% {
			transform: translateX(2px) scaleX(1);
		}
		79%,
		100% {
			transform: translateX(0) scaleX(1);
		}
	}

	/* Resting pose instead of hidden, so they are still there, just still. */
	@media (prefers-reduced-motion: reduce) {
		.devil img,
		.lift,
		.fret {
			animation: none;
			transform: none;
		}
	}
</style>
