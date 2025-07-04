import type { PlateResult } from "../../types/validator";

const DEFAULT_REGEX = /^[A-Z]{2}[0-9]{3}[A-Z]{2}$/g; // old format: 2 letters, 3 digits, 2 letters
const MODERN_REGEX = /^[A-Z]{2}[A-Z0-9]{5}$/g; // modern format: 2 letters, 5 alphanumeric characters

export const validateSlovakPlate = (plate: string): PlateResult => {
    const fullPlate = plate.toUpperCase().trim();

    if (DEFAULT_REGEX.test(fullPlate) || MODERN_REGEX.test(fullPlate)) {
        return {
            valid: true,
            error: null,
            message: null,
            target: "plate"
        };
    }

    return {
        valid: false,
        error: "invalid_sk_plate_format",
        message: "Invalid Slovak plate format (LLLNNN or LLLLNNN)",
        target: "plate"
    }
};