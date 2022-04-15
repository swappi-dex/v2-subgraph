import {
  Address,
  BigInt,
  log,
} from "@graphprotocol/graph-ts"
import { networkAddress } from './helpers'

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
    const staticDefinitions: TokenDefinition[] = []

    let tokenWCFX = new TokenDefinition(
      Address.fromString(networkAddress[1]),
      'CFX',
      'CFX',
      BigInt.fromI32(18)
    )
    staticDefinitions.push(tokenWCFX)

    let tokenWBTC = new TokenDefinition(
      Address.fromString(networkAddress[2]),
      'WBTC',
      'WBTC',
      BigInt.fromI32(18)
    )
    staticDefinitions.push(tokenWBTC)

    let tokenETH = new TokenDefinition(
      Address.fromString(networkAddress[3]),
      'ETH',
      'ETH',
      BigInt.fromI32(18)
    )
    staticDefinitions.push(tokenETH)

    let tokenUSDT = new TokenDefinition(
      Address.fromString(networkAddress[4]),
      'USDT',
      'USDT',
      BigInt.fromI32(18)
    )
    staticDefinitions.push(tokenUSDT)

    let tokenPPI = new TokenDefinition(
      Address.fromString(networkAddress[11]),
      'PPI',
      'PPI',
      BigInt.fromI32(18)
    )
    staticDefinitions.push(tokenPPI)

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