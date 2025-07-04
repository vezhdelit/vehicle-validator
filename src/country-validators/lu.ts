import type { PlateResult } from "../../types/validator";

const DEFAULT_REGEX = /^[A-Z]{2}[0-9]{4}$/g; // 2 letters followed by 4 digits
const ALTERNATIVE_REGEX = /^[0-9]{4,5}$/g; // 4 or 5 digits only

export const validateLuxemburgPlate = (plate: string): PlateResult => {
    const fullPlate = plate.toUpperCase().trim();

    if (!DEFAULT_REGEX.test(fullPlate) && !ALTERNATIVE_REGEX.test(fullPlate)) {
        return {
            valid: false,
            error: "invalid_lu_plate_format",
            message: "Invalid Luxembourg plate format (LLNNNN or NNNN/NNNNN)",
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