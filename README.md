# QRCodeCLI

A professional, high-performance QR Code generation tool for the terminal. Generate QR codes directly in your CLI with full customization support for colors, size, and error correction levels.

## Features

✨ **Fast QR Code Generation** - Efficiently generates QR codes with automatic version detection
🎨 **Terminal Rendering** - Beautiful ANSI-colored output directly in your terminal
⚙️ **Customizable** - Full control over size, colors, quiet zones, and error correction levels
🛡️ **Error Correction** - Multiple error correction levels (L, M, Q, H) for reliable scanning
📦 **TypeScript** - Built with TypeScript for type safety
🧪 **Well Tested** - Comprehensive test coverage with Vitest

## Installation

### Using npm
```bash
npm install -g @qr-render/qrcode-cli
```

### Using pnpm
```bash
pnpm add -g @qr-render/qrcode-cli
```

### Using yarn
```bash
yarn global add @qr-render/qrcode-cli
```

## Quick Start

Generate a simple QR code:
```bash
@qr-render/qrcode-cli "https://example.com"
```

This will display a QR code in your terminal that you can scan with any QR code reader.

## Usage

### Basic Command Structure
```bash
@qr-render/qrcode-cli <text> [options]
```

### Arguments

| Argument | Description | Required |
|----------|-------------|----------|
| `<text>` | The text or URL to encode in the QR code | Yes |

### Options

#### `--size <number>` | `-s <number>`
Scale factor for the QR code modules (pixels). Default: `1`

```bash
@qr-render/qrcode-cli "Hello" --size 2
```

#### `--quiet-zone <number>` | `-q <number>`
The quiet zone (padding) around the QR code in modules. Default: `4`

The quiet zone is the white space around the QR code that helps scanners read it properly.

```bash
@qr-render/qrcode-cli "Hello" --quiet-zone 6
```

#### `--level <type>` | `-l <type>`
Error correction level. Default: `M`

Controls how much of the QR code can be damaged before it becomes unreadable:

| Level | Recovery Capacity | Use Case |
|-------|-------------------|----------|
| `L` | ~7% | Basic applications, clean environments |
| `M` | ~15% | Standard use, recommended |
| `Q` | ~25% | Moderate damage risk |
| `H` | ~30% | Outdoor use, high damage risk |

```bash
@qr-render/qrcode-cli "Important Data" --level H
```

#### `--dark <color>`
ANSI color code for dark modules (the black squares). Default: `\x1b[40m  \x1b[0m` (black background)

Input an ANSI escape code to customize the dark color.

```bash
@qr-render/qrcode-cli "Hello" --dark "\x1b[44m  \x1b[0m"  # Blue background
```

#### `--light <color>`
ANSI color code for light modules (the white squares). Default: `\x1b[47m  \x1b[0m` (white background)

Input an ANSI escape code to customize the light color.

```bash
@qr-render/qrcode-cli "Hello" --light "\x1b[46m  \x1b[0m"  # Cyan background
```

## Examples

### Simple URL Encoding
```bash
@qr-render/qrcode-cli "https://github.com/OctaEDLP00/QrCodeCLI"
```

### Large QR Code with High Error Correction
```bash
@qr-render/qrcode-cli "Payment Code: ABC123XYZ" --size 3 --level H --quiet-zone 5
```

### Minimal QR Code
```bash
@qr-render/qrcode-cli "QR" --size 1 --quiet-zone 2 --level L
```

### Custom Colors (Blue and Green)
```bash
@qr-render/qrcode-cli "Colored QR" --dark "\x1b[44m  \x1b[0m" --light "\x1b[42m  \x1b[0m"
```

### Generate QR Code for WiFi Connection
```bash
@qr-render/qrcode-cli "WiFi-Network-Name" --level H --size 2
```

### Email Address Encoding
```bash
@qr-render/qrcode-cli "mailto:user@example.com?subject=Hello" --level M
```

## Error Correction Levels Explained

QR codes use error correction to remain scannable even if partially damaged. Higher levels add more redundancy:

- **Level L (Low)**: Recommended for clean, protected environments. Smallest QR code size.
- **Level M (Medium)**: Default and recommended for most use cases. Good balance between size and reliability.
- **Level Q (Quartile)**: Use when moderate damage is expected (printing, outdoor use).
- **Level H (High)**: Use for outdoor environments or when maximum durability is needed. Larger QR code size.

## How It Works

1. **Input Parsing** - The CLI parses your input text and options
2. **Optimal Version Selection** - Automatically determines the minimum QR code version (1-40) needed to encode your data without overflow
3. **QR Code Generation** - Creates a QR code model with the selected version and error correction level
4. **Terminal Rendering** - Renders the QR code using ANSI colors and Unicode blocks for beautiful terminal output

## Technical Details

### Data Encoding
- Supports alphanumeric and binary data
- Automatically selects the optimal QR code version based on data length and error correction level
- Versions range from 1 (21×21 modules) to 40 (177×177 modules)

### Terminal Rendering
The QR code is rendered using:
- ANSI escape codes for colors
- Unicode blocks for representing QR modules
- Standard terminal output (stdout/stderr)

### Performance
- Built in TypeScript with zero runtime dependencies (except commander for CLI parsing)
- Efficient module generation and rendering
- Immediate output without compilation delays

## Project Structure

```
src/
├── cli.ts                      # Main CLI entry point
├── core/
│   ├── QRCodeModel.ts         # Core QR code generation
│   ├── QRBitBuffer.ts         # Bit buffer management
│   └── QRRSBlock.ts           # Reed-Solomon error correction
├── libs/
│   ├── QRMath.ts              # Mathematical utilities
│   └── QRPolynomial.ts        # Polynomial arithmetic
├── renderer/
│   └── ConsoleDrawing.ts      # Terminal rendering
└── types/
    └── index.d.ts            # TypeScript definitions
```

## Scripts

### Development
```bash
npm run build          # Build the CLI
npm run test           # Run tests in watch mode
npm run test:run       # Run tests once
npm run lint           # Check code with oxlint
npm run lint:fix       # Fix linting issues
npm run fmt            # Format code
npm run type-check     # Check TypeScript types
```

### Testing
```bash
npm run test:coverage  # Generate coverage report
npm run test:ui        # Run tests with UI dashboard
```

## Error Messages

If you encounter errors, here are common issues and solutions:

| Error | Cause | Solution |
|-------|-------|----------|
| `Invalid error level` | Invalid level argument | Use L, M, Q, or H only |
| `Data too long for a standard QR Code` | Text is too long for any QR version | Use a shorter text or higher data compression |
| `Invalid color code` | ANSI code format is wrong | Ensure proper ANSI escape sequence format |

## Troubleshooting

### QR Code Won't Scan
- Increase the `--quiet-zone` value (default is 4)
- Use a higher error correction level with `--level H`
- Ensure your terminal supports ANSI colors
- Check that the QR code is fully rendered without line wrapping

### Terminal Display Issues
- Ensure your terminal supports Unicode and ANSI colors
- Try using a modern terminal (iTerm2, Windows Terminal, GNOME Terminal, etc.)
- Check terminal font supports block characters

### Color Not Showing
- Verify your terminal supports 256 colors or true color
- Check ANSI escape code syntax
- Try using common ANSI codes like `\x1b[31m` for red

## License

MIT © [OctaEDLP00](https://github.com/OctaEDLP00)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## See Also

- [QR Code Wikipedia](https://en.wikipedia.org/wiki/QR_code)
- [ANSI Escape Codes](https://en.wikipedia.org/wiki/ANSI_escape_code)
- [Commander.js Documentation](https://github.com/tj/commander.js)
