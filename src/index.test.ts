import { describe, expect, it } from "vitest";
import { hello } from ".";

describe("Hello World Test", () => {
    it("should return 'Hello, world!'", () => {
        expect(hello()).toBe("Hello, world!");
    });
}
);