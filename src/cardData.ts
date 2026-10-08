export default class CardData {
  beenSelected: boolean;
  id: string;
  imageSrc: string;

  constructor(imageSrc: string) {
    this.imageSrc = imageSrc;
    this.beenSelected = false;
    this.id = crypto.randomUUID();
  }
}
