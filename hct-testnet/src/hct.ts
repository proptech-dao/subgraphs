import { Bytes } from "@graphprotocol/graph-ts"
import {
  AdminChanged as AdminChangedEvent,
  BeaconUpgraded as BeaconUpgradedEvent,
  Upgraded as UpgradedEvent,
  Mint as MintEvent,
  Transfer as TransferEvent,
} from "../generated/Contract/Contract"
import { AdminChanged, BeaconUpgraded, Upgraded, Minted, NFTRaw } from "../generated/schema"



export function handleMintEvent(event: MintEvent): void {
  let entity = new Minted(
    Bytes.fromByteArray(Bytes.fromBigInt(event.params.tokenId))  
    )

  
    entity.owner = event.params.to
    entity.tokenId = event.params.tokenId
    entity.uri = event.params.uri
    entity.transactionHash = event.transaction.hash

  let rawNftEntity = new NFTRaw(
    Bytes.fromByteArray(Bytes.fromBigInt(event.params.tokenId))  
    )

  rawNftEntity.owner = event.params.to
  rawNftEntity.tokenId = event.params.tokenId
  rawNftEntity.uri = event.params.uri
  rawNftEntity.transactionHash = event.transaction.hash

    entity.save()
    rawNftEntity.save()
}

export function handleTransferEvent(event: TransferEvent): void {
  const nftRaw = NFTRaw.load(
    Bytes.fromByteArray(Bytes.fromBigInt(event.params.tokenId))  
    )

  if(nftRaw){
    nftRaw.owner = event.params.to 
    nftRaw.save()
  }
    
}



export function handleAdminChanged(event: AdminChangedEvent): void {
  let entity = new AdminChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousAdmin = event.params.previousAdmin
  entity.newAdmin = event.params.newAdmin

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
// test
  entity.save()
}


export function handleBeaconUpgraded(event: BeaconUpgradedEvent): void {
  let entity = new BeaconUpgraded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.beacon = event.params.beacon

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUpgraded(event: UpgradedEvent): void {
  let entity = new Upgraded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.implementation = event.params.implementation

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
