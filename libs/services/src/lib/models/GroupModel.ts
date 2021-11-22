import { MessageModel } from './MessageModels';

export class GroupModel {
    imgSrc = '';
    title = '';
    numberOfNotSeenMessages = 0;
    latestMessage: MessageModel | undefined;
    members: string[] = [];
    creationDate: Date | undefined;
}
