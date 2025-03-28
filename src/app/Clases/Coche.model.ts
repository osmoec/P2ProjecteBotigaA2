export class Coche {
  id: number;
  name: string;
  price: number;
  tags: string[];
  offertext: string;
  imgC: string[];
  oferta : number;

  constructor(id: number, name: string, price: number, tags: string[], offertext: string, imgC: string[], ofertas : number) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.tags = tags;
    this.offertext = offertext;
    this.imgC = imgC;
    this.oferta = ofertas;

  }

}
