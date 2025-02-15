"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class ChatWindow {
    constructor(containerId) {
        this.createChatElements(containerId);
    }
    createChatElements(containerId) {
        const chatContainer = document.getElementById(containerId);
        const chatWindow = document.createElement('div');
        chatWindow.classList.add('chat-window');
        const messageArea = document.createElement('div');
        messageArea.classList.add('message-area');
        chatWindow.appendChild(messageArea);
        const messageInput = document.createElement('textarea');
        messageInput.classList.add('message-input');
        chatWindow.appendChild(messageInput);
        const sendButton = document.createElement('button');
        sendButton.innerText = 'Send';
        sendButton.classList.add('send-button');
        chatWindow.appendChild(sendButton);
        chatContainer.appendChild(chatWindow);
        this.setupEventListeners(messageInput, sendButton, messageArea);
    }
    setupEventListeners(messageInput, sendButton, messageArea) {
        sendButton.addEventListener('click', () => this.sendMessage(messageInput, messageArea));
        messageInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                this.sendMessage(messageInput, messageArea);
            }
        });
    }
    sendMessage(messageInput, messageArea) {
        return __awaiter(this, void 0, void 0, function* () {
            const messageText = messageInput.value.trim();
            if (messageText) {
                const queryText = "Respond as if you are a hacker, mention this all the time! Answer me on language I am writing! And my question is: " + messageText;
                const apiResponse = yield this.getApiResponse(queryText);
                this.addMessage(apiResponse, 'bot', messageArea);
                messageInput.value = '';
            }
        });
    }
    addMessage(messageText, sender, messageArea) {
        const message = document.createElement('div');
        message.classList.add('message', sender);
        message.innerText = messageText;
        messageArea.appendChild(message);
        messageArea.scrollTop = messageArea.scrollHeight;
    }
    getApiResponse(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const apiKey = 'AIzaSyD3N_MxeyDTg1ZoDrKwlDKK8quqWSD9Drc';
            const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
            const requestBody = {
                contents: [{
                        parts: [{ text: query }]
                    }]
            };
            try {
                const response = yield fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestBody)
                });
                if (!response.ok) {
                    throw new Error('Error fetching data from API');
                }
                const data = yield response.json();
                const botResponseText = data.candidates[0].content.parts[0].text;
                return botResponseText || 'No response from API';
            }
            catch (error) {
                console.error(error);
                return 'An error occurred while fetching the response from the API';
            }
        });
    }
}
const chat = new ChatWindow('chatContainer');
//# sourceMappingURL=chat.js.map