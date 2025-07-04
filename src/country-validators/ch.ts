import type { PlateResult } from "../../types/validator";

export const validateSwissPlate = (plate: string): PlateResult => {
    if (!isNaN(+plate[0]) || !isNaN(+plate[1])) {
        return {
            valid: false,
            error: "invalid_plate_format",
            message: "Swiss plate must start with two letters (LLXXXX)",
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