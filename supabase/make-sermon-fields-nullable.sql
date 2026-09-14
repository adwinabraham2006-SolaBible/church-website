-- Make speaker, scripture, and description optional on the sermons table
-- so bulk imports and manual entry can omit them.
-- Safe to run on existing data — only removes the NOT NULL constraint.

ALTER TABLE sermons ALTER COLUMN speaker      DROP NOT NULL;
ALTER TABLE sermons ALTER COLUMN scripture    DROP NOT NULL;
ALTER TABLE sermons ALTER COLUMN description  DROP NOT NULL;
