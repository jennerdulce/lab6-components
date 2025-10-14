/**
 * @fileoverview Chat application with DOM manipulation
 * Interactive chat interface using vanilla JavaScript and DOM manipulation
 * @author Jenner Dulce
 * @version 1.0.0
 */

import { getBotResponse } from '../Eliza.js';

/** @constant {boolean} DEBUG - Flag to enable/disable debug logging */
const DEBUG = true;

/** @type {HTMLElement} Message container element */
let messageContainer = document.getElementById('message-container');

/** @type {HTMLTextAreaElement} User input textarea element */
let userInput = document.getElementById('user-input');

/** @type {HTMLButtonElement} Send button element */
let sendBtn = document.getElementById('send-btn');

/**
 * Logs messages to console when DEBUG is enabled
 * @param {string} msg - The message to log
 * @returns {void}
 */
function log(msg) {
    if (DEBUG) console.log(msg);
}

/**
 * Appends a new message to the chat container
 * @param {string} message - The message content to display
 * @param {'user'|'bot'} sender - The type of sender (user or bot)
 * @returns {void}
 */
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

/**
 * Processes and validates user input message
 * @param {string} msg - Raw user input message
 * @returns {string|boolean} Processed message if valid, false if invalid
 */
function processUserMessage(msg) {
    log("Processing user message...");
    let processedUserMessage = msg.trim();

    if (processedUserMessage !== "") {
        return processedUserMessage;

    } else {
        return false;
    }
}

/**
 * Updates the send button's visual state based on input content
 * Adds 'hasContent' class when input has text, removes when empty
 * @returns {void}
 */
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

/**
 * Initializes the chat application
 * Sets up event listeners and initial state
 * @returns {void}
 */
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

/**
 * Event listener for DOM content loaded
 * Initializes the application when the DOM is fully parsed
 */
window.addEventListener('DOMContentLoaded', init);
