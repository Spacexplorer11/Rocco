import adapter from "@sveltejs/adapter-cloudflare";
import * as child_process from "node:child_process";
import tailwindcss from "@tailwindcss/vite";
import { enhancedImages } from "@sveltejs/enhanced-img";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [
		enhancedImages(),
		tailwindcss(),
		sveltekit({
			compilerOptions: {
				runes: ({ filename }) => (filename.split(/[/\\]/).includes("node_modules") ? undefined : true)
			},

			// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
			// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
			// See https://svelte.dev/docs/kit/adapters for more information about adapters.
			adapter: adapter(),

			version: {
				name: (() => {
					try {
						return child_process.execSync("git rev-parse HEAD", { encoding: "utf8" }).trim();
					} catch {
						return process.env.WORKERS_CI_COMMIT_SHA ?? Date.now().toString();
					}
				})()
			}
		})
	]
});
