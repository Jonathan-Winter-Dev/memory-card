export default class CardData {
  name: string;
  beenSelected: boolean;
  id: string;

  constructor(name: string) {
    this.name = name;
    this.beenSelected = false;
    this.id = crypto.randomUUID();
  }
}
