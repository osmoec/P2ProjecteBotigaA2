import { Injectable } from '@angular/core';
import Web3, {MetaMaskProvider} from 'web3';
import {HttpClient} from '@angular/common/http';
declare let window: any;
@Injectable({
  providedIn: 'root'
})
export class MetamaskService {
  provider: MetaMaskProvider<any> | null = null;
  web3: Web3 | null = null;
  compte: any | null = null;

  constructor( public http: HttpClient) {
    if (typeof window.ethereum !== 'undefined') {
      this.provider = window.ethereum;

      if (!this.provider?.isMetaMask){
        console.log('l extensio no es metamask');
        this.provider = null
        return
      }

      this.web3 = new Web3(window.ethereum);
    }
    else{
      console.log('no s ha trobat cap extensio')
    }
  }

  async iniciDeSessio(){
    if (!this.provider?.isMetaMask){
      console.log('no es troba metamask')
      return;
    }
    else{
        let comptes = await this.provider.request({method:'eth_requestAccounts'})
        // @ts-ignore
      this.compte = comptes[0]
    }
  }

  async preuBNB(){
    let esp = await fetch("https://api.coinpaprika.com/v1/tickers/bnb-binance-coin?quotes=EUR").then(res => res.json())

    return { nom: esp.symbol, preu: esp.quotes.EUR.price };
  }

  async preuBUSD(){
    let esp = await fetch("https://api.coinpaprika.com/v1/tickers/busd-binance-usd?quotes=EUR").then(res => res.json())

    return { nom: esp.symbol, preu: esp.quotes.EUR.price };
  }

  /*
  async preuApis(){
    try {
      await Moralis.start({
        apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjNmNDA2YmIyLWU4NTktNDU5OS1hMmYyLWVlYzVjZTJmNTA1MSIsIm9yZ0lkIjoiNDQ2Nzg0IiwidXNlcklkIjoiNDU5NjgxIiwidHlwZUlkIjoiNTM4ODNkZjAtNmMyMy00YTZlLThlMTYtYWU5ZWQ4Mjc2ZmQ4IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3NDcxMjA0OTIsImV4cCI6NDkwMjg4MDQ5Mn0.7GhoLF46z8DXEm8Gxo_HHbaI1Q3QmLEYZhmC3eXzaAY"
      });

      const bnb = await Moralis.EvmApi.token.getTokenPrice({
        "chain": "0x61",
        "include": "percent_change",
        "address": "0xB8c77482e45F1F44dE1745F52C74426C631bDD52"
      });

      const busd = await Moralis.EvmApi.token.getTokenPrice({
        "chain": "0x61",
        "include": "percent_change",
        "address": "0x4Fabb145d64652a948d72533023f6E7A623C7C53"
      });

      console.log(bnb.raw);
      console.log(busd.raw);
    } catch (e) {
      console.error(e);
    }
  }
   */
}

