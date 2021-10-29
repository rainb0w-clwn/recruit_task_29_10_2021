var Models = require('../models');
var {Logger, getPagination, getPagingData} = require('../utlis');

module.exports = class CardService {
    constructor() {
        this.userModel = Models.Card;
        this.logger = Logger;
    }

    async getCards(params) {
        const { page, size } = params.query;
        const { limit, offset } = getPagination(page, size);
        let cards = await Models.Card.findAndCountAll({limit, offset});
        return getPagingData(cards, page, limit);
    }
    async getCard(cardId) {
        return await Models.Card.findOne({where: {id: cardId}});
    }
};
