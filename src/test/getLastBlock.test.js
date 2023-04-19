import { getLastBlock } from "../model/getLastBlock.js";

describe("getLastBlock", () => {
  it("should return the last block in the chain", () => {
    // Set up
    const chain = [      { index: 0, data: "Genesis block" },      { index: 1, data: "Block 1" },      { index: 2, data: "Block 2" },    ];
    global.chain = chain;

    // Execution
    const lastBlock = getLastBlock();

    // Assertion
    expect(lastBlock).toEqual(chain[chain.length - 1]);
  });

  it("should return undefined if the chain is empty", () => {
    // Set up
    global.chain = [];

    // Execution
    const lastBlock = getLastBlock();

    // Assertion
    expect(lastBlock).toBeUndefined();
  });
});
