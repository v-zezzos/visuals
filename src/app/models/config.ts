export class VegetalOil {
    constructor(
        public name: string,
        public id: string,
        public isEssential: boolean,
        public img: string,
        public imgFlacon: string,
        public backgroundColor: string,
        public description: string,
        public properties: string,
        public precaution: string,
        public pregnant: boolean,
        public ageLimit: string
  ) {
    this.id = '' + this.id;
  }
}

export class EssentialOil extends VegetalOil {
    constructor(
        public name: string,
        public id: string,
        public isEssential: boolean,
        public img: string,
        public imgFlacon: string,
        public backgroundColor: string,
        public bienfaits: string,
        public description: string,
        public latinName: string,
        public origin: string,
        public partsUsed: string,
        public mainComponents: string,
        public properties: string,
        public usageTips: string,
        public precaution: string,
        public didYouKnow: string,
        public compatibilitiesOfUses: {cutanee: string, diffusion: string, orale: string, respiratoire: string},
        public pregnant: boolean,
        public ageLimit: string
  ) {
    super(name, id, isEssential, img, imgFlacon, backgroundColor, description, properties, precaution, pregnant, ageLimit);
  }

}

export class News {
    constructor(
        public name: string,
        public id: string,
        public img: string,
        public newsName: string,
        public newsKeyWordSubTitle: string,
        public newsDescription: string
  ) {
    this.id = '' + this.id;
  }
}

export class Recettes {
    constructor(
        public name: string,
        public id: string,
        public huiles: {id: string}[]
  ) {
    this.id = '' + this.id;
  }
}

export class Maux {
  constructor(
    public name: string,
    public id: string,
    public recettes: {id: string}[]
  ) {
    this.id = '' + this.id;
  }
}
