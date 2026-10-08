export default class CardData {
  beenSelected: boolean;
  id: string;

  constructor() {
    this.beenSelected = false;
    this.id = crypto.randomUUID();
  }
}
