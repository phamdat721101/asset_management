import React from 'react'
import { DAppProvider, useEthers, useEtherBalance, BSCTestnet, KlaytnTestnet, MetamaskConnector } from '@usedapp/core'
import { formatEther } from '@ethersproject/units'
import { getDefaultProvider, utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import challengeAbi from '../abis/challengeAbi.json'
import { yellow } from '@material-ui/core/colors'

const changeBackground = e => {
    e.target.style.background = 'antiquewhite';
}
const resetBackground = e => {
    e.target.style.background = 'antiquewhite';
}

const config = {
    // readOnlyChainId: BSCTestnet.chainId,
    readOnlyUrls: {
      [KlaytnTestnet.chainId]: getDefaultProvider('https://api.baobab.klaytn.net:8651'),
    },
    connectors: {
        metamask: new MetamaskConnector(),
      },
}

const ConnectButton = () => {
    const { activateBrowserWallet, account, deactivate } = useEthers()
    // const assetInterface = new utils.Interface(challengeAbi)
    // const assetAdr = '0x5F3B1e884ff595323921249571BeA9FfAE4A5CBE'
    // const contract = new Contract(assetAdr, assetInterface)
    // const { state, send } = useContractFunction(contract, 'createChallenge')

    const bscBalance = useEtherBalance(account, { chainId: KlaytnTestnet.chainId })
    console.log("Bsc balance: ", bscBalance)

    function connectWallet(){
        localStorage.setItem("auth_wallet", "PQD");
        activateBrowserWallet()
    }

    return(
        <div className="container">
            {account
                    ?
                    <div>
                        <p style={{background:'yellow'}}>Your account: {account}</p> <br />
                        <button onClick={deactivate} className="btn" onMouseOver={changeBackground} onMouseOut={resetBackground}>
                            Disconnect
                        </button>
                        <hr />
                        {/* Display wallet balance */}
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px 20px' }}>
                            {
                                bscBalance &&
                                <div className="bal" style={{background:'yellow'}}>
                                    <h4>Account Balance</h4>
                                    {formatEther(bscBalance)}
                                </div>
                            }
                        </div>
                    </div>
                    : <p>
                        Please connect wallet. <br />
                        <button
                            onClick={connectWallet}
                            className="btn"
                            onMouseOver={changeBackground}
                            onMouseOut={resetBackground}
                        >
                            Connect Wallet
                        </button>
                    </p>
            }
        </div>
    )
}

const Wallet = () => {

    return (
        <DAppProvider config={config}>
            <ConnectButton />
        </DAppProvider>
    )
}

export default Wallet