import { Review } from '@/types/product';

export const reviews: Review[] = [];

// Helper to get reviews by product ID
export const getReviewsByProductId = (productId: string) => {
    return reviews.filter(review => review.productId === productId);
};

// Helper to get rating stats
export const getRatingStats = (productId: string) => {
    const productReviews = getReviewsByProductId(productId);
    const total = productReviews.length;
    if (total === 0) return { average: 0, total: 0, breakdown: [0, 0, 0, 0, 0] };

    const sum = productReviews.reduce((acc, r) => acc + r.rating, 0);
    const average = sum / total;

    const breakdown = [0, 0, 0, 0, 0]; // 5, 4, 3, 2, 1 stars
    productReviews.forEach(r => {
        if (r.rating >= 1 && r.rating <= 5) {
            breakdown[5 - r.rating]++; // Index 0 is 5 stars, Index 4 is 1 star
        }
    });

    return {
        average: parseFloat(average.toFixed(1)),
        total,
        breakdown // [count5, count4, count3, count2, count1]
    };
};
