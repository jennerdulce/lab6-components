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

        sendBtn.addEventListener('click', () => {
            log("Send button clicked");
            let userMessage = processUserMessage(userInput.value);
            if (userMessage) {
                appendMessageToChat(userMessage, 'user');
                userInput.value = '';
            } else {
                alert("Please enter a valid message.");
            }
        });

        window.addEventListener('DOMContentLoaded', init);
