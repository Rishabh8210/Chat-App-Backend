const { conversation } = require('../models/index');
const {Op} = require('sequelize')
const Conversation = require('../models/Conversations')
class ConversationRepository{
    async createMessage(data){
        try {
            const message = await Conversation.create(data);
            return message;
        } catch (error) {
            console.log("SOmething went wrong inside Repository layer");
            throw {error};
        }
    }

    async deleteMessage(messageId){
        try {
            const message = await Conversation.findByIdAndDelete(messageId)
            return message
        } catch (error) {
            console.log("Something went wrong inside Repository layer");
            throw {error};
        }
    }

    async getAllMessage(senderId, receiverId){
        try {
            const messages = await Conversation.find({
                $or: [
                    { senderId: senderId, receiverId: receiverId },
                    { senderId: receiverId, receiverId: senderId }
                ]
            });
            return messages;
        } catch (error) {
            console.log("SOmething went wrong inside Repository layer");
            throw {error};
        }
    }
}

module.exports = ConversationRepository