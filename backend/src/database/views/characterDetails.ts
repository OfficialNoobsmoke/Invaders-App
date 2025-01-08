import { sql } from 'drizzle-orm';
import { getDatabase } from '../database';

export const createCharacterDetailsView = async () => {
  const db = await getDatabase();

  await db.execute(
    sql`
      CREATE OR REPLACE VIEW character_details AS
      SELECT
        c.id AS id,
        c.name AS name,
        c.faction AS faction,
        c.class AS class,
        c.owner_id AS owner_id,
        c.realm_server_id AS realm_server_id,
        c.created_at AS created_at,
        cs.id AS specialization_id,
        cs.name AS specialization_name,
        cs.gear_score AS specialization_gear_score,
        cpi.instance_id AS characters_preferred_instances,
        csi.instance_id AS characters_saved_instances
      FROM
        characters c
      LEFT JOIN character_specializations cs
        ON c.id = cs.character_id
      LEFT JOIN characters_preferred_instances cpi
        ON c.id = cpi.character_id
      LEFT JOIN characters_saved_instances csi
        ON c.id = csi.character_id;    `
  );
};
