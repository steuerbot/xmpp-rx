export type MessageType = 'chat' | 'error' | 'groupchat' | 'headline' | 'normal';

export namespace Message {
    export let chat: MessageType = 'chat';
    export let error: MessageType = 'error';
    export let groupchat: MessageType = 'groupchat';
    export let headline: MessageType = 'headline';
    export let normal: MessageType = 'normal';
}