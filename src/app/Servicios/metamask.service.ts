import { Injectable } from '@angular/core';
import Web3, {MetaMaskProvider} from 'web3';
import {HttpClient} from '@angular/common/http';
import BN from 'bn.js';
import {time} from '@tensorflow/tfjs';
declare let window: any;
@Injectable({
  providedIn: 'root'
})
export class MetamaskService {
  provider: MetaMaskProvider<any> | null = null;
  web3: Web3 | null = null;
  compte: any | null = null;
  BN: Web3 | null = null;
  TM: number = 0
  TM2: number = 0
  BNB2: any | null = null;
  BTCB: any | null = null;
  primer: any = [true,true]

  constructor(public http: HttpClient) {
    if (typeof window.ethereum !== 'undefined') {
      this.provider = window.ethereum;

      if (!this.provider?.isMetaMask) {
        console.log('l extensio no es metamask');
        this.provider = null
        return
      }
      this.web3 = new Web3(window.ethereum);
      this.BN = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545");
      this.TM = Date.now()
    } else {
      console.log('no s ha trobat cap extensio')
    }
  }

  async iniciDeSessio() {
    if (!this.provider?.isMetaMask) {
      console.log('no es troba metamask')
      return;
    } else {
      let comptes = await this.provider.request({method: 'eth_requestAccounts'})
      // @ts-ignore
      this.compte = comptes[0]
      console.log(this.compte)

    }
  }

  async preuBNB() {
    if(this.primer[0] || Date.now() >= (this.TM+62000)){
      let esp = await fetch("https://api.coinpaprika.com/v1/tickers/bnb-binance-coin?quotes=EUR").then(res => res.json())

      this.BNB2 = {nom: esp.symbol, preu: esp.quotes.EUR.price.toFixed(6)};

      this.TM = Date.now();

      this.primer[0] = false

      return {nom: esp.symbol, preu: esp.quotes.EUR.price.toFixed(6)};

    }

    return this.BNB2

  }

  async preuBTC() {

    if(this.primer[1] || Date.now() >= (this.TM2+62000)){
      let esp = await fetch("https://api.coinpaprika.com/v1/tickers/btc-bitcoin?quotes=EUR").then(res => res.json())

      this.BTCB = {nom: esp.symbol, preu: esp.quotes.EUR.price.toFixed(6)};

      this.TM2 = Date.now();

      this.primer[1] = false

      return {nom: esp.symbol, preu: esp.quotes.EUR.price.toFixed(6)};

    }

    return this.BTCB

  }

  async enviarTransacioBNB() {
    if (this.web3) {
      try {
        let quant = this.web3?.utils.toWei("0.00001", "ether")
        let transacio = this.web3?.eth.sendTransaction({
          from: this.compte,
          to: "0xE7D87E82b88C1289248a324788493e1DF1b29F8E",
          value: quant,
          gas: 21000,
          gasPrice: await this.web3?.eth.getGasPrice()
        })

        return transacio
      } catch (e) {
        console.log("erronea")
      }
    } else {
      console.log("no has inicat sessio")
    }
    return
  }


async enviarTransacioBTCB(){
  if (this.web3) {
    const BTCB_TOKEN_ADDRESS = '0x6ce8dA28E2f864420840cF74474eFf5fD80E65B8';

    const ERC20_ABI = [
      {
        constant: false,
        inputs: [
          {name: '_to', type: 'address'},
          {name: '_value', type: 'uint256'}
        ],
        name: 'transfer',
        outputs: [{name: '', type: 'bool'}],
        type: 'function'
      }
    ];
    try {
      const recipient = '0xE7D87E82b88C1289248a324788493e1DF1b29F8E';
      const btcb = new this.web3.eth.Contract(ERC20_ABI, BTCB_TOKEN_ADDRESS);

      const amount = "1";

      const tx = btcb.methods["transfer"](recipient, amount);

      const gas = await tx.estimateGas({from: this.compte});
      const gasPrice = await this.web3.eth.getGasPrice();
      const data = tx.encodeABI();
      const nonce = await this.web3.eth.getTransactionCount(this.compte);

      let transacio = await this.web3.eth.sendTransaction({
        from: this.compte,
        to: BTCB_TOKEN_ADDRESS,
        data,
        gas,
        gasPrice,
        nonce
      });

      return transacio
    } catch (e) {
      console.log('error transaccio');
    }
  } else {
    console.log('no has iniciat sessio');
    }
    return
  }

  async getDadesTran(hashTransacio: string){
    let tranInfo = this.BN?.eth.getTransaction(hashTransacio)

    return tranInfo
  }
}

