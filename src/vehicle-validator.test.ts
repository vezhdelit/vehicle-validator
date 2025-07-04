import { describe, it, expect } from "vitest";
import { validateVehiclePlate } from "./vehicle-validator";

describe("Vehicle Plate Validation", () => {
    it("should return error for invalid plate length", () => {
        const result = validateVehiclePlate({ country: "at", plate: "AB" });
        expect(result).toEqual({
            valid: false,
            error: "invalid_plate_length",
            message: "Plate must be between 3 and 9 characters long",
            target: "plate"
        });
    });

    it("should return error for invalid plate format", () => {
        const result = validateVehiclePlate({ country: "at", plate: "AB@123" });
        expect(result).toEqual({
            valid: false,
            error: "invalid_plate_format",
            message: "Plate can only contain uppercase letters, numbers and sometimes hyphen",
            target: "plate"
        });
    });
});
