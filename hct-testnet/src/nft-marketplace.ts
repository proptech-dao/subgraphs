import {
  NFTListed as NFTListedEvent,
  NFTPurchased as NFTPurchasedEvent,
  NFTUnlisted as NFTUnlistedEvent
} from "../generated/NFTMarketplace/NFTMarketplace"
import { NFTListed, NFTPurchased, NFTUnlisted } from "../generated/schema"

export function handleNFTListed(event: NFTListedEvent): void {
  let entity = new NFTListed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )

  entity.nftAddress = event.params.nftAddress
  entity.tokenId = event.params.tokenId
  entity.price = event.params.price
  entity.paymentToken = event.params.paymentToken

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNFTPurchased(event: NFTPurchasedEvent): void {
  let entity = new NFTPurchased(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.nftAddress = event.params.nftAddress
  entity.tokenId = event.params.tokenId
  entity.buyer = event.params.buyer
  entity.price = event.params.price

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNFTUnlisted(event: NFTUnlistedEvent): void {
  let entity = new NFTUnlisted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.nftAddress = event.params.nftAddress
  entity.tokenId = event.params.tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
