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
        this.chatContainer = document.querySelector(containerId);
        this.createChatElements();
        this.createButton();
        this.setupEventListeners();
        this.generateRandomMessage();
    }
    createChatElements() {
        this.hackerMessage = document.createElement('h1');
        this.hackerMessage.classList.add("hackerMessage");
        this.hackerMessage.classList.add("hidden");
        this.hackerMessage.innerText = 'Get answers from the worlds top hackers';
        this.chatContainer.appendChild(this.hackerMessage);
        const chatWindow = document.createElement("div");
        chatWindow.classList.add("chat-window");
        chatWindow.classList.add("hidden");
        this.messageArea = document.createElement("div");
        this.messageArea.classList.add("message-area");
        chatWindow.appendChild(this.messageArea);
        this.messageInput = document.createElement("textarea");
        this.messageInput.classList.add("message-input");
        chatWindow.appendChild(this.messageInput);
        this.sendButton = document.createElement("button");
        this.sendButton.innerText = "Send";
        this.sendButton.classList.add("send-button");
        chatWindow.appendChild(this.sendButton);
        this.chatContainer.appendChild(chatWindow);
    }
    setupEventListeners() {
        this.sendButton.addEventListener("click", () => this.sendMessage());
        this.messageInput.addEventListener("keydown", (event) => {
            if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                this.sendMessage();
            }
        });
    }
    sendMessage() {
        return __awaiter(this, void 0, void 0, function* () {
            const messageText = this.messageInput.value.trim();
            if (messageText) {
                this.addMessage(messageText, "user");
                const queryText = "Respond as if you are a hacker, mention this all the time! Answer me on language I am writing! And my question is: " +
                    messageText;
                const apiResponse = yield this.getApiResponse(queryText);
                this.addMessage(apiResponse, "bot");
                this.messageInput.value = "";
            }
        });
    }
    addMessage(messageText, sender) {
        const message = document.createElement("div");
        message.classList.add("message", sender);
        message.innerText = messageText;
        this.messageArea.appendChild(message);
        this.messageArea.scrollTop = this.messageArea.scrollHeight;
    }
    getApiResponse(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const apiKey = "AIzaSyD3N_MxeyDTg1ZoDrKwlDKK8quqWSD9Drc";
            const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
            const requestBody = {
                contents: [
                    {
                        parts: [{ text: query }],
                    },
                ],
            };
            try {
                const response = yield fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(requestBody),
                });
                if (!response.ok) {
                    throw new Error("Error fetching data from API");
                }
                const data = yield response.json();
                const botResponseText = data.candidates[0].content.parts[0].text;
                return botResponseText || "No response from API";
            }
            catch (error) {
                console.error(error);
                return "An error occurred while fetching the response from the API";
            }
        });
    }
    generateRandomMessage() {
        return __awaiter(this, void 0, void 0, function* () {
            const queryText = "Generate a random message from a hacker. Make it sound like a hacker would say it!";
            const apiResponse = yield this.getApiResponse(queryText);
            this.addResponseToContainer(apiResponse);
        });
    }
    addResponseToContainer(responseText) {
        const responseContainer = document.querySelector("#response-container");
        if (responseContainer) {
            const responseMessage = document.createElement("div");
            responseMessage.classList.add("response-message");
            responseMessage.innerText = responseText;
            responseContainer.appendChild(responseMessage);
        }
    }
    createButton() {
        const aiButton = document.querySelector(".aiButton");
        const homeButton = document.querySelector(".homeButton");
        const chatWindow = document.querySelector(".chat-window");
        const welcomeText = document.querySelector(".welcomeText");
        aiButton.addEventListener("click", () => {
            chatWindow.classList.toggle("hidden");
            welcomeText.classList.toggle("hidden");
            this.hackerMessage.classList.toggle("hidden");
            aiButton.classList.toggle("menu-item");
            homeButton.classList.toggle("menu-item");
        });
    }
}
const chat = new ChatWindow("#chatContainer");
//# sourceMappingURL=chat.js.map