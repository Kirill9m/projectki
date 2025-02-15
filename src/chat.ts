class ChatWindow {
    constructor(containerId: string) {
        this.createChatElements(containerId);
    }

    private createChatElements(containerId: string) {
        const chatContainer = document.getElementById(containerId) as HTMLElement;
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

    private setupEventListeners(messageInput: HTMLTextAreaElement, sendButton: HTMLButtonElement, messageArea: HTMLElement) {
        sendButton.addEventListener('click', () => this.sendMessage(messageInput, messageArea));

        messageInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                this.sendMessage(messageInput, messageArea);
            }
        });
    }

    private async sendMessage(messageInput: HTMLTextAreaElement, messageArea: HTMLElement) {
        const messageText = messageInput.value.trim();

        if (messageText) {
            const queryText = "Respond as if you are a hacker, mention this all the time! Answer me on language I am writing! And my question is: " + messageText;

            const apiResponse = await this.getApiResponse(queryText);

            this.addMessage(apiResponse, 'bot', messageArea);
            messageInput.value = '';
        }
    }

    private addMessage(messageText: string, sender: string, messageArea: HTMLElement) {
        const message = document.createElement('div');
        message.classList.add('message', sender);
        message.innerText = messageText;
        messageArea.appendChild(message);
        messageArea.scrollTop = messageArea.scrollHeight;
    }

    private async getApiResponse(query: string): Promise<string> {
        const apiKey = 'AIzaSyD3N_MxeyDTg1ZoDrKwlDKK8quqWSD9Drc';
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

        const requestBody = {
            contents: [{
                parts: [{ text: query }]
            }]
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error('Error fetching data from API');
            }

            const data = await response.json();
            const botResponseText = data.candidates[0].content.parts[0].text;
            return botResponseText || 'No response from API';
        } catch (error) {
            console.error(error);
            return 'An error occurred while fetching the response from the API';
        }
    }
}

const chat = new ChatWindow('chatContainer');
