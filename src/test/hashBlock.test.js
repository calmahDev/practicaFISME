import { hashBlock } from '../model/hashBlock.js';
import sha256 from 'sha256';

describe('hashBlock', () => {
  const previousBlockHash = '0000000000000000000000000000000000000000000000000000000000000000';
  const currentBlockData = { sender: 'Alice', recipient: 'Bob', amount: 100 };
  const nonce = 12345;

  it('should return a hash string', () => {
    const hash = hashBlock(previousBlockHash, currentBlockData, nonce);
    expect(typeof hash).toBe('string');
  });

  it('should throw an error when parameters are missing', () => {
    expect(() => hashBlock()).toThrowError('parameters are missing in hashBlock.js');
    expect(() => hashBlock(previousBlockHash)).toThrowError('parameters are missing in hashBlock.js');
    expect(() => hashBlock(previousBlockHash, currentBlockData)).toThrowError('parameters are missing in hashBlock.js');
    expect(() => hashBlock(null, currentBlockData, nonce)).toThrowError('parameters are missing in hashBlock.js');
    expect(() => hashBlock(previousBlockHash, null, nonce)).toThrowError('parameters are missing in hashBlock.js');
    expect(() => hashBlock(previousBlockHash, currentBlockData, null)).toThrowError('parameters are missing in hashBlock.js');
  });

  it('should return the expected hash', () => {
    const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
    const expectedHash = sha256(dataAsString);
    const hash = hashBlock(previousBlockHash, currentBlockData, nonce);
    expect(hash).toBe(expectedHash);
  });
});
