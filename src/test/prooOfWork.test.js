import { proofOfWork } from '../model/prooOfWork.js';
import { hashBlock } from '../model/hashBlock.js';

describe('proofOfWork', () => {
  const previousBlockHash = 'previousBlockHash';
  const currentBlockData = 'currentBlockData';

  it('should throw an error if parameters are missing', () => {
    expect(() => proofOfWork()).toThrow('parameters are missing in prooOfWork.js');
  });

  it('should return a valid nonce for a given hash', () => {
    const nonce = proofOfWork(previousBlockHash, currentBlockData);
    const hash = hashBlock(previousBlockHash, currentBlockData, nonce);
    expect(hash.substring(0, 4)).toEqual('0000');
  });
});
