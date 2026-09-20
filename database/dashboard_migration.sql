-- Dashboard CMS extension for the existing Neon/PostgreSQL database.
-- The application also runs CREATE TABLE IF NOT EXISTS automatically.
CREATE TABLE IF NOT EXISTS portfolio_content (
  id UUID PRIMARY KEY,
  section TEXT NOT NULL,
  source_key TEXT NOT NULL,
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  sort_order INTEGER NOT NULL DEFAULT 0,
  visible BOOLEAN NOT NULL DEFAULT TRUE,
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  status TEXT NOT NULL DEFAULT 'published',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(section, source_key)
);

CREATE INDEX IF NOT EXISTS idx_portfolio_content_section_order
  ON portfolio_content(section, sort_order, created_at);
CREATE INDEX IF NOT EXISTS idx_portfolio_content_visible
  ON portfolio_content(section, visible);

CREATE TABLE IF NOT EXISTS admin_otp_challenges (
  id UUID PRIMARY KEY,
  email TEXT NOT NULL,
  otp_hash TEXT NOT NULL,
  request_ip TEXT NOT NULL DEFAULT '',
  attempts INTEGER NOT NULL DEFAULT 0,
  expires_at TIMESTAMPTZ NOT NULL,
  consumed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_admin_otp_email_created ON admin_otp_challenges(email, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_admin_otp_ip_created ON admin_otp_challenges(request_ip, created_at DESC);


CREATE TABLE IF NOT EXISTS portfolio_content_migrations (
  section TEXT PRIMARY KEY,
  migrated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  migrated_count INTEGER NOT NULL DEFAULT 0
);


CREATE TABLE IF NOT EXISTS visitor_welcome_emails (
  email TEXT PRIMARY KEY,
  consented_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  sent_at TIMESTAMPTZ
);
