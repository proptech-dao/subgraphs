import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import { AdminChanged } from "../generated/schema"
import { AdminChanged as AdminChangedEvent } from "../generated/Contract/Contract"
import { handleAdminChanged, handleMintEvent, handleTransferEvent } from "../src/hct"
import { createAdminChangedEvent, createMintedEvent, createTransferEvenet } from "./hct-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

var id: Bytes;


describe("Describe entity assertions", () => {
  beforeAll(() => {
    let previousAdmin = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newAdmin = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newAdminChangedEvent = createAdminChangedEvent(previousAdmin, newAdmin)

    let newMintedEvent = createMintedEvent(
      Address.fromString("0x0000000000000000000000000000000000000001"),
      BigInt.fromU32(0),
      "uri"
     )

     id = Bytes.fromByteArray(Bytes.fromBigInt(newMintedEvent.params.tokenId))  


     handleMintEvent(newMintedEvent);

    handleAdminChanged(newAdminChangedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("test for Minted Event", () => {

     assert.entityCount("Minted", 1)
      assert.entityCount("NFTRaw", 1)
     
  })

  test("test for transfer event that should change the owner of an NFT", () => {


    assert.fieldEquals(
      "NFTRaw",
      id.toHexString(),
      "owner",
      "0x0000000000000000000000000000000000000001",
    )
    
    let newTransferEvent = createTransferEvenet(
      Address.fromString("0x0000000000000000000000000000000000000001"),
      Address.fromString("0x0000000000000000000000000000000000000002"),
      BigInt.fromU32(0),
     )
      handleTransferEvent(newTransferEvent)

      
      assert.fieldEquals(
        "NFTRaw",
        id.toHexString(),
        "owner",
        "0x0000000000000000000000000000000000000002",
      )

  })
})
