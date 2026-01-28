const { prisma } = require('../config/database');

const getStoreAnalytics = async (storeId) => {
  const [orders, revenueAgg, topProducts] = await Promise.all([
    prisma.order.count({ where: { storeId } }),
    prisma.order.aggregate({
      _sum: { total: true },
      _avg: { total: true },
      where: { storeId }
    }),
    prisma.orderItem.groupBy({
      by: ['productId'],
      _sum: { quantity: true },
      orderBy: { _sum: { quantity: 'desc' } },
      take: 5,
      where: { order: { storeId } }
    })
  ]);

  return {
    orderCount: orders,
    totalRevenue: revenueAgg._sum.total || 0,
    averageOrderValue: revenueAgg._avg.total || 0,
    topProducts
  };
};

module.exports = { getStoreAnalytics };
