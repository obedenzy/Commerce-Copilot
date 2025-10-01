
export type ChatMessage = {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: number;
    product_data?: any;
    sales_data?: any;
};

export type Feedback = {
    id: string;
    user_id: string;
    chat_message_id: string;
    rating: 1 | -1;
    comment: string;
};

export type User = {
    id: string;
    email: string;
};
