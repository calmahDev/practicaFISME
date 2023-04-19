import "../model/blockchain.js"
import {createNewBlock} from "../model/createNewBlock.js"

describe('createNewBlock', () => {
  it('should throw an error when parameters are missing', () => {
    expect(() => createNewBlock()).toThrow(Error);
    expect(() => createNewBlock(1)).toThrow(Error);
    expect(() => createNewBlock(1, 'previousBlockHash')).toThrow(Error);
  });

  it('should create a new block with the given parameters', () => {
    const nonce = 123;
    const previousBlockHash = 'previousBlockHash';
    const hash = 'hash';
    const newBlock = createNewBlock(nonce, previousBlockHash, hash);

    expect(newBlock.index).toBe(0);
    expect(newBlock.nonce).toBe(nonce);
    expect(newBlock.hash).toBe(hash);
    expect(newBlock.previousBlockHash).toBe(previousBlockHash);
  });
});
