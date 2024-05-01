import { chatWithGPT } from '../../datapackage/botfunction/chatgpt.js';

// 定義 slash 指令的資料
export const data = new SlashCommandBuilder()
    .setName('chatwithgpt')
    .addStringOption(option => 
        option.setName('message')
        .setDescription('輸入要與 GPT-3.5 對話的訊息')
        .setRequired(true))
    .setDescription('與 GPT-3.5 對話')


// 定義執行 slash 指令的函數
export async function execute(interaction) {
    const message = interaction.options.getString('message');
    const reply = await chatWithGPT(message);
    await interaction.reply(reply);
}