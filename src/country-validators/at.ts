import type { PlateResult } from "../../types/validator";

const DEFAULT_REGEX = /^[A-ZÄÖÜ]{1,2}-[A-ZÄÖÜ0-9]{3,8}$/; // 1-2 letters, hyphen, 3-8 alphanumeric characters

export const validateAustrianPlate = (plate: string): PlateResult => {
    const fullPlate = plate.toUpperCase().trim();
    const hyphenIndex = fullPlate.indexOf("-");

    // Check if hyphen is required for plates >= 3 characters
    if (hyphenIndex === -1) {
        return {
            valid: false,
            error: "missing_hyphen",
            message: "Austrian plate requires a hyphen (L-XXXX or LL-XXX)",
            target: "plate"
        };
    }

    // Check hyphen position (must be in position 1 or 2)
    if (![1, 2].includes(hyphenIndex)) {
        return {
            valid: false,
            error: "invalid_hyphen_position",
            message: "Hyphen must be in position 2 (L-XXXX) or 3(LL-XXX)",
            target: "plate"
        };
    }

    if (fullPlate.includes("Q")) {
        return {
            valid: false,
            error: "invalid_plate_character",
            message: "Austrian plates cannot contain the letter 'Q'",
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

    const afterHyphenPart = splitedPlate[1];
    if (afterHyphenPart.length < 3 || afterHyphenPart.length > 8) {
        return {
            valid: false,
            error: "invalid_length_after_hyphen",
            message: "The part after hyphen must be 3-8 characters long",
            target: "plate"
        }
    }

    if (DEFAULT_REGEX.test(fullPlate)) {
        return {
            valid: true,
            error: null,
            message: null,
            target: "plate"
        };
    }

    return {
        valid: false,
        error: "invalid_au_plate_format",
        message: "Invalid Austrian plate format (L-XXXX or LL-XXX)",
        target: "plate"
    }
};