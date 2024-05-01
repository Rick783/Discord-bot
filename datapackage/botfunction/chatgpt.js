import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const apiKey = process.env.chatgptapi

const chatWithGPT = async (message) => {
    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: message }]
        }, {
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });

        return response.data.choices[0].message.content
    } catch (error) {
        console.error('Error calling OpenAI:', error)
        return 'Sorry, there was an error processing your request.'
    }
};

export { chatWithGPT };
