import { delay } from "../src/core/KlDelay";

describe("KlDelay", () => {
  it("delay", async () => {
    await delay(10);
    expect(true).toBe(true);
  });
});
