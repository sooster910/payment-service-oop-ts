import PaymentService from './services/PaymentService';

const paymentService = new PaymentService();
const payment = paymentService.prepare();
console.log('payment service', payment);
