import { createNewBlock } from '../model/createNewBlock.js';

describe('createNewBlock function', () => {
  describe('when all parameters are valid', () => {
    let nonce, previousBlockHash, hash, chain, pendingTransactions, result;
    beforeAll(() => {
      nonce = 1234;
      previousBlockHash = 'abc123';
      hash = 'def456';
      chain = [];
      pendingTransactions = [{ id: 1, amount: 10 }, { id: 2, amount: 20 }];
      result = createNewBlock(nonce, previousBlockHash, hash, chain, pendingTransactions);
    });

    test('should return an object', () => {
      expect(typeof result).toBe('object');
    });

    test('should return a new block with an index property equal to the length of the chain plus one', () => {
      expect(result.index).toBe(chain.length + 1);
    });

    test('should return a new block with a timestamp property', () => {
      expect(result.timestamp).toBeDefined();
      expect(typeof result.timestamp).toBe('number');
    });

    test('should return a new block with a transactions property equal to the pendingTransactions array', () => {
      expect(result.transactions).toEqual(pendingTransactions);
    });

    test('should return a new block with a nonce property equal to the nonce parameter', () => {
      expect(result.nonce).toBe(nonce);
    });

    test('should return a new block with a hash property equal to the hash parameter', () => {
      expect(result.hash).toBe(hash);
    });

    test('should return a new block with a previousBlockHash property equal to the previousBlockHash parameter', () => {
      expect(result.previousBlockHash).toBe(previousBlockHash);
    });

    test('should clear the pendingTransactions array', () => {
      expect(pendingTransactions.length).toBe(0);
    });

    test('should add the new block to the chain array', () => {
      expect(chain.length).toBe(1);
      expect(chain[0]).toBe(result);
    });
  });

  describe('when some parameters are missing or invalid', () => {
    test('should throw an error when some parameters are missing', () => {
      expect(() => {
        createNewBlock();
      }).toThrow('Missing or invalid parameters');
    });

    test('should throw an error when the nonce parameter is less than or equal to zero', () => {
      expect(() => {
        createNewBlock(0, 'abc123', 'def456', [], [{ id: 1, amount: 10 }, { id: 2, amount: 20 }]);
      }).toThrow('Invalid nonce value');
    });

    test('should throw an error when the previousBlockHash parameter is an empty string', () => {
      expect(() => {
        createNewBlock(1234, '', 'def456', [], [{ id: 1, amount: 10 }, { id: 2, amount: 20 }]);
      }).toThrow('Invalid previous block hash value');
    });

    test('should throw an error when the hash parameter is an empty string', () => {
      expect(() => {
        createNewBlock(1234, 'abc123', '', [], [{ id: 1, amount: 10 }, { id: 2, amount: 20 }]);
      }).toThrow('Invalid hash value');
    });

    test('should throw an error when the pendingTransactions parameter is not an array', () => {
      expect(() => {
        createNewBlock(1, 'previousHash', 'hash', [], {});
      }).toThrow('Missing or invalid parameters');
    });
    
    test('should create a new block with the current timestamp', () => {
      const newBlock = createNewBlock(1, 'previousHash', 'hash', [], []);
      const currentTimestamp = Date.now();
      expect(newBlock.timestamp).toBeGreaterThan(currentTimestamp - 100);
      expect(newBlock.timestamp).toBeLessThan(currentTimestamp + 100);
    });
    
    test('should add the new block to the end of the chain', () => {
      const chain = [    { index: 1, hash: 'hash1', previousBlockHash: 'previousHash1' },    { index: 2, hash: 'hash2', previousBlockHash: 'previousHash2' }  ];
      const pendingTransactions = [    { amount: 10, sender: 'sender1', recipient: 'recipient1' }  ];
      const newBlock = createNewBlock(1, 'previousHash', 'hash', chain, pendingTransactions);
      expect(chain.length).toBe(3);
      expect(chain[2]).toBe(newBlock);
    });
    
    test('should clear the pending transactions after adding them to the new block', () => {
      const pendingTransactions = [    { amount: 10, sender: 'sender1', recipient: 'recipient1' }  ];
      const newBlock = createNewBlock(1, 'previousHash', 'hash', [], pendingTransactions);
      expect(pendingTransactions.length).toBe(0);
      expect(newBlock.transactions).toEqual([{ amount: 10, sender: 'sender1', recipient: 'recipient1' }]);
    });
    
    test('should return the new block', () => {
      const newBlock = createNewBlock(1, 'previousHash', 'hash', [], []);
      expect(newBlock).toEqual({
        index: 1,
        timestamp: expect.any(Number),
        transactions: [],
        nonce: 1,
        hash: 'hash',
        previousBlockHash: 'previousHash'
      });
    });

  })
})