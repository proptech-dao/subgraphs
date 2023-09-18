import { Bytes } from "@graphprotocol/graph-ts"
import {
  NFTListed as NFTListedEvent,
  NFTPurchased as NFTPurchasedEvent,
  NFTUnlisted as NFTUnlistedEvent
} from "../generated/NFTMarketplace/NFTMarketplace"
import { NFTInMarket } from "../generated/schema"
import { store } from '@graphprotocol/graph-ts'

export function handleNFTListed(event: NFTListedEvent): void {

  let nftIntMarket = new NFTInMarket(
    Bytes.fromByteArray(Bytes.fromBigInt(event.params.tokenId))  
  )

  nftIntMarket.tokenId = event.params.tokenId
  nftIntMarket.nftAddress = event.params.nftAddress
  nftIntMarket.price = event.params.price
  nftIntMarket.paymentToken = event.params.paymentToken
  nftIntMarket.seller = event.params.seller

  nftIntMarket.save()
}

export function handleNFTPurchased(event: NFTPurchasedEvent): void {
  let nftIntMarket =  NFTInMarket.load(
    Bytes.fromByteArray(Bytes.fromBigInt(event.params.tokenId))  
  )

  if(nftIntMarket){
    nftIntMarket.buyer = event.params.buyer
    nftIntMarket.save()
  }
}

export function handleNFTUnlisted(event: NFTUnlistedEvent): void {
  store.remove(
    "NFTInMarket",
    Bytes.fromByteArray(Bytes.fromBigInt(event.params.tokenId)).toHexString()  
    )
}
