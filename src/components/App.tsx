import React from 'react'
import { useQuery } from 'react-apollo'
import { gql } from 'apollo-boost'

type Rates = {
  currency: string
  rate: string
}

type ExchangeRates = { rates: Rates[] }

const EXCHANGE_RATES = gql`
  {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`

export const App = () => {
  const { loading, error, data } = useQuery<ExchangeRates>(EXCHANGE_RATES)

  if (error) return <p>Error!</p>

  return loading ? (
    <p>Loading...</p>
  ) : (
    <>
      {data &&
        data.rates.map(({ currency, rate }, index) => (
          <div key={`${currency}-${index}`}>
            <p>
              {currency}: {rate}
            </p>
          </div>
        ))}
    </>
  )
}
