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
import { handleNFTListed, handleNFTPurchased, handleNFTUnlisted } from "../src/nft-marketplace"
import { createNFTListedEvent, createNFTPurchasedEvent, createNFTUnlistedEvent } from "./nft-marketplace-utils"
import { log } from "matchstick-as/assembly/log";

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0
var id: Bytes;

describe("Describe entity assertions", () => {

  beforeAll(() => {
    let nftAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let seller = Address.fromString(
      "0x0000000000000000000000000000000000000003"
    )
    let tokenId = BigInt.fromI32(234)
    let price = BigInt.fromI32(234)
    let paymentToken = Address.fromString(
      "0x0000000000000000000000000000000000000002"
    )
    let newNFTListedEvent = createNFTListedEvent(
      seller,
      nftAddress,
      tokenId,
      price,
      paymentToken
    )
     id =  Bytes.fromByteArray(Bytes.fromBigInt(newNFTListedEvent.params.tokenId))  
    handleNFTListed(newNFTListedEvent)
  })

  afterAll(() => {
    clearStore()
  })


  test("NFTMInMkarket object after listing", () =>{
    assert.entityCount("NFTInMarket", 1)
    assert.fieldEquals(
      "NFTInMarket",
      id.toHexString(),
      "paymentToken",
      "0x0000000000000000000000000000000000000002"
    )

    assert.fieldEquals(
      "NFTInMarket",
      id.toHexString(),
      "seller",
      "0x0000000000000000000000000000000000000003"
    )
  })


  test("NFTInMarket object after buying", () =>{
    let nftAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let tokenId = BigInt.fromI32(234)
    let price = BigInt.fromI32(234)
    let buyer = Address.fromString(
      "0x0000000000000000000000000000000000000002"
    )
    let seller = Address.fromString(
      "0x0000000000000000000000000000000000000003"
    )
    let newNFTListedEvent = createNFTPurchasedEvent(
      seller,
      nftAddress,
      tokenId,
      buyer,
      price
    )
    handleNFTPurchased(newNFTListedEvent)
    assert.entityCount("NFTInMarket", 1)
  

    assert.fieldEquals(
      "NFTInMarket",
      id.toHexString(),
      "buyer",
      "0x0000000000000000000000000000000000000002"
    )

    assert.fieldEquals(
      "NFTInMarket",
      id.toHexString(),
      "seller",
      "0x0000000000000000000000000000000000000003"
    )
  })


  test("NFTInMarket has to be removed after un-listing", () =>{

    let nftAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let tokenId = BigInt.fromI32(234)
    let seller = Address.fromString(
      "0x0000000000000000000000000000000000000003"
    )
    let newNFTListedEvent = createNFTUnlistedEvent(
     seller,
      nftAddress,
      tokenId,
    )
    handleNFTUnlisted(newNFTListedEvent)
    assert.entityCount("NFTInMarket", 0)

  })

})
