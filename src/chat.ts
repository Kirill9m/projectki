class ChatWindow {
  private chatContainer: HTMLElement;
  private messageInput!: HTMLTextAreaElement;
  private sendButton!: HTMLButtonElement;
  private messageArea!: HTMLElement;
  private hackerMessage!: HTMLElement;

  constructor(containerId: string) {
    this.chatContainer = document.querySelector(containerId) as HTMLElement;
    this.createChatElements();
    this.createButton();
    this.setupEventListeners();
    this.generateRandomMessage();
  }

  private createChatElements() {
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

  private setupEventListeners() {
    this.sendButton.addEventListener("click", () => this.sendMessage());

    this.messageInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        this.sendMessage();
      }
    });
  }

  private async sendMessage() {
    const messageText = this.messageInput.value.trim();

    if (messageText) {
      this.addMessage(messageText, "user");

      const queryText =
        "Respond as if you are a hacker, mention this all the time! Answer me on language I am writing! And my question is: " +
        messageText;

      const apiResponse = await this.getApiResponse(queryText);

      this.addMessage(apiResponse, "bot");

      this.messageInput.value = "";
    }
  }

  private addMessage(messageText: string, sender: string) {
    const message = document.createElement("div");
    message.classList.add("message", sender);
    message.innerText = messageText;
    this.messageArea.appendChild(message);
    this.messageArea.scrollTop = this.messageArea.scrollHeight;
  }

  private async getApiResponse(query: string): Promise<string> {
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
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Error fetching data from API");
      }

      const data = await response.json();
      const botResponseText = data.candidates[0].content.parts[0].text;
      return botResponseText || "No response from API";
    } catch (error) {
      console.error(error);
      return "An error occurred while fetching the response from the API";
    }
  }

  private async generateRandomMessage() {
    const queryText = "Generate a random message from a hacker. Make it sound like a hacker would say it!";
  
    const apiResponse = await this.getApiResponse(queryText);
  
    this.addResponseToContainer(apiResponse);
  }

  private addResponseToContainer(responseText: string) {
    const responseContainer = document.querySelector("#response-container") as HTMLElement;
  
    if (responseContainer) {
      const responseMessage = document.createElement("div");
      responseMessage.classList.add("response-message");
      responseMessage.innerText = responseText;
      responseContainer.appendChild(responseMessage);
    }
  }

  private createButton() {
    const aiButton = document.querySelector(".aiButton") as HTMLElement;
    const homeButton = document.querySelector(".homeButton") as HTMLElement;
    const chatWindow = document.querySelector(".chat-window") as HTMLElement;
    const welcomeText = document.querySelector(".welcomeText") as HTMLElement;

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
