// @flow
import { ensureOnce } from '~/utils/singleton'
import { ETHEREUM_NETWORK } from '~/logic/wallets/getWeb3'
import { TX_SERVICE_HOST, SIGNATURES_VIA_METAMASK, RELAY_API_URL } from '~/config/names'
import devConfig from './development'
import testConfig from './testing'
import prodConfig from './production'
import mainnetDevConfig from './development-mainnet'
import mainnetProdConfig from './production-mainnet'

const configuration = () => {
  if (process.env.NODE_ENV === 'test') {
    return testConfig
  }

  if (process.env.NODE_ENV === 'production') {
    if (process.env.REACT_APP_NETWORK === 'mainnet') {
      return mainnetProdConfig
    }

    return prodConfig
  }

  if (process.env.REACT_APP_NETWORK === 'mainnet') {
    return mainnetDevConfig
  }

  return devConfig
}

export const getNetwork = () => (process.env.REACT_APP_NETWORK === 'mainnet' ? ETHEREUM_NETWORK.MAIN : ETHEREUM_NETWORK.RINKEBY)

const getConfig = ensureOnce(configuration)

export const getTxServiceHost = () => {
  const config = getConfig()

  return config[TX_SERVICE_HOST]
}

export const getTxServiceUriFrom = (safeAddress: string) => `safes/${safeAddress}/transactions/`

export const getRelayUrl = () => getConfig()[RELAY_API_URL]

export const signaturesViaMetamask = () => {
  const config = getConfig()

  return config[SIGNATURES_VIA_METAMASK]
}
