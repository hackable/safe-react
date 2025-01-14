import { List } from 'immutable'
import { formatAmountInUsFormat } from 'src/logic/tokens/utils/formatAmount'
import { TableColumn } from 'src/components/Table/types.d'
import { Token } from 'src/logic/tokens/store/model/token'
export const BALANCE_TABLE_ASSET_ID = 'asset'
export const BALANCE_TABLE_BALANCE_ID = 'balance'


export interface BalanceData {
  asset: { name: string; logoUri: string; address: string; symbol: string }
  assetOrder: string
  balance: string
  balanceOrder: number
  valueOrder: number
}

export const getBalanceData = (safeTokens: List<Token>, currencySelected?: string): List<BalanceData> => {
  return safeTokens.map((token) => {
    const { tokenBalance, fiatBalance } = token.balance

    return {
      [BALANCE_TABLE_ASSET_ID]: {
        name: token.name,
        logoUri: token.logoUri || '',
        address: token.address,
        symbol: token.symbol,
      },
      assetOrder: token.name,
      [BALANCE_TABLE_BALANCE_ID]: `${formatAmountInUsFormat(tokenBalance?.toString() || '0')} ${token.symbol}`,
      balanceOrder: Number(tokenBalance),
      valueOrder: Number(tokenBalance),
    }
  })
}

export const generateColumns = (): List<TableColumn> => {
  const assetColumn: TableColumn = {
    id: BALANCE_TABLE_ASSET_ID,
    order: true,
    disablePadding: false,
    label: 'Asset',
    custom: false,
    static: true,
    width: 250,
  }

  const balanceColumn: TableColumn = {
    id: BALANCE_TABLE_BALANCE_ID,
    align: 'right',
    order: true,
    disablePadding: false,
    label: 'Balance',
    custom: false,
    static: true,
  }

  const actions: TableColumn = {
    id: 'actions',
    order: false,
    disablePadding: false,
    label: '',
    custom: true,
    static: true,
  }


  return List([assetColumn, balanceColumn, actions])
}
