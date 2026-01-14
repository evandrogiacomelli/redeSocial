CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY,
  user_name VARCHAR(20) NOT NULL,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  birth DATE NOT NULL,
  country CHAR(2) NOT NULL,
  state CHAR(2) NOT NULL,
  city VARCHAR(80) NOT NULL,
  relationship VARCHAR(10) NOT NULL CHECK (relationship IN ('SINGLE','DATING','MARRIED','DIVORCED','WIDOWED')),
  bio VARCHAR(280) NOT NULL,
  password_hash TEXT NOT NULL,
  visibility VARCHAR(10) NOT NULL CHECK (visibility IN ('PUBLIC','PRIVATE')),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS users_email_unique ON users (email);
CREATE UNIQUE INDEX IF NOT EXISTS users_user_name_unique ON users (user_name);
