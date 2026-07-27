<script lang="ts">
	let { text, duration = 14 }: { text: string; duration?: number } = $props();
</script>

<div class="ticker">
	<!-- The text is rendered twice so translateX(-50%) lands exactly on the
	     start of the copy — that is what makes the loop seamless. -->
	<div class="track" style="animation-duration: {duration}s">
		<span>{text}</span>
		<span aria-hidden="true">{text}</span>
	</div>
</div>

<style>
	.ticker {
		flex-shrink: 0;
		overflow: hidden;
		background: var(--ink);
		padding: 4px 0;
	}

	.track {
		display: flex;
		width: max-content;
		white-space: nowrap;
		animation: ticker linear infinite;
	}

	.track span {
		padding-right: 24px;
		font-family: var(--font-mono);
		font-size: var(--text-md);
		letter-spacing: 2px;
		color: var(--accent);
	}

	@keyframes ticker {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-50%);
		}
	}
</style>
