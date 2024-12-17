export class Coche {
  id: number;
  name: string;
  price: number;
  tags: string[];
  offertext: string;
  imgC: string[];

  constructor(id: number, name: string, price: number, tags: string[], offertext: string, imgC: string[]
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.tags = tags;
    this.offertext = offertext;
    this.imgC = imgC;
  }

}
