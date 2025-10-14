/**
 * @fileoverview Chat Web Component with Progressive Enhancement
 * Web component implementation without shadow DOM, progressively enhancing existing HTML
 * @author Jenner Dulce
 * @version 1.0.0
 */

/**
 * SimpleChat Web Component
 * A custom HTML element that progressively enhances an existing chat interface
 * Works with light DOM for better CSS integration and accessibility
 * @extends HTMLElement
 */
class SimpleChat extends HTMLElement {
    /**
     * Creates an instance of SimpleChat
     * Initializes debug settings without shadow DOM for progressive enhancement
     */
    constructor() {
        super();
        /** @type {boolean} Debug flag for console logging */
        this.DEBUG = false;
    }

    /**
     * Called when the element is inserted into the DOM
     * Progressively enhances existing HTML with interactive functionality
     * @returns {void}
     */
    connectedCallback() {
        this.updateSendButtonState();
        this.setupEventListeners();
    }

    /**
     * Logs messages to console when DEBUG is enabled
     * @param {string} msg - The message to log
     * @returns {void}
     */
    log(msg) {
        if (this.DEBUG) console.log(msg);
    }

    /**
     * Processes and validates user input message
     * @param {string} msg - Raw user input message
     * @returns {string|boolean} Processed message if valid, false if invalid
     */
    processUserMessage(msg) {
        this.log("Processing user message...");
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
     * Uses light DOM for better CSS integration
     * @returns {void}
     */
    updateSendButtonState() {
        const userInput = document.getElementById('user-input');
        const sendBtn = document.getElementById('send-btn');

        if (userInput.value.trim() !== '') {
            if (!sendBtn.classList.contains('hasContent')) {
                this.log('added hasContent');
                sendBtn.classList.add('hasContent');
            }
        } else {
            if (sendBtn.classList.contains('hasContent')) {
                this.log('removed hasContent');
                sendBtn.classList.remove('hasContent');
            }
        }
    }

    /**
     * Sets up event listeners for user interactions
     * Progressively enhances existing HTML elements with interactive behavior
     * @returns {void}
     */
    setupEventListeners() {
        const userInput = document.getElementById('user-input');
        const sendBtn = document.getElementById('send-btn');

        sendBtn.addEventListener('click', () => {
            this.log("Send button clicked");
            let userMessage = this.processUserMessage(userInput.value);
            if (userMessage) {
                this.appendMessageToChat(userMessage, 'user');
                userInput.value = '';
                this.appendMessageToChat(userMessage, 'bot');
            } else {
                alert("Please enter a valid message.");
            }
            this.updateSendButtonState(); // Update button state after sending
        });

        // Listen for input changes (typing, pasting, deleting)
        userInput.addEventListener('input', () => this.updateSendButtonState());

        // Handle Enter key press
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendBtn.click();
            }
        });
    }

    /**
     * Appends a new message to the chat container
     * Creates and styles message elements in the light DOM
     * @param {string} message - The message content to display
     * @param {'user'|'bot'} sender - The type of sender (user or bot)
     * @returns {void}
     */
    appendMessageToChat(message, sender) {
        const messageContainer = document.getElementById('message-container');

        this.log("Appending Message to Chatbox")
        let newMessageElement = document.createElement('li');
        if (sender === 'user') {
            newMessageElement.classList.add('user-message');
            newMessageElement.innerHTML = message;
            messageContainer.appendChild(newMessageElement);

        } else {

            newMessageElement.classList.add('bot-output');
            let botResponse = this.getBotResponse(message);
            newMessageElement.innerHTML = botResponse;
            messageContainer.appendChild(newMessageElement);
        }

        // Scroll to the bottom of the chat
        messageContainer.scrollTop = messageContainer.scrollHeight;
    }

    /**
     * Generates a bot response using Eliza-style pattern matching
     * 
     * This method implements a simple pattern matching system similar to the famous ELIZA chatbot.
     * It matches user input against predefined patterns and returns appropriate responses.
     * Includes support for captured groups in patterns (e.g., "I am happy" -> "Why do you think you are happy?").
     * 
     * @param {string} message - The user's input message to generate a response for
     * @returns {string} A contextually appropriate bot response based on pattern matching
     */
    getBotResponse(message) {
        /**
         * Eliza-style Pattern Matching Module
         *
         * This module provides simple pattern matching for chatbot responses.
         * Import this module to use the getBotResponse() function in your chat implementations.
         *
         * Usage:
         *   import { getBotResponse } from './eliza.js';
         *   const response = getBotResponse("Hello there!");
         */

        // Eliza-style response patterns
        const patterns = [
            {
                pattern: /hello|hi|hey|howdy/i,
                responses: [
                    "Hello! How are you doing today?",
                    "Hi there! What's on your mind?",
                    "Hey! How can I help you?",
                    "Howdy! What would you like to talk about?"
                ]
            },
            {
                pattern: /how are you/i,
                responses: [
                    "I'm just a program, but I'm functioning well! How are you?",
                    "I'm doing great! Thanks for asking. How about you?",
                    "I'm here and ready to chat! How are you feeling?"
                ]
            },
            {
                pattern: /help|what can you do/i,
                responses: [
                    "I'm a simple chatbot built with Eliza-style pattern matching. I can respond to your messages based on keywords. Try asking me questions!",
                    "I can have a basic conversation with you. Ask me anything and I'll do my best to respond!",
                    "I use pattern matching to respond to your messages. Try different phrases and see how I react!"
                ]
            },
            {
                pattern: /your name|who are you/i,
                responses: [
                    "I'm a simple chat assistant, built to demonstrate component-based thinking!",
                    "I'm a chatbot created for educational purposes. Nice to meet you!",
                    "You can call me ChatBot. I'm here to demonstrate different web component approaches."
                ]
            },
            {
                pattern: /\b(why|how|what|when|where|who)\b.*\?/i,
                responses: [
                    "That's an interesting question. What do you think?",
                    "I'm not sure I have a good answer for that. Can you tell me more?",
                    "Hmm, that's thought-provoking. What's your perspective on it?",
                    "Good question! What led you to ask about that?"
                ]
            },
            {
                pattern: /sorry|apologize/i,
                responses: [
                    "No need to apologize! Everything's fine.",
                    "It's okay! No worries at all.",
                    "Don't worry about it. We're all good!"
                ]
            },
            {
                pattern: /thank you|thanks/i,
                responses: [
                    "You're welcome! Happy to help!",
                    "No problem at all!",
                    "Glad I could help! Is there anything else you'd like to know?"
                ]
            },
            {
                pattern: /bye|goodbye|see you|farewell/i,
                responses: [
                    "Goodbye! It was nice chatting with you!",
                    "See you later! Have a great day!",
                    "Farewell! Come back anytime!",
                    "Bye! Take care!"
                ]
            },
            {
                pattern: /\b(yes|yeah|yep|sure|okay|ok)\b/i,
                responses: [
                    "Great! What would you like to talk about?",
                    "Awesome! Tell me more.",
                    "Cool! What's next?"
                ]
            },
            {
                pattern: /\b(no|nope|nah)\b/i,
                responses: [
                    "Okay, no problem! What else is on your mind?",
                    "Fair enough. Is there something else you'd like to discuss?",
                    "I understand. What would you like to talk about instead?"
                ]
            },
            {
                pattern: /I am (.*)/i,
                responses: [
                    "How long have you been $1?",
                    "Why do you think you are $1?",
                    "How does being $1 make you feel?"
                ]
            },
            {
                pattern: /I feel (.*)/i,
                responses: [
                    "Why do you feel $1?",
                    "How often do you feel $1?",
                    "What makes you feel $1?"
                ]
            },
            {
                pattern: /I think (.*)/i,
                responses: [
                    "What makes you think $1?",
                    "Why do you believe $1?",
                    "Tell me more about why you think $1."
                ]
            }
        ];

        // Default responses when no pattern matches
        const defaultResponses = [
            "Tell me more about that.",
            "I see. Can you elaborate?",
            "That's interesting. What else?",
            "Go on, I'm listening.",
            "How does that make you feel?",
            "What do you mean by that?",
            "Can you explain that a bit more?"
        ];

        console.log("Getting Bot Response...")
        // Check each pattern
        for (let i = 0; i < patterns.length; i++) {
            const match = message.match(patterns[i].pattern);
            if (match) {
                // Get a random response from the matched pattern
                const responses = patterns[i].responses;
                let response = responses[Math.floor(Math.random() * responses.length)];

                // Replace captured groups (e.g., $1, $2) with matched text
                if (match.length > 1) {
                    for (let j = 1; j < match.length; j++) {
                        response = response.replace('$' + j, match[j]);
                    }
                }

                return response;
            }
        }

        // If no pattern matched, return a default response
        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }
}

/**
 * Register the SimpleChat component as a custom element
 * 
 * This registration makes the <simple-chat> tag available for use in HTML.
 * The component will automatically instantiate and initialize when the tag is encountered.
 * 
 * @see {@link SimpleChat} - The class that implements the custom element behavior
 */
customElements.define('simple-chat', SimpleChat);