export interface Message {
    path: string;
    sender: string;
    recipient: string;
    message: string;
    timestamp: number;
    status?: 'sending' | 'send' | '取消'
}

export const useMessage = (routePath: string) => useState<Message[]>(`message_${routePath}`, () => [{
    path: '/ad',
    sender: 'Mr.T',
    recipient: '127.0.0.1',
    message: 'DEMO ONE, this is test message.',
    timestamp: 1715398846758
}]);