import type { PlateResult } from "../../types/validator";

const DEFAULT_REGEX = /^[ABEKMHOPCTYX]{1,2}[0-9]{4}[ABEKMHOPCTX]{2}$/

export const validateBulgarianPlate = (plate: string): PlateResult => {
    if (!DEFAULT_REGEX.test(plate)) {
        return {
            valid: false,
            error: "invalid_bg_plate_format",
            message: "Invalid Bulgarian plate format (LLNNNNLL)",
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