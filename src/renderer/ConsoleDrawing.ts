import { QRCodeModel } from '../core/QRCodeModel.js'
import type { QRCodeOptionCLI } from '../types/index.js'

/**
 * Console-based renderer for CLI environments.
 */
export class ConsoleDrawing {
	private _options: Required<QRCodeOptionCLI>

	/**
	 * @param {Required<QRCodeOptionCLI>} vOption
	 */
	constructor(vOption: Required<QRCodeOptionCLI>) {
		this._options = vOption
	}

	/**
	 * Draws the QR Code in the terminal using Unicode blocks.
	 * @param model
	 */
	draw(model: QRCodeModel): void {
		const moduleCount = model.getModuleCount()
		const { quietZone } = this._options

		const BG_BLACK = '\x1b[40m'
		const BG_WHITE = '\x1b[47m'
		const RESET = '\x1b[0m'

		let output = '\n'

		for (let r = -quietZone; r < moduleCount + quietZone; r++) {
			let line = ''
			for (let c = -quietZone; c < moduleCount + quietZone; c++) {
				const isInside = r >= 0 && r < moduleCount && c >= 0 && c < moduleCount
				const isDark = isInside && model.isDark(r, c)

				if (isDark) {
					line += `${BG_BLACK}  ${RESET}`
				} else {
					line += `${BG_WHITE}  ${RESET}`
				}
			}
			output += line + '\n'
		}

		process.stdout.write(output + '\n')
	}

	/**
	 * Clears the terminal screen.
	 */
	clear(): void {
		process.stdout.write('\x1b[2J\x1b[0f')
	}
}
