create table if not exists votes (
  property_id text not null,
  visitor_id text not null,
  vote text not null check (vote in ('up', 'down')),
  created_at timestamptz not null default now(),
  primary key (property_id, visitor_id)
);

create table if not exists comments (
  id bigserial primary key,
  property_id text not null,
  name text,
  message text not null,
  created_at timestamptz not null default now()
);

create index if not exists comments_property_id_created_at_idx
  on comments (property_id, created_at desc);
