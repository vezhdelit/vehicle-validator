import type { PlateResult } from "../../types/validator";

const STANDART_REGEX = /^[A-PR-VZŽŠČĐ]{2}\\d{3,4}[A-PR-VZŽŠČĐ]{1,2}$/ // 2 Croatian letters, 3 or 4 digits, 1 or 2 Croatian letters
const NON_STANDART_REGEX = /^[A-ZŽŠČĐ]{2}[A-ZŽŠČĐ0-9]{3,7}$/ // 2 Croatian letters, 3 to 7 alphanumeric characters

export const validateCroatianPlate = (plate: string): PlateResult => {
    const fullPlate = plate.toUpperCase().trim();

    if (STANDART_REGEX.test(fullPlate) || NON_STANDART_REGEX.test(fullPlate)) {
        return {
            valid: true,
            error: null,
            message: null,
            target: "plate"
        };
    }

    return {
        valid: false,
        error: "invalid_hr_plate_format",
        message: "Invalid Croatian plate format",
        target: "plate"
    }
};