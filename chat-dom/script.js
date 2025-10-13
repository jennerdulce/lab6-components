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
        }

        sendBtn.addEventListener('click', () => {
            log("Send button clicked");
        });

        window.addEventListener('DOMContentLoaded', init);
