import type { PlateResult } from "../../types/validator";

const ELECTRIC_VEHICLE_REGEX = /^EL[1-9]{1}([0-9]{2}[A-Z]{2}|[A-Z]{2}[0-9]{2})$/;
const PROHIBITED_LETTERS_REGEX = /[GIJOQW]/;
const PROHIBITED_COMBINATION_REGEX = /CH/;
const DIGIT_REQUIRED_REGEX = /[0-9]/;

export const validateCzechPlate = (plate: string): PlateResult => {
    const fullPlate = plate.toUpperCase().trim();

    // Check electric vehicle plates (starting with EL)
    if (fullPlate.substring(0, 2) === "EL" && !ELECTRIC_VEHICLE_REGEX.test(fullPlate)) {
        return {
            valid: false,
            error: "invalid_cz_electric_plate_format",
            message: "Invalid Czech electric vehicle plate format (ELNNXX or ELXXNN)",
            target: "plate"
        };
    }

    // Check for prohibited letters (G, I, J, O, Q, W)
    if (PROHIBITED_LETTERS_REGEX.test(fullPlate)) {
        return {
            valid: false,
            error: "prohibited_cz_letters",
            message: "Czech plate must not include the letters G, I, J, O, Q, W",
            target: "plate"
        };
    }

    // Check for CH combination in 8-character plates
    if (fullPlate.length === 8 && PROHIBITED_COMBINATION_REGEX.test(fullPlate)) {
        return {
            valid: false,
            error: "prohibited_cz_ch_combination",
            message: "Czech plate with 8 characters must not include CH",
            target: "plate"
        };
    }

    // Check digit requirement for 7-8 character plates
    if (fullPlate.length >= 7 && fullPlate.length <= 8) {
        if (!DIGIT_REQUIRED_REGEX.test(fullPlate)) {
            return {
                valid: false,
                error: "missing_cz_digit",
                message: "Czech plate must include at least one digit",
                target: "plate"
            };
        }

    }

    // Default case for other valid plates
    return {
        valid: true,
        error: null,
        message: null,
        target: "plate"
    };
};