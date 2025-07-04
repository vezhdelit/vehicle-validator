# Vehicle Validator 🚗

A TypeScript library for validating European vehicle license plates according to official formatting rules.

[![CI](https://github.com/username/vehicle-validator/workflows/CI/badge.svg)](https://github.com/username/vehicle-validator/actions)
[![npm version](https://badge.fury.io/js/vehicle-validator.svg)](https://badge.fury.io/js/vehicle-validator)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- ✅ **13 European Countries Supported**: Austria, Bulgaria, Croatia, Czech Republic, Germany, Hungary, Luxembourg, Poland, Romania, Slovakia, Slovenia, Switzerland, Ukraine
- ✅ **TypeScript First**: Full type safety with comprehensive type definitions
- ✅ **Zero Dependencies**: Lightweight and fast
- ✅ **Detailed Validation**: Returns specific error codes and messages
- ✅ **Official Standards**: Based on official government formatting rules
- ✅ **Tree Shakeable**: Only import what you need

## Installation

```bash
npm install vehicle-validator
```

```bash
pnpm add vehicle-validator
```

```bash
yarn add vehicle-validator
```

## Quick Start

```typescript
import { validateVehiclePlate } from 'vehicle-validator';

// Valid Austrian plate
const result = validateVehiclePlate({
  country: 'at',
  plate: 'W123AB'
});

console.log(result);
// { valid: true, error: null, message: null, target: "plate" }
```

## Supported Countries

| Country | Code | Example Plates | Format Description |
|---------|------|----------------|-------------------|
| 🇦🇹 Austria | `at` | `W123AB`, `L456CD` | Regional code + numbers + letters |
| 🇧🇬 Bulgaria | `bg` | `CA1234BT`, `E9876HH` | Region + numbers + letters |
| 🇭🇷 Croatia | `hr` | `ZG123AB`, `ST456CD` | City + numbers + letters |
| 🇨🇿 Czech Republic | `cz` | `1A23456`, `8B98765` | Number + letter + numbers |
| 🇩🇪 Germany | `de` | `B-MW123`, `M-AB1234` | City-abbreviation + numbers/letters |
| 🇭🇺 Hungary | `hu` | `ABC123`, `XYZ456` | Letters + numbers |
| 🇱🇺 Luxembourg | `lu` | `1234AB`, `9876XY` | Numbers + letters |
| 🇵🇱 Poland | `pl` | `WA12345`, `KR98765` | Region + numbers |
| 🇷🇴 Romania | `ro` | `B123ABC`, `CJ456DEF` | County + numbers + letters |
| 🇸🇮 Slovenia | `si` | `LJ123AB`, `MB456CD` | Region + numbers + letters |
| 🇸🇰 Slovakia | `sk` | `BA123AB`, `KE456CD` | Region + numbers + letters |
| 🇨🇭 Switzerland | `ch` | `ZH123456`, `BE789012` | Canton + numbers |
| 🇺🇦 Ukraine | `ua` | `AA1234BB`, `KA9876II` | Region + numbers + region |

## API Reference

### `validateVehiclePlate(params)`

Validates a vehicle license plate for European countries.

#### Parameters

- `params.country` (string): Two-letter ISO country code (lowercase)
- `params.plate` (string): License plate (uppercase letters, numbers, hyphens)

#### Returns

```typescript
interface PlateResult {
  valid: boolean;
  error: string | null;
  message: string | null;
  target: "country" | "plate";
}
```

#### Error Codes

| Error Code | Description | Example |
|------------|-------------|---------|
| `missing_params` | Required parameter missing | Missing country or plate |
| `invalid_plate_length` | Plate length outside 3-9 chars | Plate too short/long |
| `invalid_plate_format` | Invalid characters used | Lowercase letters, symbols |
| `invalid_country_format` | Invalid country-specific format | Wrong pattern for country |

## Examples

### Basic Validation

```typescript
import { validateVehiclePlate } from 'vehicle-validator';

// ✅ Valid German plate
const germanPlate = validateVehiclePlate({
  country: 'de',
  plate: 'B-MW123'
});
// Result: { valid: true, error: null, message: null, target: "plate" }

// ❌ Invalid format
const invalidPlate = validateVehiclePlate({
  country: 'at',
  plate: 'invalid-plate'
});
// Result: { valid: false, error: "invalid_plate_format", message: "...", target: "plate" }
```

### Error Handling

```typescript
const result = validateVehiclePlate({
  country: 'pl',
  plate: 'AB'  // Too short
});

if (!result.valid) {
  console.error(`Validation failed: ${result.message}`);
  console.error(`Error code: ${result.error}`);
  console.error(`Problem with: ${result.target}`);
}
```

### Batch Validation

```typescript
const plates = [
  { country: 'at', plate: 'W123AB' },
  { country: 'de', plate: 'B-MW123' },
  { country: 'pl', plate: 'WA12345' }
];

const results = plates.map(validateVehiclePlate);
const validPlates = results.filter(r => r.valid);

console.log(`${validPlates.length}/${plates.length} plates are valid`);
```

## Development

### Setup

```bash
git clone https://github.com/username/vehicle-validator.git
cd vehicle-validator
pnpm install
```

### Available Scripts

```bash
pnpm dev      # Run tests in watch mode
pnpm test     # Run tests once
pnpm build    # Build the package
pnpm lint     # Type checking
pnpm ci       # Run full CI pipeline (lint + test + build)
```

### Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-country`
3. Add tests for your changes
4. Make sure all tests pass: `pnpm test`
5. Submit a pull request

## Roadmap

- [ ] Add more European countries (France, Italy, Spain, etc.)
- [ ] Support for special plate types (diplomatic, temporary, etc.)
- [ ] Validation history and caching
- [ ] Browser/CDN bundle
- [ ] REST API version

## License

MIT © [Vasyl Vezhdel](https://github.com/username)

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for release history.

---

Made with ❤️ for the European automotive community