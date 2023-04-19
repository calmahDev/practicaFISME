import { chainIsValid } from '../model/chainIsValid.js';

describe('chainIsValid', () => {
  const validChain = [
    {
      index: 0,
      previousBlockHash: 'Block Genesis',
      hash: 'Block Genesis',
      nonce: 1,
      records: []
    },
    {
      index: 1,
      previousBlockHash: 'Block Genesis',
      hash: 'abc123',
      nonce: 2,
      records: [
        { sender: 'Alice', recipient: 'Bob', amount: 10 },
        { sender: 'Bob', recipient: 'Charlie', amount: 5 }
      ]
    }
  ];

  const invalidGenesisBlock = [
    {
      index: 0,
      previousBlockHash: 'invalid',
      hash: 'Block Genesis',
      nonce: 1,
      records: []
    },
    {
      index: 1,
      previousBlockHash: 'Block Genesis',
      hash: 'abc123',
      nonce: 2,
      records: [
        { sender: 'Alice', recipient: 'Bob', amount: 10 },
        { sender: 'Bob', recipient: 'Charlie', amount: 5 }
      ]
    }
  ];

  const invalidBlockIndex = [
    {
      index: 1,
      previousBlockHash: 'Block Genesis',
      hash: 'abc123',
      nonce: 2,
      records: [
        { sender: 'Alice', recipient: 'Bob', amount: 10 },
        { sender: 'Bob', recipient: 'Charlie', amount: 5 }
      ]
    }
  ];

  const invalidBlockPreviousHash = [
    {
      index: 0,
      previousBlockHash: 'invalid',
      hash: 'Block Genesis',
      nonce: 1,
      records: []
    },
    {
      index: 1,
      previousBlockHash: 'Block Genesis',
      hash: 'abc123',
      nonce: 2,
      records: [
        { sender: 'Alice', recipient: 'Bob', amount: 10 },
        { sender: 'Bob', recipient: 'Charlie',    amount: 5 }
    ]
  }
    ];

    const invalidBlockHash = [
    {
    index: 0,
    previousBlockHash: 'Block Genesis',
    hash: 'invalid',
    nonce: 1,
    records: []
    },
    {
    index: 1,
    previousBlockHash: 'Block Genesis',
    hash: 'abc123',
    nonce: 2,
    records: [
    { sender: 'Alice', recipient: 'Bob', amount: 10 },
    { sender: 'Bob', recipient: 'Charlie', amount: 5 }
    ]
    }
    ];

    const invalidBlockNonce = [
    {
    index: 0,
    previousBlockHash: 'Block Genesis',
    hash: 'Block Genesis',
    nonce: 2,
    records: []
    },
    {
    index: 1,
    previousBlockHash: 'Block Genesis',
    hash: 'abc123',
    nonce: 2,
    records: [
    { sender: 'Alice', recipient: 'Bob', amount: 10 },
    { sender: 'Bob', recipient: 'Charlie', amount: 5 }
    ]
    }
    ];

    const invalidBlockRecords = [
    {
    index: 0,
    previousBlockHash: 'Block Genesis',
    hash: 'Block Genesis',
    nonce: 1,
    records: [{ sender: 'Alice', recipient: 'Bob', amount: 10 }]
    },
    {
    index: 1,
    previousBlockHash: 'Block Genesis',
    hash: 'abc123',
    nonce: 2,
    records: [
    { sender: 'Alice', recipient: 'Bob', amount: 10 },
    { sender: 'Bob', recipient: 'Charlie', amount: 5 }
    ]
    }
    ];

    test('valid chain', () => {
    expect(chainIsValid(validChain)).toBe(true);
    });

    test('invalid genesis block', () => {
    expect(chainIsValid(invalidGenesisBlock)).toBe(false);
    });

    test('invalid block index', () => {
    expect(chainIsValid(invalidBlockIndex)).toBe(false);
    });

    test('invalid block previous hash', () => {
    expect(chainIsValid(invalidBlockPreviousHash)).toBe(false);
    });

    test('invalid block hash', () => {
    expect(chainIsValid(invalidBlockHash)).toBe(false);
    });

    test('invalid block nonce', () => {
    expect(chainIsValid(invalidBlockNonce)).toBe(false);
    });

    test('invalid block records', () => {
    expect(chainIsValid(invalidBlockRecords)).toBe(false);
    });
});
