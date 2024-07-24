const ConversationService = require('../services/ConversationService');
const { StatusCodes } = require("http-status-codes");
const convoController = new ConversationService();

async function createMessage(req, res){
    try {
        const data = {
            senderId: req.user.id,
            receiverId: req.body.receiverId,
            message: req.body.message
        }
        console.log(data);
        const message = await convoController.createMessage(data);
        return res.status(StatusCodes.CREATED).json({
            data: message,
            message: 'Successfully created a message',
            success: true,
            err: {}
        })
    } catch (error) {
        console.log(error)
        res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            data: {},
            err: error,
            message: 'Not able to create message'
        })
    }
}

async function getAllMessage(req, res){
    try {
        const sendetId = req.user.id;
        const receiverId = req.params.id;
        console.log(sendetId, receiverId)
        const messages = await convoController.getAllMessage(sendetId, receiverId);
        return res.status(StatusCodes.OK).json({
            data: messages,
            message: 'Successfully fetched all messages',
            success: true,
            err: {}
        })
    } catch (error) {
        console.log(error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            data: {},
            err: error,
            message: 'Not able to fetch messages'
        })
    }
}

module.exports = {
    createMessage,
    getAllMessage
}