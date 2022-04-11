import {
  Address,
  BigInt,
  log,
} from "@graphprotocol/graph-ts"

// Initialize a Token Definition with the attributes
export class TokenDefinition {
  address : Address
  symbol: string
  name: string
  decimals: BigInt

  // Initialize a Token Definition with its attributes
  constructor(address: Address, symbol: string, name: string, decimals: BigInt) {
    this.address = address
    this.symbol = symbol
    this.name = name
    this.decimals = decimals
  }

  // Get all tokens with a static defintion
  static getStaticDefinitions(): Array<TokenDefinition> {
    let staticDefinitions = new Array<TokenDefinition>(13)

    let tokenWCFX = new TokenDefinition(
      Address.fromString('0x14b2d3bc65e74dae1030eafd8ac30c533c976a9b'),
      'WCFX',
      'WCFX',
      BigInt.fromI32(18)
    )
    staticDefinitions.push(tokenWCFX)

    let tokenETH = new TokenDefinition(
      Address.fromString('0xa47f43de2f9623acb395ca4905746496d2014d57'),
      'ETH',
      'ETH',
      BigInt.fromI32(18)
    )
    staticDefinitions.push(tokenETH)

    let tokenWBTC = new TokenDefinition(
      Address.fromString('0x1f545487c62e5acfea45dcadd9c627361d1616d8'),
      'WBTC',
      'WBTC',
      BigInt.fromI32(18)
    )
    staticDefinitions.push(tokenWBTC)

    let tokenUSDT = new TokenDefinition(
      Address.fromString('0xfe97e85d13abd9c1c33384e796f10b73905637ce'),
      'USDT',
      'USDT',
      BigInt.fromI32(18)
    )
    staticDefinitions.push(tokenUSDT)

    let tokenPPI = new TokenDefinition(
      Address.fromString('0x22f41abf77905f50df398f21213290597e7414dd'),
      'PPI',
      'PPI',
      BigInt.fromI32(18)
    )
    staticDefinitions.push(tokenPPI)

    let tokenCKING = new TokenDefinition(
      Address.fromString('0x2312338f19ee46e8beeed847f0105bde615acb45'),
      'CKING',
      'CKING',
      BigInt.fromI32(18)
    )
    staticDefinitions.push(tokenCKING)

    let PPILPBTCETH = new TokenDefinition(
      Address.fromString('0x5767d71b462464ff77f6fbc81b8377ad49983511'),
      'PPI-LP BTC-ETH',
      'PPI-LP BTC-ETH',
      BigInt.fromI32(18)
    )
    staticDefinitions.push(PPILPBTCETH)

    let PPILPWCFXETH = new TokenDefinition(
      Address.fromString('0x8ea70966e8f14337657bff7f40cfb9648f79530b'),
      'PPI-LP WCFX-ETH',
      'PPI-LP WCFX-ETH',
      BigInt.fromI32(18)
    )
    staticDefinitions.push(PPILPWCFXETH)

    let PPILPWCFXBTC = new TokenDefinition(
      Address.fromString('0x8bbbd6150c933fcd790b4a00bab23826912c192c'),
      'PPI-LP WCFX-BTC',
      'PPI-LP WCFX-BTC',
      BigInt.fromI32(18)
    )
    staticDefinitions.push(PPILPWCFXBTC)

    let PPILPETHUSDT = new TokenDefinition(
      Address.fromString('0xa6943647f22cb9de7a80d1f447db48b0209a812a'),
      'PPI-LP ETH-USDT',
      'PPI-LP ETH-USDT',
      BigInt.fromI32(18)
    )
    staticDefinitions.push(PPILPETHUSDT)

    let PPILPBTCUSDT = new TokenDefinition(
      Address.fromString('0x9b2e43277238d4c6a9534caa84cf80cb076810ea'),
      'PPI-LP BTC-USDT',
      'PPI-LP BTC-USDT',
      BigInt.fromI32(18)
    )
    staticDefinitions.push(PPILPBTCUSDT)

    let PPILPWCFXUSDT = new TokenDefinition(
      Address.fromString('0x8fcf9c586d45ce7fcf6d714cb8b6b21a13111e0b'),
      'PPI-LP WCFX-USDT',
      'PPI-LP WCFX-USDT',
      BigInt.fromI32(18)
    )
    staticDefinitions.push(PPILPWCFXUSDT)

    let PPILPWCFXCKING = new TokenDefinition(
      Address.fromString('0x7026e8d1ee68b208803e1a0c62dec42b9119be2e'),
      'PPI-LP WCFX-CKING',
      'PPI-LP WCFX-CKING',
      BigInt.fromI32(18)
    )
    staticDefinitions.push(PPILPWCFXCKING)

    return staticDefinitions
  }

  // Helper for hardcoded tokens
  static fromAddress(tokenAddress: Address) : TokenDefinition | null {
    let staticDefinitions = this.getStaticDefinitions()
    let tokenAddressHex = tokenAddress.toHexString()

    // Search the definition using the address
    for (let i = 0; i < staticDefinitions.length; i++) {
      let staticDefinition = staticDefinitions[i]
      if(staticDefinition.address.toHexString() == tokenAddressHex) {
        return staticDefinition
      }
    }

    // If not found, return null
    return null
  }

}