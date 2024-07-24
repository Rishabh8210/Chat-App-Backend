const ConversationRepository = require('../repositories/ConversationRepository');
class ConversationService{
    constructor(){
        this.convoService = new ConversationRepository();
    }

    async createMessage(data){
        try {
            const message = await this.convoService.createMessage(data);
            return message;
        } catch (error) {
            console.log("Something went wrong in service layer");
            throw {error}
        }
    }

    async getAllMessage(senderId, receiverId){
        try {
            console.log(senderId, receiverId)
            const message = await this.convoService.getAllMessage(senderId, receiverId);
            return message;
        } catch (error) {
            console.log("Something went wrong in service layer");
            throw {error}
        }
    }
}

module.exports = ConversationService