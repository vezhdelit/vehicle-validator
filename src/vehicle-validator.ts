import { validateAustrianPlate } from "./country-validators/at";
import { validateHungarianPlate } from "./country-validators/hu";
import { validateSlovakPlate } from "./country-validators/sk";
import { validatePolishPlate } from "./country-validators/pl";
import { validateUkrainianPlate } from "./country-validators/ua";
import { validateCzechPlate } from "./country-validators/cz";
import { validateCroatianPlate } from "./country-validators/hr";
import { validateBulgarianPlate } from "./country-validators/bg";
import { validateRomanianPlate } from "./country-validators/ro";
import { validateGermanPlate } from "./country-validators/de";
import { validateSlovenianPlate } from "./country-validators/si";
import { validateSwissPlate } from "./country-validators/ch";
import { validateLuxemburgPlate } from "./country-validators/lu";
import type { PlateResult } from "../types/validator";
import type { VehiclePlate } from "../types/vehicle";

/**
 * Validates a vehicle license plate for specific European countries.
 * 
 * This function validates license plates according to the official formatting rules
 * of supported European countries. It performs both basic validation (length, format)
 * and country-specific pattern validation.
 * 
 * @param params - The vehicle plate validation parameters
 * @param params.country - Two-letter ISO country code (lowercase). Supported countries:
 *   - "at" - Austria
 *   - "bg" - Bulgaria  
 *   - "ch" - Switzerland
 *   - "cz" - Czech Republic
 *   - "de" - Germany
 *   - "hr" - Croatia
 *   - "hu" - Hungary
 *   - "lu" - Luxembourg
 *   - "pl" - Poland
 *   - "ro" - Romania
 *   - "si" - Slovenia
 *   - "sk" - Slovakia
 *   - "ua" - Ukraine
 * @param params.plate - License plate string (uppercase letters, numbers, and hyphens only)
 * 
 * @returns A validation result object containing:
 *   - `valid`: Boolean indicating if the plate is valid
 *   - `error`: Error code if validation failed, null if successful
 *   - `message`: Human-readable error message, null if successful
 *   - `target`: Field that caused the error ("country" or "plate")
 * 
 * @example
 * ```typescript
 * // Valid Austrian plate
 * const result = validateVehiclePlate({ country: "at", plate: "W123AB" });
 * console.log(result); // { valid: true, error: null, message: null, target: "plate" }
 * 
 * // Invalid plate format
 * const result2 = validateVehiclePlate({ country: "de", plate: "abc123" });
 * console.log(result2); 
 * // { valid: false, error: "invalid_plate_format", message: "...", target: "plate" }
 * 
 * // Missing country
 * const result3 = validateVehiclePlate({ country: "", plate: "ABC123" });
 * console.log(result3);
 * // { valid: false, error: "missing_params", message: "...", target: "country" }
 * ```
 * 
 * @throws This function does not throw errors, all validation results are returned in the result object
 * 
 * @since 0.0.1
 */
export function validateVehiclePlate({ country, plate }: VehiclePlate): PlateResult {
    if (!country) {
        return {
            valid: false,
            error: "missing_params",
            message: "Plate country are required",
            target: "country"
        };
    }
    if (!plate) {
        return {
            valid: false,
            error: "missing_params",
            message: "Plate are required",
            target: "plate"
        };
    }

    if (plate.length < 3 || plate.length > 9) {
        return {
            valid: false,
            error: "invalid_plate_length",
            message: "Plate must be between 3 and 9 characters long",
            target: "plate"
        };
    }
    if (!/^[A-Z0-9-]+$/.test(plate)) {
        return {
            valid: false,
            error: "invalid_plate_format",
            message: "Plate can only contain uppercase letters, numbers and sometimes hyphen",
            target: "plate"
        };
    }

    if (country === "at") {
        return validateAustrianPlate(plate);
    } else if (country === "hr") {
        return validateCroatianPlate(plate);
    } else if (country === "sk") {
        return validateSlovakPlate(plate);
    } else if (country === "pl") {
        return validatePolishPlate(plate);
    } else if (country === "ua") {
        return validateUkrainianPlate(plate);
    } else if (country === "cz") {
        return validateCzechPlate(plate);
    } else if (country === "hu") {
        return validateHungarianPlate(plate);
    } else if (country === "bg") {
        return validateBulgarianPlate(plate);
    } else if (country === "ro") {
        return validateRomanianPlate(plate);
    } else if (country === "de") {
        return validateGermanPlate(plate);
    } else if (country === "si") {
        return validateSlovenianPlate(plate);
    } else if (country === "ch") {
        return validateSwissPlate(plate);
    } else if (country === "lu") {
        return validateLuxemburgPlate(plate);
    }

    return {
        valid: true,
        error: null,
        message: null,
        target: "plate"
    }
}