const { prisma } = require('../config/database');
const { generateOrderNumber } = require('../utils/helpers');
const { ORDER_STATUS, PAYMENT_STATUS, FULFILLMENT_STATUS } = require('../config/constants');

const createOrder = async (req, res, next) => {
  try {
    const { items, ...orderData } = req.body;
    const order = await prisma.order.create({
      data: {
        ...orderData,
        orderNumber: generateOrderNumber(),
        items: {
          create: items?.map((item) => ({
            productId: item.productId,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            variantInfo: item.variantInfo
          }))
        }
      },
      include: { items: true }
    });
    res.status(201).json({ order });
  } catch (err) {
    next(err);
  }
};

const listOrders = async (req, res, next) => {
  try {
    const orders = await prisma.order.findMany({
      where: { storeId: req.params.storeId },
      orderBy: { createdAt: 'desc' }
    });
    res.json({ orders });
  } catch (err) {
    next(err);
  }
};

const getOrder = async (req, res, next) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: req.params.id },
      include: { items: true }
    });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json({ order });
  } catch (err) {
    next(err);
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!Object.values(ORDER_STATUS).includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    const order = await prisma.order.update({
      where: { id: req.params.id },
      data: { status }
    });
    res.json({ order });
  } catch (err) {
    next(err);
  }
};

const updateFulfillment = async (req, res, next) => {
  try {
    const { fulfillmentStatus } = req.body;
    if (!Object.values(FULFILLMENT_STATUS).includes(fulfillmentStatus)) {
      return res.status(400).json({ message: 'Invalid fulfillment status' });
    }
    const order = await prisma.order.update({
      where: { id: req.params.id },
      data: { fulfillmentStatus }
    });
    res.json({ order });
  } catch (err) {
    next(err);
  }
};

const cancelOrder = async (req, res, next) => {
  try {
    const order = await prisma.order.update({
      where: { id: req.params.id },
      data: { status: ORDER_STATUS.CANCELLED, paymentStatus: PAYMENT_STATUS.REFUNDED }
    });
    res.json({ order });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createOrder,
  listOrders,
  getOrder,
  updateStatus,
  updateFulfillment,
  cancelOrder
};
