import { Bytes } from "@graphprotocol/graph-ts"
import {
  NFTListed as NFTListedEvent,
  NFTPurchased as NFTPurchasedEvent,
  NFTUnlisted as NFTUnlistedEvent
} from "../generated/NFTMarketplace/NFTMarketplace"
import { NFTInMarket, NFTListed, NFTPurchased, NFTUnlisted } from "../generated/schema"
import { store } from '@graphprotocol/graph-ts'

export function handleNFTListed(event: NFTListedEvent): void {
  let entity = new NFTListed(
    Bytes.fromByteArray(Bytes.fromBigInt(event.params.tokenId))  
    )

  let nftListed = new NFTInMarket(
    Bytes.fromByteArray(Bytes.fromBigInt(event.params.tokenId))  
  )

  entity.nftAddress = event.params.nftAddress
  entity.tokenId = event.params.tokenId
  entity.price = event.params.price
  entity.paymentToken = event.params.paymentToken

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  nftListed.tokenId = event.params.tokenId
  nftListed.nftAddress = event.params.nftAddress
  nftListed.price = event.params.price
  nftListed.paymentToken = event.params.paymentToken


  entity.save()
  nftListed.save()
}

export function handleNFTPurchased(event: NFTPurchasedEvent): void {
  let entity = new NFTPurchased(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )

  let nftListed =  NFTInMarket.load(
    Bytes.fromByteArray(Bytes.fromBigInt(event.params.tokenId))  
  )

  entity.nftAddress = event.params.nftAddress
  entity.tokenId = event.params.tokenId
  entity.buyer = event.params.buyer
  entity.price = event.params.price

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  if(nftListed){
    nftListed.buyer = event.params.buyer
    nftListed.save()
}

  entity.save()
}

export function handleNFTUnlisted(event: NFTUnlistedEvent): void {
  let entity = new NFTUnlisted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )

  store.remove(
    "NFTInMarket",
    Bytes.fromByteArray(Bytes.fromBigInt(event.params.tokenId)).toHexString()  
    )

  entity.nftAddress = event.params.nftAddress
  entity.tokenId = event.params.tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  
  entity.save()
}
