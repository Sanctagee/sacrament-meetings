import { neon } from '@neondatabase/serverless';
import type { SacramentMeeting } from './types';

const sql = neon(process.env.DATABASE_URL!);

const ITEMS_PER_PAGE = 5;

interface MeetingRow {
  id: number;
  date: string;
  meeting_type: string;
  presiding: string;
  conducting: string;
  announcements: string[] | null;
  opening_hymn: { number: number; title: string };
  opening_prayer: string;
  ward_business: { description: string }[] | null;
  stake_business: boolean;
  sacrament_hymn: { number: number; title: string };
  speakers: { name: string; topic: string; type: 'speaker' | 'musical-number' }[] | null;
  closing_hymn: { number: number; title: string };
  closing_prayer: string;
}

function mapRowToMeeting(row: MeetingRow): SacramentMeeting {
  return {
    id: row.id,
    date: row.date,
    meetingType: row.meeting_type as SacramentMeeting['meetingType'],
    presiding: row.presiding,
    conducting: row.conducting,
    announcements: row.announcements ?? [],
    openingHymn: row.opening_hymn,
    openingPrayer: row.opening_prayer,
    wardBusiness: row.ward_business ?? [],
    stakeBusiness: row.stake_business,
    sacramentHymn: row.sacrament_hymn,
    speakers: row.speakers ?? [],
    closingHymn: row.closing_hymn,
    closingPrayer: row.closing_prayer,
  };
}

export async function getMeetings(date?: string | null): Promise<SacramentMeeting[]> {
  if (date) {
    const rows = (await sql`SELECT * FROM meetings WHERE date = ${date} ORDER BY date`) as MeetingRow[];
    return rows.map(mapRowToMeeting);
  }
  const rows = (await sql`SELECT * FROM meetings ORDER BY date`) as MeetingRow[];
  return rows.map(mapRowToMeeting);
}

export async function getMeetingById(id: number): Promise<SacramentMeeting | null> {
  const rows = (await sql`SELECT * FROM meetings WHERE id = ${id}`) as MeetingRow[];
  if (rows.length === 0) return null;
  return mapRowToMeeting(rows[0]);
}


export async function fetchFilteredMeetings(query: string, currentPage: number): Promise<SacramentMeeting[]> {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const searchTerm = `%${query}%`;
  const rows = (await sql`
    SELECT * FROM meetings
    WHERE presiding ILIKE ${searchTerm}
       OR conducting ILIKE ${searchTerm}
       OR meeting_type ILIKE ${searchTerm}
       OR speakers::text ILIKE ${searchTerm}
    ORDER BY date DESC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
  `) as MeetingRow[];
  return rows.map(mapRowToMeeting);
}

export async function getMeetingsTotalPages(query: string): Promise<number> {
  const searchTerm = `%${query}%`;
  const rows = (await sql`
    SELECT COUNT(*) FROM meetings
    WHERE presiding ILIKE ${searchTerm}
       OR conducting ILIKE ${searchTerm}
       OR meeting_type ILIKE ${searchTerm}
       OR speakers::text ILIKE ${searchTerm}
  `) as { count: string }[];
  return Math.ceil(Number(rows[0].count) / ITEMS_PER_PAGE);
}