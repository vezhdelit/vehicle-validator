import type { PlateResult } from "../../types/validator";

const DEFAULT_REGEX = /^[A-Z]{3,4}[0-9]{3}$/g;  // 3 or 4 letters followed by 3 digits

export const validateHungarianPlate = (plate: string): PlateResult => {
    const fullPlate = plate.toUpperCase().trim();

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
        error: "invalid_hu_plate_format",
        message: "Invalid Hungarian plate format (LLLNNN or LLLLNNN)",
        target: "plate"
    }
};