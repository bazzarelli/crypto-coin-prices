import coinListReducer, { addCoin, removeCoin, setCoins } from '../lib/coinListSlice';

describe('coinList reducer', () => {
  const initialState = {
    coins: ['bitcoin', 'ethereum'],
  };

  it('should handle initial state', () => {
    expect(coinListReducer(undefined, { type: 'unknown' })).toEqual({
      coins: [
        "bitcoin",
        "ethereum",
        "cardano",
        "aave",
        "solana",
        "polkadot",
        "dogecoin",
        "helium",
        "thorchain",
        "filecoin",
      ],
    });
  });

  it('should handle addCoin', () => {
    const actual = coinListReducer(initialState, addCoin('litecoin'));
    expect(actual.coins).toEqual(['litecoin', 'bitcoin', 'ethereum']);
  });

  it('should not add duplicate coin', () => {
    const actual = coinListReducer(initialState, addCoin('bitcoin'));
    expect(actual.coins).toEqual(['bitcoin', 'ethereum']);
  });

  it('should handle removeCoin', () => {
    const actual = coinListReducer(initialState, removeCoin('bitcoin'));
    expect(actual.coins).toEqual(['ethereum']);
  });

  it('should handle setCoins', () => {
    const actual = coinListReducer(initialState, setCoins(['dogecoin']));
    expect(actual.coins).toEqual(['dogecoin']);
  });

  it('should enforce max 20 coins limit', () => {
    const manyCoinsState = {
        coins: Array.from({ length: 20 }, (_, i) => `coin-${i}`)
    };
    const actual = coinListReducer(manyCoinsState, addCoin('new-coin'));
    expect(actual.coins.length).toBe(20);
    expect(actual.coins[0]).toBe('coin-0'); // Should not have added new-coin
  });
});
