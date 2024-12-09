import {canary} from './canary';

describe("Canary Test", () => {
  it("Shows that jest is setup correctly", () => {
    expect(canary("world")).toBe("hello world!")
  })
})