import type { PlateResult } from "../../types/validator";

// German plate validation patterns
const GERMAN_PLATE_REGEX = /^[A-ZÄÖÜ]{1,3}-[A-ZÄÖÜ]{1,2}\d{1,4}[A-ZÄÖÜ]?$/;

export const validateGermanPlate = (plate: string): PlateResult => {
    const fullPlate = plate.toUpperCase().trim();
    const hyphenIndex = fullPlate.indexOf("-");

    // Check if hyphen is required for plates >= 3 characters
    if (hyphenIndex === -1) {
        return {
            valid: false,
            error: "missing_hyphen",
            message: "German plate requires a hyphen",
            target: "plate"
        };
    }

    // Check hyphen position (must be in position 1, 2, or 3)
    if (![1, 2, 3].includes(hyphenIndex)) {
        return {
            valid: false,
            error: "invalid_hyphen_position",
            message: "Hyphen must be in position 2 (L-XXX), 3 (LL-XXX), or 4 (LLL-XXX)",
            target: "plate"
        };
    }

    // Check for multiple hyphens
    const splitedPlate = fullPlate.split("-");
    if (splitedPlate.length > 2) {
        return {
            valid: false,
            error: "multiple_hyphens",
            message: "Plate must have only 1 hyphen",
            target: "plate"
        };
    }

    // Get second part (after hyphen)
    const afterHyphenPart = splitedPlate[1];

    if (GERMAN_PLATE_REGEX.test(fullPlate) && afterHyphenPart && afterHyphenPart.length <= 6) {
        return {
            valid: true,
            error: null,
            message: null,
            target: "plate"
        };
    }

    return {
        valid: false,
        error: "invalid_de_plate_format",
        message: "Invalid German plate format",
        target: "plate"
    };
};