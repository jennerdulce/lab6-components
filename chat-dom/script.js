import { getBotResponse } from '../Eliza.js';
const DEBUG = true;
let messageContainer = document.getElementById('message-container');
let userInput = document.getElementById('user-input');
let sendBtn = document.getElementById('send-btn');

function log(msg) {
    if (DEBUG) console.log(msg);
}

function appendMessageToChat(message, sender) {
    log("Appending Message to Chatbox")
    let newMessageElement = document.createElement('li');
    if (sender === 'user') {
        newMessageElement.classList.add('user-message');
        newMessageElement.innerHTML = message;
        messageContainer.appendChild(newMessageElement);
    } else {
        newMessageElement.classList.add('bot-output');
        let botResponse = getBotResponse(message);
        newMessageElement.innerHTML = botResponse;
        messageContainer.appendChild(newMessageElement);
    }

    // Scroll to the bottom of the chat
    messageContainer.scrollTop = messageContainer.scrollHeight;
}

function processUserMessage(msg) {
    log("Processing user message...");
    let processedUserMessage = msg.trim();

    if (processedUserMessage !== "") {
        return processedUserMessage;

    } else {
        return false;
    }
}

// Function to check input and update button state
function updateSendButtonState() {
    if (userInput.value.trim() !== '') {
        if (!sendBtn.classList.contains('hasContent')) {
            log('added hasContent');
            sendBtn.classList.add('hasContent');
        }
    } else {
        if (sendBtn.classList.contains('hasContent')) {
            log('removed hasContent');
            sendBtn.classList.remove('hasContent');
        }
    }
}

function init() {
    log("Loading app...");
    updateSendButtonState();

    sendBtn.addEventListener('click', () => {
        log("Send button clicked");
        let userMessage = processUserMessage(userInput.value);
        if (userMessage) {
            appendMessageToChat(userMessage, 'user');
            userInput.value = '';
            appendMessageToChat(userMessage, 'bot');
        } else {
            alert("Please enter a valid message.");
        }

    });

    // Listen for input changes (typing, pasting, deleting)
    userInput.addEventListener('input', updateSendButtonState);

    // Also check on initial load
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendBtn.click();
        }
    });
}

window.addEventListener('DOMContentLoaded', init);
