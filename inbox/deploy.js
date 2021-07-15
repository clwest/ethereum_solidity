const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const {interface, bytecode} = require('./compile')

const provider = new HDWalletProvider('asset inmate carbon warm mimic pipe help front all rebel regular slot', 
                                    'https://rinkeby.infura.io/v3/7a809cd52b8544a6b2491a8dc853745b')

const web3 = new Web3(provider)

const deploy = async () => {
    const accounts = await web3.eth.getAccounts()

    console.log("Attempting to deploy from account", accounts[0])
    
    const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: '0x' + bytecode, arguments: ['Hi There']})
    .send({gas: '1000000', gasPrice: web3.utils.toWei('2', 'gwei'), from: accounts[0]})

    console.log('Contract deployed to', result.options.address)
}
deploy()
