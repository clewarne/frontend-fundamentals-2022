export interface Chat {
    nickname: string;
    date: Date;
    type: 'message' | 'join' | 'exit';
    message: string;
}
