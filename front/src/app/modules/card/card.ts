export class Card {
    id: number;
    title: string;
    description: string;
    short_description: string;
    image?: string;

    constructor(v: Card) {
        Object.assign(this, v);
    }
}
