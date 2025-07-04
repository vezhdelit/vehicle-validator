import type { PlateResult } from "../../types/validator";

const DEFAULT_REGEX = /^[A-PR-Z]{2,3}[A-PR-Z0-9]{4,5}$/ // 2-3 letters, 4-5 alphanumeric characters

export const validatePolishPlate = (plate: string): PlateResult => {
    const fullPlate = plate.toUpperCase().trim();
    if (fullPlate.includes("Q")) {
        return {
            valid: false,
            error: "invalid_pl_plate_format",
            message: "Polish plates cannot contain the letter 'Q'",
            target: "plate"
        };
    }

    if (fullPlate.length < 4 || fullPlate.length > 8) {
        return {
            valid: false,
            error: "invalid_pl_plate_format",
            message: "Polish plates must be between 4 and 8 characters long",
            target: "plate"
        };
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
        error: "invalid_pl_plate_format",
        message: "Invalid Polish plate format",
        target: "plate"
    };
}