import { QRCodeModel } from './core/QRCodeModel.js'
import { ConsoleDrawing } from './renderer/ConsoleDrawing.js'
import { QrErrorCorrectLevel } from './types/index.d.js'
import type { QRCodeOptionCLI, CLIErrorLevel } from './types/index.d.js'
import { Command } from 'commander'

/**
 * Finds the minimum QR version required for the given data and error level.
 * @param {string} data - The text to encode.
 * @param {CLIErrorLevel} level - Error correction level.
 * @returns {number} The optimal version (1-40).
 */
const getOptimalVersion = (data: string, level: QrErrorCorrectLevel): number => {
	for (let v = 1; v <= 40; v++) {
		try {
			const testModel = new QRCodeModel(v, level)
			testModel.addData(data)
			testModel.make()
			return v
		} catch (e) {
			if (v === 40) throw new Error('Data too long for a standard QR Code.')
			continue
		}
	}
	return 4
}

const program = new Command()

program.name('qrx').description('Professional QR Code generation in your terminal').version('1.0.0')

program
	.argument('<text>', 'Text or URL to encode')
	.option('-s, --size <number>', 'Scale factor (1, 2, 3...)', v => parseInt(v, 10), 1)
	.option('-q, --quiet-zone <number>', 'Quiet zone (padding)', v => parseInt(v, 10), 4)
	.option('-l, --level <type>', 'Error correction level (L, M, Q, H)', 'M')
	.option('--dark <color>', 'ANSI for dark modules', '\x1b[40m  \x1b[0m')
	.option('--light <color>', 'ANSI for light modules', '\x1b[47m  \x1b[0m')
	.action((text: string, options) => {
		try {
			const levelMap: Record<string, QrErrorCorrectLevel> = {
				L: QrErrorCorrectLevel.L,
				M: QrErrorCorrectLevel.M,
				Q: QrErrorCorrectLevel.Q,
				H: QrErrorCorrectLevel.H,
			}

			const selectedLevel = options.level.toUpperCase() as CLIErrorLevel
			if (!(selectedLevel in levelMap)) {
				throw new Error(`Invalid error level: ${options.level}. Use L, M, Q, or H.`)
			}

			const correctLevel = levelMap[selectedLevel] ?? 'M'

			// 1. Configuración de opciones CLI
			const cliOptions: Required<QRCodeOptionCLI> = {
				text,
				quietZone: options.quietZone ?? 4,
				correctLevel,
				colorDark: options.dark,
				colorLight: options.light,
				size: options.size,
			}

			// 2. Selección automática de versión para evitar Overflows
			const optimalVersion = getOptimalVersion(text, correctLevel)

			// 3. Generación del modelo real
			const model = new QRCodeModel(optimalVersion, correctLevel)
			model.addData(text)
			model.make()

			// 4. Renderizado
			const terminal = new ConsoleDrawing(cliOptions)
			terminal.draw(model)
		} catch (error) {
			const msg = error instanceof Error ? error.message : 'Unknown error'
			process.stderr.write(`\x1b[31m[ERROR]\x1b[0m ${msg}\n`)
			process.exit(1)
		}
	})

program.parse()
