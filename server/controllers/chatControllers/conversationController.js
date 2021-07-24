import Conversation from '../../models/Conversation.js';

// save new conversation in the database
const saveConversation = async (request, response) => {
    const newConversation = new Conversation({
        members: [request.body.senderId, request.body.recieverId],
    })

    try {
        // save new Conversation in the database
        const savedConversation = await newConversation.save();
        response.status(200).json(savedConversation);
    } catch (error) {
        response.status(500).json(error);
    }
}


// load conversation of a specific user from the database
const getConversationOfUser = async (request, response) => {
    try {
        const userConversationList = await Conversation.find({
            members: { $in: [request.params.userId] }
        });
        response.status(200).json(userConversationList);
    } catch (error) {
        response.status(500).json(error);
    }
}

export { saveConversation, getConversationOfUser };
