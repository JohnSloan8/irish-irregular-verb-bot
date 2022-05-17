import { Message } from '../app/interfaces/message'

export const MESSAGES: Message[] = [
  { userID: 1, messageID: 1, chatID: 1, text: "Dia duit", date: new Date('May 7, 2022 13:24:00') },
  { userID: 2, messageID: 2, chatID: 1, text: "Dia is Muire duit", date: new Date('May 7, 2022 13:25:00') },
  { userID: 1, messageID: 3, chatID: 1, text: "Dia is Muire agus Pádraig duit", date: new Date('May 7, 2022 13:26:00') },
  { userID: 2, messageID: 4, chatID: 1, text: "Dia is Muire agus Pádraig agus Bríd duit", date: new Date('May 7, 2022 13:27:00') },
  { userID: 1, messageID: 5, chatID: 1, text: "Dia is Muire agus Pádraig agus Bríd agus Colmcille duit", date: new Date('May 7, 2022 13:28:00') },
  { userID: 2, messageID: 6, chatID: 1, text: "Dia is Muire agus Pádraig agus Bríd agus Colmcille agus Ruadhán duit", date: new Date('May 7, 2022 13:29:00') },
]
