/* eslint-disable prefer-const */
import { log, BigInt, BigDecimal, Address, EthereumEvent } from '@graphprotocol/graph-ts'
import { ERC20 } from '../types/Factory/ERC20'
import { ERC20SymbolBytes } from '../types/Factory/ERC20SymbolBytes'
import { ERC20NameBytes } from '../types/Factory/ERC20NameBytes'
import { User, Bundle, Token, LiquidityPosition, LiquidityPositionSnapshot, Pair } from '../types/schema'
import { Factory as FactoryContract } from '../types/templates/Pair/Factory'
import { TokenDefinition } from './tokenDefinition'

const testnetAddress: string[] = [
  '0x2d57bec97c35e3e6d70cfb02f8a00b4d38bda766', // 0 swappifactory
  '0x2ed3dddae5b2f321af0806181fbfa6d049be47d8', // 1 wcfx
  '0x54593e02c39aeff52b166bd036797d2b1478de8d', // 2 faucetbtc
  '0xcd71270f82f319e0498ff98af8269c3f0d547c65', // 3 fauceteth
  '0x7d682e65efc5c13bf4e394b8f376c48e6bae0355', // 4 faucetusdt
  '0xa86df320eff76f5204e922846f4be60ce3a3f184', // 5 'ppi-lp wcfx-btc'
  '0xbe2f8f60312b425ec0c29ce0945b5147defeb3df', // 6 'ppi-lp wcfx-eth'
  '0x7d883e774dfe8cea90f241e72368c1ad6892e1d8', // 7 'ppi-lp wcfx-usdt
  '0x51d5bbfba37b289869e3c99c7eab044fc6ffc4ea', // 8 'ppi-lp btc-eth'
  '0x659ab2320c95d89605079e991ef710963bfe8c85', // 9 'ppi-lp btc-usdt'
  '0xfe95926b4dfca66724dfca7fac90d27039ab92ec', // 10 'ppi-lp eth-usdt'
  '0x7caa2fec42ab92eaa2b1b8e264f3246509c5eda6', // 11 ppi
]

const mainnetAddress: string[] = [
  '0xe2a6f7c0ce4d5d300f97aa7e125455f5cd3342f5', // 0 swappifactory
  '0x14b2d3bc65e74dae1030eafd8ac30c533c976a9b', // 1 wcfx
  '0x1f545487c62e5acfea45dcadd9c627361d1616d8', // 2 faucetbtc
  '0xa47f43de2f9623acb395ca4905746496d2014d57', // 3 fauceteth
  '0xfe97e85d13abd9c1c33384e796f10b73905637ce', // 4 faucetusdt
  '0x8bbbd6150c933fcd790b4a00bab23826912c192c', // 5 'ppi-lp wcfx-btc'
  '0x8ea70966e8f14337657bff7f40cfb9648f79530b', // 6 'ppi-lp wcfx-eth'
  '0x8fcf9c586d45ce7fcf6d714cb8b6b21a13111e0b', // 7 'ppi-lp wcfx-usdt
  '0x5767d71b462464ff77f6fbc81b8377ad49983511', // 8 'ppi-lp btc-eth'
  '0x9b2e43277238d4c6a9534caa84cf80cb076810ea', // 9 'ppi-lp btc-usdt'
  '0xa6943647f22cb9de7a80d1f447db48b0209a812a', // 10 'ppi-lp eth-usdt'
  '0x22f41abf77905f50df398f21213290597e7414dd', // 11 ppi
  '0x1112a6c61a2eec4bd3aec78bd5bf3396bdd37d57', // 12 'ppi-lp wcfx-ppi'
  '0xfd683e23e0a70cbe2ca6ef76ea3ef31f70f74f2e', // 13 'ppi-lp wbtc-ppi'
  '0x4812be910bd44d0320f5966ba0e6941a7aaeccc8', // 14 'ppi-lp eth-ppi'
  '0x2ddf0a20b99ad70aee0760f476c24a6568216ed4', // 15 'ppi-lp usdt-ppi'
  '0x6963efed0ab40f6c3d7bda44a05dcf1437c44372', // 16 'faucetusdc'
  '0x0736b3384531cda2f545f5449e84c6c6bcd6f01b', // 17 'ppi-lp wcfx-usdc'
  '0x94bd7a37d2ce24cc597e158facaa8d601083ffec', // 18 faucetbnb
  '0x8a61e6cd8eeb564ff66459a2614ce98177f48ca9', // 19 'ppi-lp wcfx-bnb'
  '0xa5dcd75c853dad730bef4ece3d20f0be7e297a6a', // 20 'ppi-lp usdc-usdt'
  '0x9fb9a33956351cf4fa040f65a13b835a3c8764e3', // 21 'faucetmulti'
  '0xc563a5d73091afa6e9afebc03002ed5feb2a5c37', // 22 'ppi-lp cfx-multi'
  '0x8b47a66c0dc369dcb66a206f3c6794df61aaf641', // 23 'faucetzo'
  '0x52f0b6ffad6dc033118ee36ac1cc745b9538c9d2', // 24 'ppi-lp cfx-zo'
  '0x74eae367d018a5f29be559752e4b67d01cc6b151', // 25 'faucetdai'
]

export let networkAddress = mainnetAddress

export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000'
export let FACTORY_ADDRESS = networkAddress[0]

// only need to maintain the pair address of <token>/wcfx
// because we will always make sure we will fill the liquidity for the <token>/wcfx pair.
export function getPairAddrFromTokensAddr(token0Addr: string, token1Addr: string): string {
  if ((token0Addr == networkAddress[1] && token1Addr == networkAddress[2]) || (token1Addr == networkAddress[1] && token0Addr == networkAddress[2])) {
    return networkAddress[5]
  }
  if ((token0Addr == networkAddress[1] && token1Addr == networkAddress[3]) || (token1Addr == networkAddress[1] && token0Addr == networkAddress[3])) {
    return networkAddress[6]
  }
  if ((token0Addr == networkAddress[1] && token1Addr == networkAddress[4]) || (token1Addr == networkAddress[1] && token0Addr == networkAddress[4])) {
    return networkAddress[7]
  }
  if ((token0Addr == networkAddress[2] && token1Addr == networkAddress[3]) || (token1Addr == networkAddress[2] && token0Addr == networkAddress[3])) {
    return networkAddress[8]
  }
  if ((token0Addr == networkAddress[2] && token1Addr == networkAddress[4]) || (token1Addr == networkAddress[2] && token0Addr == networkAddress[4])) {
    return networkAddress[9]
  }
  if ((token0Addr == networkAddress[3] && token1Addr == networkAddress[4]) || (token1Addr == networkAddress[3] && token0Addr == networkAddress[4])) {
    return networkAddress[10]
  }
  if ((token0Addr == networkAddress[1] && token1Addr == networkAddress[11]) || (token1Addr == networkAddress[1] && token0Addr == networkAddress[11])) {
    return networkAddress[12]
  }
  if ((token0Addr == networkAddress[2] && token1Addr == networkAddress[11]) || (token1Addr == networkAddress[2] && token0Addr == networkAddress[11])) {
    return networkAddress[13]
  }
  if ((token0Addr == networkAddress[3] && token1Addr == networkAddress[11]) || (token1Addr == networkAddress[3] && token0Addr == networkAddress[11])) {
    return networkAddress[14]
  }
  if ((token0Addr == networkAddress[4] && token1Addr == networkAddress[11]) || (token1Addr == networkAddress[4] && token0Addr == networkAddress[11])) {
    return networkAddress[15]
  }
  if ((token0Addr == networkAddress[1] && token1Addr == networkAddress[16]) || (token1Addr == networkAddress[1] && token0Addr == networkAddress[16])) {
    return networkAddress[17]
  }
  if ((token0Addr == networkAddress[1] && token1Addr == networkAddress[18]) || (token1Addr == networkAddress[1] && token0Addr == networkAddress[18])) {
    return networkAddress[19]
  }
  if ((token0Addr == networkAddress[16] && token1Addr == networkAddress[4]) || (token1Addr == networkAddress[16] && token0Addr == networkAddress[4])) {
    return networkAddress[20]
  }
  if ((token0Addr == networkAddress[1] && token1Addr == networkAddress[21]) || (token1Addr == networkAddress[1] && token0Addr == networkAddress[21])) {
    return networkAddress[22]
  }
  if ((token0Addr == networkAddress[1] && token1Addr == networkAddress[23]) || (token1Addr == networkAddress[1] && token0Addr == networkAddress[23])) {
    return networkAddress[24]
  }

  return ADDRESS_ZERO
}


export let ZERO_BI = BigInt.fromI32(0)
export let ONE_BI = BigInt.fromI32(1)
export let ZERO_BD = BigDecimal.fromString('0')
export let ONE_BD = BigDecimal.fromString('1')
export let BI_18 = BigInt.fromI32(18)

export let factoryContract = FactoryContract.bind(Address.fromString(FACTORY_ADDRESS))

// rebass tokens, dont count in tracked volume
export let UNTRACKED_PAIRS: string[] = []

export function exponentToBigDecimal(decimals: BigInt): BigDecimal {
  let bd = BigDecimal.fromString('1')
  for (let i = ZERO_BI; i.lt(decimals as BigInt); i = i.plus(ONE_BI)) {
    bd = bd.times(BigDecimal.fromString('10'))
  }
  return bd
}

export function bigDecimalExp18(): BigDecimal {
  return BigDecimal.fromString('1000000000000000000')
}

export function convertEthToDecimal(eth: BigInt): BigDecimal {
  return eth.toBigDecimal().div(exponentToBigDecimal(18))
}

export function convertTokenToDecimal(tokenAmount: BigInt, exchangeDecimals: BigInt): BigDecimal {
  if (exchangeDecimals == ZERO_BI) {
    return tokenAmount.toBigDecimal()
  }
  return tokenAmount.toBigDecimal().div(exponentToBigDecimal(exchangeDecimals))
}

export function equalToZero(value: BigDecimal): boolean {
  const formattedVal = parseFloat(value.toString())
  const zero = parseFloat(ZERO_BD.toString())
  if (zero == formattedVal) {
    return true
  }
  return false
}

export function isNullEthValue(value: string): boolean {
  return value == '0x0000000000000000000000000000000000000000000000000000000000000001'
}

export function fetchTokenSymbol(tokenAddress: Address): string {
  // static definitions overrides
  let staticDefinition = TokenDefinition.fromAddress(tokenAddress)
  if(staticDefinition != null) {
    return (staticDefinition as TokenDefinition).symbol
  }

  let symbolValue = 'unknown'
  return symbolValue
}

export function fetchTokenName(tokenAddress: Address): string {
  // static definitions overrides
  let staticDefinition = TokenDefinition.fromAddress(tokenAddress)
  if(staticDefinition != null) {
    return (staticDefinition as TokenDefinition).name
  }

  let nameValue = 'unknown'
  return nameValue
}

export function fetchTokenTotalSupply(tokenAddress: Address): BigInt {
  return ZERO_BI
}

export function fetchTokenDecimals(tokenAddress: Address): BigInt {
  // static definitions overrides
  let staticDefinition = TokenDefinition.fromAddress(tokenAddress)
  if(staticDefinition != null) {
    return (staticDefinition as TokenDefinition).decimals
  }

  let decimalValue = null
  return BigInt.fromI32(decimalValue as i32)
}

export function createLiquidityPosition(exchange: Address, user: Address): LiquidityPosition {
  let id = exchange
    .toHexString()
    .concat('-')
    .concat(user.toHexString())
  let liquidityTokenBalance = LiquidityPosition.load(id)
  if (liquidityTokenBalance === null) {
    let pair = Pair.load(exchange.toHexString())
    pair.liquidityProviderCount = pair.liquidityProviderCount.plus(ONE_BI)
    liquidityTokenBalance = new LiquidityPosition(id)
    liquidityTokenBalance.liquidityTokenBalance = ZERO_BD
    liquidityTokenBalance.pair = exchange.toHexString()
    liquidityTokenBalance.user = user.toHexString()
    liquidityTokenBalance.save()
    pair.save()
  }
  if (liquidityTokenBalance === null) log.error('LiquidityTokenBalance is null', [id])
  return liquidityTokenBalance as LiquidityPosition
}

export function createUser(address: Address): void {
  let user = User.load(address.toHexString())
  if (user === null) {
    user = new User(address.toHexString())
    user.usdSwapped = ZERO_BD
    user.save()
  }
}

export function createLiquiditySnapshot(position: LiquidityPosition, event: EthereumEvent): void {
  let timestamp = event.block.timestamp.toI32()
  let bundle = Bundle.load('1')
  let pair = Pair.load(position.pair)
  let token0 = Token.load(pair.token0)
  let token1 = Token.load(pair.token1)

  // create new snapshot
  let snapshot = new LiquidityPositionSnapshot(position.id.concat(timestamp.toString()))
  snapshot.liquidityPosition = position.id
  snapshot.timestamp = timestamp
  snapshot.block = event.block.number.toI32()
  snapshot.user = position.user
  snapshot.pair = position.pair
  snapshot.token0PriceUSD = token0.derivedETH.times(bundle.ethPrice)
  snapshot.token1PriceUSD = token1.derivedETH.times(bundle.ethPrice)
  snapshot.reserve0 = pair.reserve0
  snapshot.reserve1 = pair.reserve1
  snapshot.reserveUSD = pair.reserveUSD
  snapshot.liquidityTokenTotalSupply = pair.totalSupply
  snapshot.liquidityTokenBalance = position.liquidityTokenBalance
  snapshot.liquidityPosition = position.id
  snapshot.save()
  position.save()
}
