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