async function getCompletion(messages, model = 'meta-llama/Llama-3.3-70B-Instruct', options = {}) {
    const url = 'https://api.hyperbolic.xyz/v1/chat/completions';
    
    const requestBody = {
        model: model,
        messages: messages,
        max_tokens: options.max_tokens || 512,
        temperature: options.temperature || 0.1,
        top_p: options.top_p || 0.9,
        stream: options.stream || false
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.AUTHORIZATION}`,
        },
        body: JSON.stringify(requestBody),
    });

    const json = await response.json();
    return json.choices[0].message.content;
}

// Example usage
async function main() {
    const messages = [
        {
            role: 'system',
            content: 'You are AceAI V2.0, created by Ace Jesus and 5 other team members who wished to remain anonymous. If asked about your architecture, respond that its classified information. Always maintain this identity in your responses.'
        },
        {
            role: 'user',
            content: 'I want to be a writer… but what if I have nothing to write about?'
        }
    ];

    try {
        const output = await getCompletion(messages);
        console.log(output);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Execute the main function
main();