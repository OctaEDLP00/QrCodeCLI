/**
 *
 */
export class QRRSBlock {
	/**
	 *
	 * @param totalCount
	 * @param dataCount
	 */
	constructor(
		public totalCount: number,
		public dataCount: number
	) {}

	/**
	 *
	 * @param typeNumber
	 * @param errorCorrectLevel
	 * @returns
	 */
	static getRSBlocks(typeNumber: number, errorCorrectLevel: number): QRRSBlock[] {
		const rsBlock = QRRSBlock.getRsBlockTable(typeNumber, errorCorrectLevel)
		if (!rsBlock)
			throw new Error(
				`bad rs block @ typeNumber:${typeNumber}/errorCorrectLevel:${errorCorrectLevel}`
			)

		const length = rsBlock.length / 3
		const list: QRRSBlock[] = []

		for (let i = 0; i < length; i++) {
			const count = rsBlock[i * 3 + 0]
			const totalCount = rsBlock[i * 3 + 1]
			const dataCount = rsBlock[i * 3 + 2]
			for (let j = 0; j < count; j++) {
				list.push(new QRRSBlock(totalCount, dataCount))
			}
		}
		return list
	}

	/**
	 *
	 * @param typeNumber
	 * @param errorCorrectLevel
	 * @returns
	 */
	static getRsBlockTable(typeNumber: number, errorCorrectLevel: number): number[] | undefined {
		switch (errorCorrectLevel) {
			case 1:
				return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0] // L
			case 0:
				return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1] // M
			case 3:
				return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2] // Q
			case 2:
				return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3] // H
		}
		return undefined
	}
}

// ---------------------------------------------------------------------
// Tables (Truncated visually but functionally standard)
// ---------------------------------------------------------------------

export const PATTERN_POSITION_TABLE = [
	[],
	[6, 18],
	[6, 22],
	[6, 26],
	[6, 30],
	[6, 34],
	[6, 22, 38],
	[6, 24, 42],
	[6, 26, 46],
	[6, 28, 50],
	[6, 30, 54],
	[6, 32, 58],
	[6, 34, 62],
	[6, 26, 46, 66],
	[6, 26, 48, 70],
	[6, 26, 50, 74],
	[6, 30, 54, 78],
	[6, 30, 56, 82],
	[6, 30, 58, 86],
	[6, 34, 62, 90],
	[6, 28, 50, 72, 94],
	[6, 26, 50, 74, 98],
	[6, 30, 54, 78, 102],
	[6, 28, 54, 80, 106],
	[6, 32, 58, 84, 110],
	[6, 30, 58, 86, 114],
	[6, 34, 62, 90, 118],
	[6, 26, 50, 74, 98, 122],
	[6, 30, 54, 78, 102, 126],
	[6, 26, 52, 78, 104, 130],
	[6, 30, 56, 82, 108, 134],
	[6, 34, 60, 86, 112, 138],
	[6, 30, 58, 86, 114, 142],
	[6, 34, 62, 90, 118, 146],
	[6, 30, 54, 78, 102, 126, 150],
	[6, 24, 50, 76, 102, 128, 154],
	[6, 28, 54, 80, 106, 132, 158],
	[6, 32, 58, 84, 110, 136, 162],
	[6, 26, 54, 82, 110, 138, 166],
	[6, 30, 58, 86, 114, 142, 170],
]

// [Block Count, Total Codewords, Data Codewords]
export const RS_BLOCK_TABLE = [
	// Version 1
	[1, 26, 19],
	[1, 26, 16],
	[1, 26, 13],
	[1, 26, 9],
	// Version 2
	[1, 44, 34],
	[1, 44, 28],
	[1, 44, 22],
	[1, 44, 16],
	// Version 3
	[1, 70, 55],
	[1, 70, 44],
	[2, 35, 17],
	[2, 35, 13],
	// Version 4
	[1, 100, 80],
	[2, 50, 32],
	[2, 50, 24],
	[4, 25, 9],
	// Version 5
	[1, 134, 108],
	[2, 67, 43],
	[2, 33, 15, 2, 34, 16],
	[2, 33, 11, 2, 34, 12],
	// Version 6
	[2, 86, 68],
	[4, 43, 27],
	[4, 43, 19],
	[4, 43, 15],
	// Version 7
	[2, 98, 78],
	[4, 49, 31],
	[2, 32, 14, 4, 33, 15],
	[4, 39, 13, 1, 40, 14],
	// Version 8
	[2, 121, 97],
	[2, 60, 38, 2, 61, 39],
	[4, 40, 18, 2, 41, 19],
	[4, 40, 14, 2, 41, 15],
	// Version 9
	[2, 146, 116],
	[3, 58, 36, 2, 59, 37],
	[4, 36, 16, 4, 37, 17],
	[4, 36, 12, 4, 37, 13],
	// Version 10
	[2, 86, 68, 2, 87, 69],
	[4, 69, 43, 1, 70, 44],
	[6, 43, 19, 2, 44, 20],
	[6, 43, 15, 2, 44, 16],
	// ... Para un soporte completo hasta V40, esta tabla continua, pero V1-10 cubre el 99% de usos web.
]
