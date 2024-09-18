const Chat = require('../model/chat');
const Group = require('../model/group');

exports.postLoginAddChat = async (req, res) => {
    console.log("req.user.id = " + req.user.id);

    try {
        const chat = req.body.chat;
        const groupId = req.body.groupId;
        console.log('user chat = ' + chat);
        console.log('groupId = ' + groupId);

        let chatResponse = await Chat.create({
            chatName: chat,
            groupId: groupId,
            signupId: req.user.id,
        })

        res.status(200).json({ success: true, chatData: chatResponse, message: 'Chat Added' })

    } catch (err) {
        console.log("post chat error = " + JSON.stringify(err));
        res.status(500).json({
            error: err,
        })
    }
}

exports.getAllChat = async (req, res) => {
    try {
        const allChatData = await Chat.findAll();
        console.log("get allChatData = " + JSON.stringify(allChatData));

        res.status(200).json({ allChatData: allChatData });

    }
    catch (err) {
        console.log("get all chat error = " + JSON.stringify(err));
        res.status(500).json({
            error: err,
        })
    }
}

exports.getChatsByGroup = async (req, res) => {
    const groupId = req.query.groupId;
    console.log('groupId = ' + groupId);

    try {
        const chats = await Chat.findAll({
            where: { groupId: groupId },
            include: [{ model: Group, attributes: ['groupName'] }]
        });
        console.log("chats = " + JSON.stringify(chats));

        res.status(200).json({ success: true, allChatData: chats });

    } catch (err) {
        console.log("getChatsByGroup error = " + JSON.stringify(err));
        res.status(500).json({ error: err });
    }
}