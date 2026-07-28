import adapter from '@sveltejs/adapter-node';
import { sveltekit } from '@sveltejs/kit/vite';
import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		// Turns `~icons/<set>/<name>` imports into inlined Svelte components at
		// build time. Only the icons actually imported end up in the bundle, so
		// the icon sets stay dev dependencies.
		Icons({ compiler: 'svelte' }),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},

			// Standalone Node server (`node build`), which is what the Docker
			// image runs behind Caddy.
			adapter: adapter()
		})
	]
});
