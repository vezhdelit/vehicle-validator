import type { PlateResult } from "../../types/validator";

const REGION_CODES = ["CE", "GO", "KK", "KP", "KR", "LJ", "MB", "MS", "NM", "PO", "SG"];
const PROHIBITED_COMBINATIONS = ["I1", "B8", "G6"];

const DIPLOMATIC_PLATE_REGEX = /^(CMD|CD|CC|M)\d{3,6}$/;
const DEFAULT_SIX_CHAR_PLATE_REGEX = /^[A-Z]{2}(([A-HJ-NP-Z]{2}\d{2})|(\d{2}[A-HJ-NP-Z]{2})|(\d[A-HJ-NP-Z]{2}\d)|(\d{3}[A-HJ-NP-Z]))$/
const DEFAULT_SEVEN_CHAR_PLATE_REGEX = /^[A-Z]{2}((\d{3}[A-HJ-NP-Z]{2})|(\d{2}[A-HJ-NP-Z]{3})|([A-HJ-NP-Z]{2}\d{3})|([A-HJ-NP-Z]{3}\d{2})|(\d[A-HJ-NP-Z]{3}\d))$/;

export const validateSlovenianPlate = (plate: string): PlateResult => {
    const fullPlate = plate.toUpperCase().trim();
    const regionCode = fullPlate.slice(0, 2);
    const plateNumber = fullPlate.slice(2);

    // Check for valid region code
    if (!REGION_CODES.includes(regionCode)) {
        return {
            valid: false,
            error: "invalid_si_plate_prefix",
            message: "Plate must start with a valid Slovenian region code.",
            target: "plate"
        };
    }

    // Check for prohibited letter combinations
    if (PROHIBITED_COMBINATIONS.some(prohibited => fullPlate.includes(prohibited))) {
        return {
            valid: false,
            error: "prohibited_si_plate_combination",
            message: "Plate contains prohibited letter combinations.",
            target: "plate"
        };
    }

    // Check diplomatic plates
    if (DIPLOMATIC_PLATE_REGEX.test(fullPlate)) {
        return {
            valid: true,
            error: null,
            message: null,
            target: "plate"
        };
    }

    // Validate standard plates (length 6 = region code + 4 characters)
    if (fullPlate.length === 6 && DEFAULT_SIX_CHAR_PLATE_REGEX.test(fullPlate)) {
        return {
            valid: true,
            error: null,
            message: null,
            target: "plate"
        };
    }
    // Validate extended plates (length 7 = region code + 5 characters)
    if (fullPlate.length === 7 && DEFAULT_SEVEN_CHAR_PLATE_REGEX.test(fullPlate)) {
        return {
            valid: true,
            error: null,
            message: null,
            target: "plate"
        };
    }

    // Validate unique plates (3-5 characters after region code)
    if (plateNumber.length >= 3 && plateNumber.length <= 5) {
        const isAlphanumeric = /^[A-Z0-9]+$/.test(plateNumber);
        const isNotOnlyNumbers = !/^\d+$/.test(plateNumber);
        const hasNoMixedOAndZero = !(plateNumber.includes("O") && plateNumber.includes("0"));

        if (isAlphanumeric && isNotOnlyNumbers && hasNoMixedOAndZero) {
            return {
                valid: true,
                error: null,
                message: null,
                target: "plate"
            };
        }
    }

    return {
        valid: false,
        error: "invalid_si_plate_format",
        message: "Invalid Slovenian plate format.",
        target: "plate"
    };
};