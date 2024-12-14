import {Injectable, OnInit} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicioPrincipalService implements OnInit{

  coches = [
    {
      id: 1,
      name: "Mustang Dodge Challenger",
      price: 176000,
      tags: ["car", "gasoline", "semi-luxury"],
      offertext: "Icona dels 'muscle cars', aquest destaca pel seu disseny cuadrat i potent.",
      imgC: [
        "/images/"+encodeURIComponent("Mustang Dodge Challenger v1.png"),
        "/images/"+encodeURIComponent("Mustang Dodge Challenger v2.png"),
        "/images/"+encodeURIComponent("Mustang Dodge Challenger v3.png")
      ]
    },
    {
      id: 2,
      name: "Bugatti La Vult Noir",
      price: 18000000,
      tags: ["car", "gasoline", "luxury"],
      offertext: "Amb el seu disseny ultra-luxós i aerodinàmic, és un dels cotxes mes cars del món.",
      imgC: [
        "/images/"+encodeURIComponent("Bugatti La Vult Noir v1.png"),
        "/images/"+encodeURIComponent("Bugatti La Vult Noir v2.png"),
        "/images/"+encodeURIComponent("Bugatti La Vult Noir v3.png")
      ]
    },
    {
      id: 3,
      name: "Lamborghini Aventador",
      price: 458000,
      tags: ["car", "gasoline", "luxury"],
      offertext: "Aquest super-esportiu és conegut pel seu disseny agressiu i angular.",
      imgC: [
        "/images/"+encodeURIComponent("Lamborghini Aventador v1.png"),
        "/images/"+encodeURIComponent("Lamborghini Aventador v2.png"),
        "/images/"+encodeURIComponent("Lamborghini Aventador v3.png")
      ]
    },
    {
      id: 4,
      name: "Mazda Miata",
      price: 30000,
      tags: ["car", "gasoline", "semi-luxury"],
      offertext: "Malgrat no ser dels més ràpids, continua tenint una estètica esportiva però amigable.",
      imgC: [
        "/images/"+encodeURIComponent("Mazda Miata v1.png"),
        "/images/"+encodeURIComponent("Mazda Miata v2.png"),
        "/images/"+encodeURIComponent("Mazda Miata v3.png")
      ]
    },
    {
      id: 5,
      name: "Kawasaki Ninja H2R",
      price: 55000,
      tags: ["motorcycle", "gasoline", "semi-luxury"],
      offertext: "Es famós per ser una de les motos més rapides i potents del mercat, principalment dissenyada per a circuits.",
      imgC: [
        "/images/"+encodeURIComponent("Kawasaki Ninja H2R v1.png"),
        "/images/"+encodeURIComponent("Kawasaki Ninja H2R v2.png"),
        "/images/"+encodeURIComponent("Kawasaki Ninja H2R v3.png")
      ]
    },
    {
      id: 6,
      name: "Ferrari Roma",
      price: 254000,
      tags: ["car", "gasoline", "luxury"],
      offertext: "Esportiu modern amb un disseny elegant i sofisticat que fa recordar als models classics de la marca italiana.",
      imgC: [
        "/images/"+encodeURIComponent("Ferrari Roma v1.png"),
        "/images/"+encodeURIComponent("Ferrari Roma v2.png"),
        "/images/"+encodeURIComponent("Ferrari Roma v3.png")
      ]
    },
    {
      id: 7,
      name: "Lamborghini Urus",
      price: 240000,
      tags: ["car", "diesel", "luxury"],
      offertext: "Combina la velocitat i el disseny agressiu característic de la marca amb la versatilitat d'un tot-terreny.",
      imgC: [
        "/images/"+encodeURIComponent("Lamborghini Urus v1.png"),
        "/images/"+encodeURIComponent("Lamborghini Urus v2.png"),
        "/images/"+encodeURIComponent("Lamborghini Urus v3.png")
      ]
    },
    {
      id: 8,
      name: "Aston Martin DB12",
      price: 338000,
      tags: ["car", "diesel", "luxury"],
      offertext: "Equipat amb un motor V8, ofereix una mescla perfecta entre luxe, rendiment i tecnologia.",
      imgC: [
        "/images/"+encodeURIComponent("Aston Martin DB12 v1.png"),
        "/images/"+encodeURIComponent("Aston Martin DB12 v2.png"),
        "/images/"+encodeURIComponent("Aston Martin DB12 v3.png")
      ]
    },
    {
      id: 9,
      name: "Maserati MC20",
      price: 276000,
      tags: ["car", "gasoline", "luxury"],
      offertext: "Un super-esportiu que combina l'esportivitat i luxe d'una forma única que marca una nova era per a Maserati.",
      imgC: [
        "/images/"+encodeURIComponent("Maserati MC20 v1.png"),
        "/images/"+encodeURIComponent("Maserati MC20 v2.png"),
        "/images/"+encodeURIComponent("Maserati MC20 v3.png")
      ]
    },
    {
      id: 10,
      name: "Audi R8",
      price: 210000,
      tags: ["car", "gasoline", "luxury"],
      offertext: "És un dels super-esportius mes reconeguts d'Audi, gràcies a la seva tracció i maneig precís, és de entendre el seu excepcional rendiment.",
      imgC: [
        "/images/"+encodeURIComponent("Audi R8 v1.png"),
        "/images/"+encodeURIComponent("Audi R8 v2.png"),
        "/images/"+encodeURIComponent("Audi R8 v3.png")
      ]
    },
    {
      id: 11,
      name: "Ford Mustang GT500",
      price: 149000,
      tags: ["car", "gasoline", "semi-luxury"],
      offertext: "La versió mes extrema d'aquesta gamma, equipada amb un motor V8 que produeix mes de 700 cavalls de potència.",
      imgC: [
        "/images/"+encodeURIComponent("Ford Mustang GT500 v1.png"),
        "/images/"+encodeURIComponent("Ford Mustang GT500 v2.png"),
        "/images/"+encodeURIComponent("Ford Mustang GT500 v3.png")
      ]
    },
    {
      id: 12,
      name: "Chevrolet Camaro ZL1",
      price: 94000,
      tags: ["car", "gasoline", "semi-luxury"],
      offertext: "És la versió de Camaro amb un disseny musculos i esportiu, aquesta mes enfocat en la velocitat i la potència.",
      imgC: [
        "/images/"+encodeURIComponent("Chevrolet Camaro ZL1 v1.png"),
        "/images/"+encodeURIComponent("Chevrolet Camaro ZL1 v2.png"),
        "/images/"+encodeURIComponent("Chevrolet Camaro ZL1 v3.png")
      ]
    },
    {
      id: 13,
      name: "Bugatti Chiron",
      price: 2500000,
      tags: ["car", "gasoline", "luxury"],
      offertext: "El Chiron és conegut per la seva velocitat increïble, superant els 400km/h, i pel seu disseny curvilini i aerodinàmic.",
      imgC: [
        "/images/"+encodeURIComponent("Bugatti Chiron v1.png"),
        "/images/"+encodeURIComponent("Bugatti Chiron v2.png"),
        "/images/"+encodeURIComponent("Bugatti Chiron v3.png")
      ]
    },
    {
      id: 14,
      name: "Lexus LFA",
      price: 415000,
      tags: ["car", "gasoline", "luxury"],
      offertext: "Aquest esportiu japonès, és famós pel so impressionant que ofereix el seu motor V10, i la seva producció limitada que ho fa ser fins i tot mes exclusiu.",
      imgC: [
        "/images/"+encodeURIComponent("Lexus LFA v1.png"),
        "/images/"+encodeURIComponent("Lexus LFA v2.png"),
        "/images/"+encodeURIComponent("Lexus LFA v3.png")
      ]
    },
    {
      id: 15,
      name: "Ferrari F40",
      price: 800000,
      tags: ["car", "gasoline", "luxury"],
      offertext: "Considerat un dels super-esportius mes iconics de Ferrari, és conegut pel seu rendiment i la seva estètica minimalista.",
      imgC: [
        "/images/"+encodeURIComponent("Ferrari F40 v1.png"),
        "/images/"+encodeURIComponent("Ferrari F40 v2.png"),
        "/images/"+encodeURIComponent("Ferrari F40 v3.png")
      ]
    },
    {
      id: 16,
      name: "McLaren Senna",
      price: 1650000,
      tags: ["car", "gasoline", "luxury"],
      offertext: "Un hiper-esportiu que porta el nom del llegendari pilot 'Ayrton Senna', el seu disseny és extremadament aerodinàmic i lleuger enfocat en el rendiment en pista.",
      imgC: [
        "/images/"+encodeURIComponent("McLaren Senna v1.png"),
        "/images/"+encodeURIComponent("McLaren Senna v2.png"),
        "/images/"+encodeURIComponent("McLaren Senna v3.png")
      ]
    },
    {
      id: 17,
      name: "Ferrari SF90",
      price: 510000,
      tags: ["car", "diesel", "luxury"],
      offertext: "L'hibrit mes avançat tecnologicament de Ferrari, amb un disseny futurista i extremadament agressiu. A més subraya el vincul existent entre circuit i carretera.",
      imgC: [
        "/images/"+encodeURIComponent("Ferrari SF90 v1.png"),
        "/images/"+encodeURIComponent("Ferrari SF90 v2.png"),
        "/images/"+encodeURIComponent("Ferrari SF90 v3.png")
      ]
    },
    {
      id: 18,
      name: "Toyota Supra MK4",
      price: 121000,
      tags: ["car", "gasoline", "semi-luxury"],
      offertext: "Gràcies a la seva capacitat de ser altament modificable, el seu disseny és iconic i representa una era daurada dels esportius japonesos dels 90'.",
      imgC: [
        "/images/"+encodeURIComponent("Toyota Supra MK4 v1.png"),
        "/images/"+encodeURIComponent("Toyota Supra MK4 v2.png"),
        "/images/"+encodeURIComponent("Toyota Supra MK4 v3.png")
      ]
    },
    {
      id: 19,
      name: "Chevrolet Corvette ZR1",
      price: 270000,
      tags: ["car", "diesel", "luxury"],
      offertext: "És la versió mes poderosa del Corvette, ja que compta amb un motor que genera mes de 750 cavalls de potència per a maximitzar el rendiment en pista.",
      imgC: [
        "/images/"+encodeURIComponent("Chevrolet Corvette ZR1 v1.png"),
        "/images/"+encodeURIComponent("Chevrolet Corvette ZR1 v2.png"),
        "/images/"+encodeURIComponent("Chevrolet Corvette ZR1 v3.png")
      ]
    }
  ];


  constructor() { }

  ngOnInit(): void {
  }
}
