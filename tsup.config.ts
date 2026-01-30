import { copyFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { defineConfig } from 'tsup'

export default defineConfig({
	entry: ['./src/cli.ts'],
	format: ['esm'],
	dts: false,
	bundle: true,
	clean: false,
	minify: false,
	sourcemap: false,
	splitting: false,
	tsconfig: './tsconfig.json',
	external: ['commander'],
	name: 'qrx',
	banner: {
		js: '#!/usr/bin/env node',
	},
	onSuccess: async () => {
		const filesToCopy = ['README.md', 'LICENSE', 'package.json']
		await Promise.all(
			filesToCopy.map(async file => {
				try {
					const srcPath = resolve(process.cwd(), file)
					const destPath = resolve(process.cwd(), 'dist', file)
					await copyFile(srcPath, destPath)
					console.log(`Copied ${file} to dist/`)
				} catch (error) {
					console.warn(`Warning: Could not copy ${file}`, error)
				}
			})
		)
	},
})
