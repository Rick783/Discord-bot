import axios from 'axios';
import axiosRetry from 'axios-retry';
import dotenv from 'dotenv';
import Bottleneck from 'bottleneck';

dotenv.config();

// 配置 axios 实例
const axiosInstance = axios.create({
    baseURL: 'https://api.openai.com/v1',
    headers: {
        'Authorization': `Bearer ${process.env.chatgptapi}`,
        'Content-Type': 'application/json'
    },
    timeout: 10000 // 增加超时设置为10秒
});

// 设置 axios 重试策略
axiosRetry(axiosInstance, {
    retries: 3, // 尝试重试3次
    retryDelay: axiosRetry.exponentialDelay, // 使用指数退避策略
    retryCondition: (error) => error.response && error.response.status === 429 // 只在429错误时重试
});

// 速率限制器配置
const limiter = new Bottleneck({
    minTime: 20000, // 每20秒最多一次请求，以符合3 RPM的限制
    maxConcurrent: 1 // 同时只能有一个活动请求
});

// 定义异步函数与 ChatGPT 交流
const chatWithGPT = async (message) => {
    return limiter.schedule(async () => {
        try {
            const response = await axiosInstance.post('/chat/completions', {
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: message }]
            });
            console.log(response.data);
            return response.data.choices[0].message.content;
        } catch (error) {
            console.error('Failed to fetch from OpenAI:', error);
            return 'Sorry, there was an error processing your request.';
        }
    });
};

export { chatWithGPT };
