import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import { NFTListed } from "../generated/schema"
import { NFTListed as NFTListedEvent } from "../generated/NFTMarketplace/NFTMarketplace"
import { handleNFTListed } from "../src/nft-marketplace"
import { createNFTListedEvent } from "./nft-marketplace-utils"
import { log } from "matchstick-as/assembly/log";

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0
var id: Bytes;

describe("Describe entity assertions", () => {

  beforeAll(() => {
    let nftAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let tokenId = BigInt.fromI32(234)
    let price = BigInt.fromI32(234)
    let paymentToken = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newNFTListedEvent = createNFTListedEvent(
      nftAddress,
      tokenId,
      price,
      paymentToken
    )
     id = newNFTListedEvent.transaction.hash.concatI32(newNFTListedEvent.logIndex.toI32())
      log.warning(id.toString(), [])
    handleNFTListed(newNFTListedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("NFTListed created and stored", () => {
    assert.entityCount("NFTListed", 1)
    
    log.warning(`string id ${id.toHexString()}` , [])

    // 0xA16081F360e3847006dB660bae1c6d1b2e17eC2A is the default address used in newMockEvent() function
    assert.fieldEquals(
      "NFTListed",
      id.toHexString(),
      "nftAddress",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "NFTListed",
      id.toHexString(),
      "tokenId",
      "234"
    )
    assert.fieldEquals(
      "NFTListed",
      id.toHexString(),
      "price",
      "234"
    )
    assert.fieldEquals(
      "NFTListed",
      id.toHexString(),
      "paymentToken",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })



})
