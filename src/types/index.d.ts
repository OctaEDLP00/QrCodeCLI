import { QRCodeModel } from '../core/QRCodeModel.js'

/**
 * Configuration options for QRCode generation.
 */
export interface QRCodeOptions {
	/**
	 * Text to be encoded
	 * @default ''
	 */
	text?: string
	/**
	 * Width in pixels
	 * @default ''
	 */
	width?: number
	/**
	 * Pixel height
	 * @default 256
	 */
	height?: number
	/**
	 * Color of dark modules
	 * @default '#000000'
	 */
	colorDark?: string
	/**
	 * Color of the light modules
	 * @default '#ffffff'
	 */
	colorLight?: string
	/**
	 * Error correction level
	 *
	 * Possible values
	 * - 0 "L" -> Low ~7%
	 * - 1 "M" -> Medium ~15%
	 * - 2 "Q" -> Quartile ~25%
	 * - 3 "H" -> High ~30%
	 *
	 * @default 2
	 */
	correctLevel?: QrErrorCorrectLevel
	/**
	 * @default 10
	 */
	margin?: number
	/**
	 * @default 4
	 */
	quietZone?: number
	/**
	 * @default 0
	 */
	roundness?: number
	/**
	 * @default 1
	 */
	pixelSize?: number
}

/**
 * CLI Specific options.
 * We omit visual properties that only apply to Canvas/Web renderers.
 */
export interface QRCodeOptionCLI extends Pick<
	QRCodeOptions,
	'text' | 'colorDark' | 'colorLight' | 'correctLevel' | 'quietZone'
> {
	/**
	 * Text is mandatory for CLI execution
	 */
	text: string
	size?: number
}

/**
 * Utility type to allow string-based levels in CLI arguments
 */
export type CLIErrorLevel = 'L' | 'M' | 'Q' | 'H'

/**
 * Error correction levels for QR codes.
 * The higher the level, the more redundancy (and the less data capacity).
 */
export const QrErrorCorrectLevel = {
	/**
	 * Low error correction.
	 * Allows up to ~7% data recovery.
	 */
	L: 0,
	/**
	 * Medium error correction.
	 * Allows up to ~15% data recovery.
	 */
	M: 1,
	/**
	 * Quartile error correction.
	 * Allows up to ~25% data recovery.
	 */
	Q: 2,
	/**
	 * High error correction.
	 * Allows up to ~30% data recovery.
	 */
	H: 3,
} as const

type QrErrorCorrectLevel = (typeof QrErrorCorrectLevel)[keyof typeof QrErrorCorrectLevel]

/**
 *
 */
export interface DrawingProvider {
	draw(model: QRCodeModel): void
	clear(): void
}
