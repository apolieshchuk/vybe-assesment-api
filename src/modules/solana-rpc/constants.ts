export enum MintTokenAddress {
  JUP = 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN',
  USDC = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
  USDT = 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
  MEW = 'MEW1gQWJ3nEXg2qgERiKu7FAFj79PHvQVREQUzScPP5',
  WIF = 'EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm',
  BONK = 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
  PYTH = 'HZ1JovNiVvGrGNiiYvEozEVgZ58xaU3RKwX8eACQBCt3',
  JITO = 'jtojtomepa8beP8AuQc6eXt5FriJwfFMwQx2v2f9mCL',
  RAY = '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R',
  SBONK = 'H1G6sZ1WDoMmMCFqBKAbg9gkQPCo1sKQtaJWz9dHmqZr',
  WOOF = '9nEqaUcb16sQ3Tn1psbkWqyhPdLmfHWjKGymREjsAgTE',
  HYPE = '8TQdiAzdZZEtkWUR8Zj1tqDYGPv9TR1XjPqrew39Vq9V',
  SIN = 'sin1uRe1cMCWR7VPLdZrGrvKs8UvKMsGzhvpJLg4Ld9',
  W = '85VBFQZC9TZkfaptBWjvUw7YbZjy52A6mjtPGjstQAmQ',
  NEON = 'NeonTjSjsuo3rexg9o6vHuMXw62f9V7zvmu8M8Zut44',
  JLP = '27G8MtK7VtTcCHkpASjSDdkWWYfoqT6ggEuKidVJidD4',
  TNSR = 'TNSRxcUxoT9xBG3de7PiJyTDYu7kskLqcpddxnEJAS6',
  JupSOL = 'jupSoLaHXQiZZTSfEWMTRRgpnyFm8f6sZdosWBjx93v',
  DRIFT = 'DriFtupJYLTosbwoN8koMbEYSx54aFAVLddWsbksjwg7',
  KMNO = 'KMNo3nJsBXfcpJTVhZcXLW7RmTwTt4GVFE7suUBo9sS',
  OXY = 'z3dn17yLaGMKffVogeFHQ9zWVcXgqgf3PQnDsNs2g6M',
  FOXY = 'FoXyMu5xwXre7zEoSvzViRk3nGawHUp9kUh97y2NDhcq',
  PONKE = '5z3EqYQo9HiCEs3R84RCDMu2n7anpDMxRhdK8PSWmrRC',
  GMT = '7i5KKsX2weiTkry7jA4ZwSuXGhs5eJBEjY8vVxR4pfRx',
}

export const MintAddressTokenMap = Object.entries(MintTokenAddress).reduce(
  (acc, [k, v]) => {
    acc[v] = k;
    return acc;
  },
  {},
);

export const SOLANA_WALLETS = [
  'FWznbcNXWQuHTawe9RxvQ2LdCENssh12dsznf4RiouN5', // Kraken
  'u6PJ8DtQuPFnfmwHbGFULQ4u4EgjDiyYKjVEsynXq2w', // Gate.io
  '3yFwqXBfZY4jBVUafQ1YEXw189y2dN3V5KQq9uzBDy1E', // Binance cold
  '42brAgAVNzMBP7aaktPvAmBSPEkehnFQejiZc53EpJFd',
  'CebN5WGQ4jvEPvsVU4EoHEpgzq1VV7AbicfhtW4xC9iM',
  'ASTyfSima4LLAdDgoFGkgqoKowG1LZFDr9fAQrg7iaJZ',
  'G7sy4Pry4oSoSXyCBoLW6u8SyLcdf11xTi8skZZWtt1S',
  '52C9T2T7JRojtxumYnYZhyUmrN7kqzvCLc4Ksvjk7TxD',
  '8BseXT9EtoEhBTKFFYkwTnjKSUZwhtmdKY2Jrj8j45Rt',
  'GitYucwpNcg6Dx1Y15UQ9TQn8LZMX1uuqQNn8rXxEWNC',
  '9QgXqrgdbVU8KcpfskqJpAXKzbaYQJecgMAruSWoXDkM',
  '9uRJ5aGgeu2i3J98hsC5FDxd2PmRjVy9fQwNAy7fzLG3',
  'EJRJswH9LyjhAfBWwPBvat1LQtrJYK4sVUzsea889cQt',
  '53nHsQXkzZUp5MF1BK6Qoa48ud3aXfDFJBbe1oECPucC',
  '8PjJTv657aeN9p5R2WoM6pPSz385chvTTytUWaEjSjkq',
  'AHB94zKUASftTdqgdfiDSdnPJHkEFp7zX3yMrcSxABsv',
  '3D91zLQPRLamwJfGR5ZYMKQb4C18gsJNaSdmB6b2wLhw',
  'AogcwQ1ubM76EPMhSD5cw1ES4W5econvQCFmBL6nTW1',
  '3bHbMa5VW3np5AJazuacidrN4xPZgwhcXigmjwHmBg5e',
];

export const SOLANA_LAMPORT = 1_000_000_000;
