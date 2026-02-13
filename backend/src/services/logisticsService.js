const axios = require('axios');
const LogisticsProvider = require('../models/mongoose/LogisticsProvider');

const STAGING_URL = 'https://capi-qc.fship.in/api';
const PROD_URL = 'https://capi.fship.in/api';

class FShipService {
  async getClient(storeId) {
    const provider = await LogisticsProvider.findOne({ storeId, provider: 'FSHIP', isActive: true });
    if (!provider) {
      throw new Error('FShip logistics provider not configured or inactive for this store');
    }

    const baseUrl = provider.config.isStaging ? STAGING_URL : PROD_URL;
    const signature = provider.apiKey;

    const client = axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'signature': signature
      }
    });

    return client;
  }

  async getAllCouriers(storeId) {
    const client = await this.getClient(storeId);
    const response = await client.get('/getallcourier');
    return response.data;
  }

  async trackOrder(storeId, waybill) {
    const client = await this.getClient(storeId);
    const response = await client.post('/trackinghistory', { waybill });
    return response.data;
  }

  async getShipmentSummary(storeId, waybill) {
    const client = await this.getClient(storeId);
    const response = await client.post('/shipmentsummary', { waybill });
    return response.data;
  }

  async createForwardOrder(storeId, orderData) {
    const client = await this.getClient(storeId);
    const response = await client.post('/createforwardorder', orderData);
    return response.data;
  }

  async cancelOrder(storeId, waybill, reason) {
    const client = await this.getClient(storeId);
    const response = await client.post('/cancelorder', { waybill, reason });
    return response.data;
  }
}

module.exports = new FShipService();
