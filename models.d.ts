export declare type MessageType = 'chat' | 'error' | 'groupchat' | 'headline' | 'normal';

export declare namespace Message {
    export let chat: MessageType;
    export let error: MessageType;
    export let groupchat: MessageType;
    export let headline: MessageType;
    export let normal: MessageType;
}

export declare class JID {
    static DEFAULT_RESOURCE: string;

    constructor(user: string, domain: string, resource?: string);

    /**
     * Returns a formatted string
     * @returns {string} => jid'@'domain'/'resource
     */
    toString(): string;
}