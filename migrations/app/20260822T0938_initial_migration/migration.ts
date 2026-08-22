#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/eb9b11856ee3085ac5a4919ca88f46ba14cd0641d122808123be54149f29136e/contract';
import endContract from '../../snapshots/eb9b11856ee3085ac5a4919ca88f46ba14cd0641d122808123be54149f29136e/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  checkExpression,
  col,
  fn,
  lit,
  primaryKey,
} from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createTable({
        schema: 'public',
        table: 'app_users',
        columns: [
          col('avatar_url', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('created_at', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz@1' },
          }),
          col('display_name', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('email', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('google_subject', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('last_login_at', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz@1' } }),
          col('updated_at', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'business_invitations',
        columns: [
          col('accepted_at', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz@1' } }),
          col('business_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('created_at', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz@1' },
          }),
          col('email', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('expires_at', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz@1' },
          }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('invited_by_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('role', 'text', {
            notNull: true,
            default: lit('STAFF'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('token_hash', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'business_invitations_role_check_6fc3012b',
            "\"role\" IN ('OWNER', 'MANAGER', 'STAFF')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'business_members',
        columns: [
          col('business_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('created_at', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz@1' },
          }),
          col('role', 'text', {
            notNull: true,
            default: lit('STAFF'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('status', 'text', {
            notNull: true,
            default: lit('ACTIVE'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('user_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
        ],
        constraints: [
          primaryKey(['business_id', 'user_id']),
          checkExpression(
            'business_members_role_check_6fc3012b',
            "\"role\" IN ('OWNER', 'MANAGER', 'STAFF')",
          ),
          checkExpression(
            'business_members_status_check_1527ac15',
            "\"status\" IN ('ACTIVE', 'SUSPENDED')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'businesses',
        columns: [
          col('created_at', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz@1' },
          }),
          col('created_by_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('default_locale', 'text', {
            notNull: true,
            default: lit('RW'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('phone', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('slug', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('timezone', 'text', {
            notNull: true,
            default: lit('Africa/Kigali'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('updated_at', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'businesses_default_locale_check_2af4f63e',
            "\"default_locale\" IN ('RW', 'EN')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'locations',
        columns: [
          col('address', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('business_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('created_at', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz@1' },
          }),
          col('default_worker_count', 'int4', {
            notNull: true,
            default: lit(1),
            codecRef: { codecId: 'pg/int4@1' },
          }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('is_active', 'bool', {
            notNull: true,
            default: lit(true),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('join_code', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('latitude', 'numeric', { codecRef: { codecId: 'pg/numeric@1' } }),
          col('longitude', 'numeric', { codecRef: { codecId: 'pg/numeric@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updated_at', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'notifications',
        columns: [
          col('attempt_count', 'int4', {
            notNull: true,
            default: lit(0),
            codecRef: { codecId: 'pg/int4@1' },
          }),
          col('channel', 'text', {
            notNull: true,
            default: lit('SMS'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('created_at', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz@1' },
          }),
          col('dedupe_key', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('delivered_at', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz@1' } }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('language', 'text', {
            notNull: true,
            default: lit('RW'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('last_error', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('provider_message_id', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('queue_entry_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('recipient', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('sent_at', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz@1' } }),
          col('status', 'text', {
            notNull: true,
            default: lit('PENDING'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('type', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression('notifications_channel_check_51423196', '"channel" IN (\'SMS\')'),
          checkExpression('notifications_language_check_30625e09', "\"language\" IN ('RW', 'EN')"),
          checkExpression(
            'notifications_status_check_3c607dd6',
            "\"status\" IN ('PENDING', 'SENT', 'DELIVERED', 'FAILED')",
          ),
          checkExpression(
            'notifications_type_check_18243d78',
            "\"type\" IN ('QUEUE_JOINED', 'TURN_APPROACHING', 'TURN_READY', 'SIGNIFICANT_DELAY', 'QUEUE_CANCELLED')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'queue_entries',
        columns: [
          col('access_token_hash', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('assigned_user_id', 'uuid', { codecRef: { codecId: 'pg/uuid@1' } }),
          col('cancelled_at', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz@1' } }),
          col('customer_name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('customer_phone', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('estimated_service_at', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz@1' } }),
          col('expected_duration_minutes', 'int4', {
            notNull: true,
            codecRef: { codecId: 'pg/int4@1' },
          }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('joined_at', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz@1' },
          }),
          col('notified_at', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz@1' } }),
          col('queue_session_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('service_finished_at', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz@1' } }),
          col('service_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('service_started_at', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz@1' } }),
          col('status', 'text', {
            notNull: true,
            default: lit('WAITING'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('ticket_number', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'queue_entries_status_check_d67ff98e',
            "\"status\" IN ('WAITING', 'NOTIFIED', 'RETURNING', 'SERVING', 'COMPLETED', 'SKIPPED', 'NO_SHOW', 'CANCELLED')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'queue_events',
        columns: [
          col('created_at', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz@1' },
          }),
          col('event_type', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('metadata', 'jsonb', { codecRef: { codecId: 'pg/jsonb@1' } }),
          col('performed_by_id', 'uuid', { codecRef: { codecId: 'pg/uuid@1' } }),
          col('queue_entry_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'queue_events_event_type_check_35f5b7a3',
            "\"event_type\" IN ('JOINED', 'POSITION_CHANGED', 'ETA_RECALCULATED', 'NOTIFIED', 'MARKED_RETURNING', 'SERVICE_STARTED', 'SERVICE_COMPLETED', 'SKIPPED', 'MARKED_NO_SHOW', 'CANCELLED')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'queue_sessions',
        columns: [
          col('business_date', 'date', { notNull: true, codecRef: { codecId: 'pg/date@1' } }),
          col('closed_at', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz@1' } }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('location_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('next_ticket_number', 'int4', {
            notNull: true,
            default: lit(1),
            codecRef: { codecId: 'pg/int4@1' },
          }),
          col('opened_at', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz@1' },
          }),
          col('opened_by_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('paused_at', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz@1' } }),
          col('status', 'text', {
            notNull: true,
            default: lit('OPEN'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('worker_count', 'int4', {
            notNull: true,
            default: lit(1),
            codecRef: { codecId: 'pg/int4@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'queue_sessions_status_check_a029234f',
            "\"status\" IN ('OPEN', 'PAUSED', 'CLOSED')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'services',
        columns: [
          col('business_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('created_at', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz@1' },
          }),
          col('default_duration_minutes', 'int4', {
            notNull: true,
            codecRef: { codecId: 'pg/int4@1' },
          }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('is_active', 'bool', {
            notNull: true,
            default: lit(true),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('sort_order', 'int4', {
            notNull: true,
            default: lit(0),
            codecRef: { codecId: 'pg/int4@1' },
          }),
          col('updated_at', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.addUnique({
        schema: 'public',
        table: 'app_users',
        constraint: 'app_users_google_subject_key',
        columns: ['google_subject'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'app_users',
        constraint: 'app_users_email_key',
        columns: ['email'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'business_invitations',
        constraint: 'business_invitations_token_hash_key',
        columns: ['token_hash'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'businesses',
        constraint: 'businesses_slug_key',
        columns: ['slug'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'locations',
        constraint: 'locations_join_code_key',
        columns: ['join_code'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'locations',
        constraint: 'locations_business_id_name_key',
        columns: ['business_id', 'name'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'notifications',
        constraint: 'notifications_dedupe_key_key',
        columns: ['dedupe_key'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'queue_entries',
        constraint: 'queue_entries_access_token_hash_key',
        columns: ['access_token_hash'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'queue_entries',
        constraint: 'queue_entries_queue_session_id_ticket_number_key',
        columns: ['queue_session_id', 'ticket_number'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'queue_sessions',
        constraint: 'queue_sessions_location_id_business_date_key',
        columns: ['location_id', 'business_date'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'services',
        constraint: 'services_business_id_name_key',
        columns: ['business_id', 'name'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'business_invitations',
        index: 'business_invitations_business_id_email_idx_42b0a495',
        columns: ['business_id', 'email'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'business_invitations',
        index: 'business_invitations_business_id_idx_23036de8',
        columns: ['business_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'business_invitations',
        index: 'business_invitations_email_expires_at_idx_c3594f37',
        columns: ['email', 'expires_at'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'business_invitations',
        index: 'business_invitations_invited_by_id_idx_80b34397',
        columns: ['invited_by_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'business_members',
        index: 'business_members_business_id_idx_23036de8',
        columns: ['business_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'business_members',
        index: 'business_members_user_id_idx_6c952402',
        columns: ['user_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'business_members',
        index: 'business_members_user_id_status_idx_ad5e5afd',
        columns: ['user_id', 'status'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'businesses',
        index: 'businesses_created_by_id_idx_2b1d9a03',
        columns: ['created_by_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'locations',
        index: 'locations_business_id_idx_23036de8',
        columns: ['business_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'locations',
        index: 'locations_business_id_is_active_idx_86a11d7d',
        columns: ['business_id', 'is_active'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'notifications',
        index: 'notifications_queue_entry_id_idx_89d95cfc',
        columns: ['queue_entry_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'notifications',
        index: 'notifications_queue_entry_id_type_idx_7c4dc8c6',
        columns: ['queue_entry_id', 'type'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'notifications',
        index: 'notifications_status_created_at_idx_1bbe8adf',
        columns: ['status', 'created_at'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'queue_entries',
        index: 'queue_entries_assigned_user_id_idx_46569653',
        columns: ['assigned_user_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'queue_entries',
        index: 'queue_entries_assigned_user_id_status_idx_937722fd',
        columns: ['assigned_user_id', 'status'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'queue_entries',
        index: 'queue_entries_customer_phone_idx_477e30ae',
        columns: ['customer_phone'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'queue_entries',
        index: 'queue_entries_queue_session_id_idx_e5cd364e',
        columns: ['queue_session_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'queue_entries',
        index: 'queue_entries_queue_session_id_status_joined_at_idx_d61d83fb',
        columns: ['queue_session_id', 'status', 'joined_at'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'queue_entries',
        index: 'queue_entries_service_id_idx_cd05e196',
        columns: ['service_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'queue_events',
        index: 'queue_events_performed_by_id_idx_ab51579b',
        columns: ['performed_by_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'queue_events',
        index: 'queue_events_queue_entry_id_created_at_idx_52d9e1e7',
        columns: ['queue_entry_id', 'created_at'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'queue_events',
        index: 'queue_events_queue_entry_id_idx_89d95cfc',
        columns: ['queue_entry_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'queue_sessions',
        index: 'queue_sessions_location_id_idx_6316b129',
        columns: ['location_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'queue_sessions',
        index: 'queue_sessions_location_id_status_idx_cb30d8a6',
        columns: ['location_id', 'status'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'queue_sessions',
        index: 'queue_sessions_opened_by_id_idx_90017434',
        columns: ['opened_by_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'services',
        index: 'services_business_id_idx_23036de8',
        columns: ['business_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'services',
        index: 'services_business_id_is_active_sort_order_idx_2c2a4fd4',
        columns: ['business_id', 'is_active', 'sort_order'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'business_invitations',
        foreignKey: {
          name: 'business_invitations_business_id_fkey',
          columns: ['business_id'],
          references: { schema: 'public', table: 'businesses', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'business_invitations',
        foreignKey: {
          name: 'business_invitations_invited_by_id_fkey',
          columns: ['invited_by_id'],
          references: { schema: 'public', table: 'app_users', columns: ['id'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'business_members',
        foreignKey: {
          name: 'business_members_business_id_fkey',
          columns: ['business_id'],
          references: { schema: 'public', table: 'businesses', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'business_members',
        foreignKey: {
          name: 'business_members_user_id_fkey',
          columns: ['user_id'],
          references: { schema: 'public', table: 'app_users', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'businesses',
        foreignKey: {
          name: 'businesses_created_by_id_fkey',
          columns: ['created_by_id'],
          references: { schema: 'public', table: 'app_users', columns: ['id'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'locations',
        foreignKey: {
          name: 'locations_business_id_fkey',
          columns: ['business_id'],
          references: { schema: 'public', table: 'businesses', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'notifications',
        foreignKey: {
          name: 'notifications_queue_entry_id_fkey',
          columns: ['queue_entry_id'],
          references: { schema: 'public', table: 'queue_entries', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'queue_entries',
        foreignKey: {
          name: 'queue_entries_queue_session_id_fkey',
          columns: ['queue_session_id'],
          references: { schema: 'public', table: 'queue_sessions', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'queue_entries',
        foreignKey: {
          name: 'queue_entries_service_id_fkey',
          columns: ['service_id'],
          references: { schema: 'public', table: 'services', columns: ['id'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'queue_entries',
        foreignKey: {
          name: 'queue_entries_assigned_user_id_fkey',
          columns: ['assigned_user_id'],
          references: { schema: 'public', table: 'app_users', columns: ['id'] },
          onDelete: 'setNull',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'queue_events',
        foreignKey: {
          name: 'queue_events_queue_entry_id_fkey',
          columns: ['queue_entry_id'],
          references: { schema: 'public', table: 'queue_entries', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'queue_events',
        foreignKey: {
          name: 'queue_events_performed_by_id_fkey',
          columns: ['performed_by_id'],
          references: { schema: 'public', table: 'app_users', columns: ['id'] },
          onDelete: 'setNull',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'queue_sessions',
        foreignKey: {
          name: 'queue_sessions_location_id_fkey',
          columns: ['location_id'],
          references: { schema: 'public', table: 'locations', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'queue_sessions',
        foreignKey: {
          name: 'queue_sessions_opened_by_id_fkey',
          columns: ['opened_by_id'],
          references: { schema: 'public', table: 'app_users', columns: ['id'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'services',
        foreignKey: {
          name: 'services_business_id_fkey',
          columns: ['business_id'],
          references: { schema: 'public', table: 'businesses', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
