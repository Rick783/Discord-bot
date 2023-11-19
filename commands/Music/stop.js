import { SlashCommandBuilder } from 'discord.js'
import { waitForIdleAndPlayNextSong } from '../../playerManager.js'

export const data = new SlashCommandBuilder()
    .setName('stop')
    .setDescription('stop play song')
export async function execute(interaction){
    waitForIdleAndPlayNextSong(interaction)
    }