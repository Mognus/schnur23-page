<script lang="ts">
	import { page } from '$app/state';

	// The shell prompt doubles as the breadcrumb: it shows the current route,
	// with "/" being the linktree itself.
	const cwd = $derived(page.url.pathname.split('/').filter(Boolean).at(-1) ?? 'linktree');
</script>

<div class="bar">
	<span class="prompt">root@schnur23:~/{cwd}</span>

	<!-- Purely decorative window buttons with no behaviour, so hide from AT. -->
	<div class="buttons" aria-hidden="true">
		<span>_</span>
		<span>□</span>
		<span>×</span>
	</div>
</div>

<style>
	.bar {
		display: flex;
		flex-shrink: 0;
		align-items: center;
		justify-content: space-between;
		gap: 8px;
		background: var(--paper);
		padding: 6px 10px;
	}

	.prompt {
		min-width: 0;
		font-family: var(--font-mono);
		font-size: var(--text-md);
		letter-spacing: 1px;
		color: var(--ink);
		/* Long route names must not push the window buttons out of the bar. */
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.buttons {
		display: flex;
		flex-shrink: 0;
		gap: 5px;
	}

	.buttons span {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 16px;
		height: 16px;
		background: var(--ink);
		color: var(--paper);
		font-family: var(--font-mono);
		font-size: var(--text-sm);
	}
</style>
