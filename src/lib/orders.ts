import { v4 as uuidv4 } from 'uuid';

interface OrderItem {
  photoUrl?: string;
  features: string;
  clothingChoice: 'upload' | 'describe';
  clothingPhotoUrl?: string;
  clothingDescription?: string;
  additionalNotes?: string;
}

interface Order {
  id: string;
  paymentIntentId?: string;
  option: number;
  quantity: number;
  unitPrice: number;
  total: number;
  shipping: {
    fullName: string;
    phone: string;
    email: string;
    country: string;
    address: string;
    city: string;
    postalCode: string;
    courierNote?: string;
  };
  customizations: OrderItem[];
  status: 'pending' | 'paid' | 'fulfilled';
  createdAt: string;
}

const ORDERS_FILE = '.cache/orders.json';

function loadOrders(): Order[] {
  try {
    const fs = require('fs');
    if (fs.existsSync(ORDERS_FILE)) {
      const data = fs.readFileSync(ORDERS_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Failed to load orders:', e);
  }
  return [];
}

function saveOrders(orders: Order[]) {
  const fs = require('fs');
  const dir = '.cache';
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
}

export async function createOrder(data: {
  option: number;
  quantity: number;
  unitPrice: number;
  total: number;
  shipping: Order['shipping'];
  customizations: OrderItem[];
}): Promise<Order> {
  const orders = loadOrders();
  const order: Order = {
    id: uuidv4(),
    option: data.option,
    quantity: data.quantity,
    unitPrice: data.unitPrice,
    total: data.total,
    shipping: data.shipping,
    customizations: data.customizations,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  orders.push(order);
  saveOrders(orders);
  return order;
}

export function getOrderById(id: string): Order | undefined {
  const orders = loadOrders();
  return orders.find((o) => o.id === id);
}

export function updateOrderPayment(id: string, paymentIntentId: string): Order | undefined {
  const orders = loadOrders();
  const order = orders.find((o) => o.id === id);
  if (order) {
    order.paymentIntentId = paymentIntentId;
    order.status = 'paid';
    saveOrders(orders);
  }
  return order;
}

export function getAllOrders(): Order[] {
  return loadOrders();
}
