-- 1. Customers table (pre-seeded with Alice & Bob)
CREATE TABLE IF NOT EXISTS customers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  stripe_customer_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
-- Seed test customers
INSERT INTO customers (name, email) VALUES 
  ('Alice', 'alice@example.com'),
  ('Bob', 'bob@example.com')
ON CONFLICT (email) DO NOTHING;
-- 2. Payments table (one-off purchases)
CREATE TABLE IF NOT EXISTS payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  stripe_session_id TEXT UNIQUE NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  product_name TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  currency TEXT DEFAULT 'usd',
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
-- 3. Subscriptions table (full lifecycle)
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  stripe_subscription_id TEXT UNIQUE NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  plan_name TEXT NOT NULL,
  interval TEXT DEFAULT 'month',
  amount NUMERIC NOT NULL,
  currency TEXT DEFAULT 'usd',
  status TEXT DEFAULT 'active',
  current_period_end TIMESTAMPTZ,
  cancel_at TIMESTAMPTZ,
  canceled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
-- 4. Processed events table (webhook deduplication)
CREATE TABLE IF NOT EXISTS processed_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  stripe_event_id TEXT UNIQUE NOT NULL,
  event_type TEXT NOT NULL,
  processed_at TIMESTAMPTZ DEFAULT NOW()
);
-- Enable RLS on all tables
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE processed_events ENABLE ROW LEVEL SECURITY;
-- Allow all operations (interview project — in production, restrict by role)
CREATE POLICY "Allow all for customers" ON customers FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for payments" ON payments FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for subscriptions" ON subscriptions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for processed_events" ON processed_events FOR ALL USING (true) WITH CHECK (true);
