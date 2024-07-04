import { ServerRespond } from './DataStreamer';

export interface Row {
  price_abc: 'float',
  price_def: 'float',
  ratio: 'float',
  upper_bound: 'float',
  lower_bound: 'float',
  trigger_alert: 'float',
  timestamp: Date,
}


export class DataManipulator {
  static generateRow(serverRespond: any): Row {
    const priceABC = (serverRespond[0].top_ask.price + serverRespond[0].top_bid.price) / 2;
    const priceDEF = (serverRespond[1].top_ask.price + serverRespond[1].top_bid.price) / 2;
    const ratio = priceABC / priceDEF;
    const upperBound = 1.1;
    const lowerBound = 0.99;
    const triggerAlert = (ratio > upperBound || ratio < lowerBound) ? ratio : undefined;

    return {
      price_abc: priceABC,
      price_def: priceDEF,
      ratio: ratio,
      upper_bound: upperBound,
      lower_bound: lowerBound,
      trigger_alert: triggerAlert,
      timestamp: new Date(serverRespond[0].timestamp)
    };
  }
}
