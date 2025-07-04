import type { PlateResult } from "../../types/validator";

const DEFAULT_REGEX = /^B[0-9]{2,3}[A-HJ-NPR-Z]{1}[A-Z]{2}$/g;
const ALTERNATIVE_REGEX = /^[A-Z]{2}[0-9]{2}[A-HJ-NPR-Z]{1}[A-Z]{2}$/g;

export const validateRomanianPlate = (plate: string): PlateResult => {
    if (plate[0] === "B" && !isNaN(+plate[1]) && DEFAULT_REGEX.test(plate)) {
        return {
            valid: true,
            error: null,
            message: null,
            target: "plate"
        };
    } else if (ALTERNATIVE_REGEX.test(plate)) {
        return {
            valid: true,
            error: null,
            message: null,
            target: "plate"
        };
    }

    return {
        valid: false,
        error: "invalid_ro_plate_format",
        message: "Invalid Romanian plate format (BNNNLL or LLNNNL)",
        target: "plate"
    };
}