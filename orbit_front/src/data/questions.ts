import { Question } from '@/types/product';

export const questions: Question[] = [];

export const getQuestionsByProductId = (productId: string) => {
    return questions.filter(q => q.productId === productId);
};
