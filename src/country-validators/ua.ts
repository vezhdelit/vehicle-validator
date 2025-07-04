import type { PlateResult } from "../../types/validator";

const DEFAULT_REGEX = /^[ABCEHIKMOPTX]{2}\d{4}[ABCDEFGHIJKLMNOPQRSTUVXYZ]{2}$/ // 2 letters, 4 digits, 2 letters

export const validateUkrainianPlate = (plate: string): PlateResult => {
    const fullPlate = plate.toUpperCase().trim();
    if (!DEFAULT_REGEX.test(fullPlate)) {
        return {
            valid: false,
            error: "invalid_ua_plate_format",
            message: "Invalid Ukrainian plate format (LLNNNNLL)",
            target: "plate"
        };
    }

    return {
        valid: true,
        error: null,
        message: null,
        target: "plate"
    };
}