import { Bytes } from "@graphprotocol/graph-ts"
import {
  NFTListed as NFTListedEvent,
  NFTPurchased as NFTPurchasedEvent,
  NFTUnlisted as NFTUnlistedEvent
} from "../generated/NFTMarketplace/NFTMarketplace"
import { NFTInMarket, NFTListed, NFTPurchased, NFTUnlisted } from "../generated/schema"
import { store } from '@graphprotocol/graph-ts'

export function handleNFTListed(event: NFTListedEvent): void {

  let nftListed = new NFTInMarket(
    Bytes.fromByteArray(Bytes.fromBigInt(event.params.tokenId))  
  )

  nftListed.tokenId = event.params.tokenId
  nftListed.nftAddress = event.params.nftAddress
  nftListed.price = event.params.price
  nftListed.paymentToken = event.params.paymentToken
  nftListed.seller = event.params.seller

  nftListed.save()
}

export function handleNFTPurchased(event: NFTPurchasedEvent): void {
  let nftListed =  NFTInMarket.load(
    Bytes.fromByteArray(Bytes.fromBigInt(event.params.tokenId))  
  )

  if(nftListed){
    nftListed.buyer = event.params.buyer
    nftListed.save()
  }
}

export function handleNFTUnlisted(event: NFTUnlistedEvent): void {
  store.remove(
    "NFTInMarket",
    Bytes.fromByteArray(Bytes.fromBigInt(event.params.tokenId)).toHexString()  
    )
}
