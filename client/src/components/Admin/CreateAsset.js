import React from 'react'
import { DAppProvider, useEthers, useEtherBalance, BSCTestnet, useContractFunction } from '@usedapp/core'
import { formatEther } from '@ethersproject/units'
import { getDefaultProvider, utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import challengeAbi from '../../abis/challengeAbi.json'

const changeBackground = e => {
    e.target.style.background = 'antiquewhite';
}
const resetBackground = e => {
    e.target.style.background = 'antiquewhite';
}

const config = {
    readOnlyChainId: BSCTestnet.chainId,
    readOnlyUrls: {
      [BSCTestnet.chainId]: getDefaultProvider('https://endpoints.omniatech.io/v1/bsc/testnet/public'),
    },
}

const AddAsset = () => {
    const { activateBrowserWallet, account, deactivate } = useEthers()
    const assetInterface = new utils.Interface(challengeAbi)
    const assetAdr = '0x5F3B1e884ff595323921249571BeA9FfAE4A5CBE'
    const contract = new Contract(assetAdr, assetInterface)
    const { state, send } = useContractFunction(contract, 'createChallenge')


    function createAsset(){
        const deployTx = send("BIN_C_1", 12)

        console.log("Deploy tx: ". deployTx)

        return deployTx;
    }

    return(
        <div>
            <button onClick={createAsset} className="btn" onMouseOver={changeBackground} onMouseOut={resetBackground}>
                Create asset
            </button>
        </div>
    )
}


const CreateAsset = () => {

    return (
        <DAppProvider config={config}>
            <AddAsset />
        </DAppProvider>
    )
}

export default CreateAsset