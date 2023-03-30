import React from 'react'
import { render } from '@testing-library/react'
import CoinChartHeading from '../components/CoinChartHeading'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

describe('Coin Chart Heading', () => {
  const initialState = { selectedCoin: 'bitcoin' };
  const mockStore = configureStore();
  let store;

  it('renders a heading', () => {
    store = mockStore(initialState)

    const { getByText } = render(
      <Provider store={store}>
        <CoinChartHeading />
      </Provider>
    )

    expect(getByText(/5 year price chart for/i)).toBeInTheDocument()
  })
})