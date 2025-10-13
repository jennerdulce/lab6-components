export function getBotResponse(message) {
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