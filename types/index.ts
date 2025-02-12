export interface DashboardStats {
  order_status_count: {
    pending: number;
    accepted: number;
    transit: number;
    completed: number;
    cancelled: number;
    total: number;
  };
  user_count: number;
  android_user_count: number;
  ios_user_count: number;
  partner_count: number;
  android_partner_count: number;
  ios_partner_count: number;
  centers_count: number;
  hubs_count: number;
  sweepers_count: number;
  total_revenue: number;
  paystack_balance: number;
  termii_balance: number;
  users_wallet_balance: number;
  partners_wallet_balance: number;
  hubs_wallet_balance: number;
  total_payments: number;
}

export interface OrderCountProps {
  completed: number;
  pending: number;
  accepted: number;
  transit: number;
  cancelled: number;
  total: number;
}
