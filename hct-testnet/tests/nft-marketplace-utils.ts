import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  NFTListed,
  NFTPurchased,
  NFTUnlisted
} from "../generated/NFTMarketplace/NFTMarketplace"

export function createNFTListedEvent(
  seller: Address,
  nftAddress: Address,
  tokenId: BigInt,
  price: BigInt,
  paymentToken: Address
): NFTListed {
  let nftListedEvent = changetype<NFTListed>(newMockEvent())

  nftListedEvent.parameters = new Array()


  nftListedEvent.parameters.push(
    new ethereum.EventParam(
      "seller",
      ethereum.Value.fromAddress(seller)
    )
  )

  nftListedEvent.parameters.push(
    new ethereum.EventParam(
      "nftAddress",
      ethereum.Value.fromAddress(nftAddress)
    )
  )
  nftListedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  nftListedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )
  nftListedEvent.parameters.push(
    new ethereum.EventParam(
      "paymentToken",
      ethereum.Value.fromAddress(paymentToken)
    )
  )

  return nftListedEvent
}

export function createNFTPurchasedEvent(
  seller: Address,
  nftAddress: Address,
  tokenId: BigInt,
  buyer: Address,
  price: BigInt
): NFTPurchased {
  let nftPurchasedEvent = changetype<NFTPurchased>(newMockEvent())

  nftPurchasedEvent.parameters = new Array()


  nftPurchasedEvent.parameters.push(
    new ethereum.EventParam(
      "seller ",
      ethereum.Value.fromAddress(seller)
    )
  )
  nftPurchasedEvent.parameters.push(
    new ethereum.EventParam(
      "nftAddress",
      ethereum.Value.fromAddress(nftAddress)
    )
  )
  nftPurchasedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  nftPurchasedEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )
  nftPurchasedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return nftPurchasedEvent
}

export function createNFTUnlistedEvent(
  seller: Address,
  nftAddress: Address,
  tokenId: BigInt
): NFTUnlisted {
  let nftUnlistedEvent = changetype<NFTUnlisted>(newMockEvent())

  nftUnlistedEvent.parameters = new Array()

  nftUnlistedEvent.parameters.push(
    new ethereum.EventParam(
      "seller",
      ethereum.Value.fromAddress(seller)
    )
  )

  nftUnlistedEvent.parameters.push(
    new ethereum.EventParam(
      "nftAddress",
      ethereum.Value.fromAddress(nftAddress)
    )
  )
  nftUnlistedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return nftUnlistedEvent
}
