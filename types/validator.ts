export type PlateResult = PlateError | PlateSuccess;

interface PlateError {
    valid: false;
    error: string;
    message: string;
    target?: "plate" | "country" | null;
}

interface PlateSuccess {
    valid: true;
    error: null;
    message: null;
    target?: "plate" | "country" | null;
}