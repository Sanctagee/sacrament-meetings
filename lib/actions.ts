'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
  createMeeting as dbCreateMeeting,
  updateMeeting as dbUpdateMeeting,
  deleteMeeting as dbDeleteMeeting,
} from './meetings-db';

const MeetingFormSchema = z.object({
  date: z.string().min(1, 'Date is required.'),
  meetingType: z.enum(['testimony', 'regular', 'stake', 'general'], { message: 'Select a meeting type.' }),
  presiding: z.string().min(2, 'Presiding name is required.'),
  conducting: z.string().min(2, 'Conducting name is required.'),
  openingHymnNumber: z.coerce.number().int().min(1, 'Enter a valid hymn number.'),
  openingHymnTitle: z.string().min(1, 'Hymn title is required.'),
  openingPrayer: z.string().min(2, 'Opening prayer name is required.'),
  sacramentHymnNumber: z.coerce.number().int().min(1, 'Enter a valid hymn number.'),
  sacramentHymnTitle: z.string().min(1, 'Hymn title is required.'),
  closingHymnNumber: z.coerce.number().int().min(1, 'Enter a valid hymn number.'),
  closingHymnTitle: z.string().min(1, 'Hymn title is required.'),
  closingPrayer: z.string().min(2, 'Closing prayer name is required.'),
  announcements: z.string().optional(),
});

export type State = {
  errors?: Record<string, string[]>;
  message?: string | null;
};

function parseFormData(formData: FormData) {
  return MeetingFormSchema.safeParse({
    date: formData.get('date'),
    meetingType: formData.get('meetingType'),
    presiding: formData.get('presiding'),
    conducting: formData.get('conducting'),
    openingHymnNumber: formData.get('openingHymnNumber'),
    openingHymnTitle: formData.get('openingHymnTitle'),
    openingPrayer: formData.get('openingPrayer'),
    sacramentHymnNumber: formData.get('sacramentHymnNumber'),
    sacramentHymnTitle: formData.get('sacramentHymnTitle'),
    closingHymnNumber: formData.get('closingHymnNumber'),
    closingHymnTitle: formData.get('closingHymnTitle'),
    closingPrayer: formData.get('closingPrayer'),
    announcements: formData.get('announcements'),
  });
}

function toDbShape(data: z.infer<typeof MeetingFormSchema>, stakeBusiness: boolean) {
  return {
    date: data.date,
    meetingType: data.meetingType,
    presiding: data.presiding,
    conducting: data.conducting,
    announcements: data.announcements
      ? data.announcements.split('\n').map((a) => a.trim()).filter(Boolean)
      : [],
    openingHymn: { number: data.openingHymnNumber, title: data.openingHymnTitle },
    openingPrayer: data.openingPrayer,
    stakeBusiness,
    sacramentHymn: { number: data.sacramentHymnNumber, title: data.sacramentHymnTitle },
    closingHymn: { number: data.closingHymnNumber, title: data.closingHymnTitle },
    closingPrayer: data.closingPrayer,
  };
}

export async function createMeeting(prevState: State, formData: FormData): Promise<State> {
  const validated = parseFormData(formData);
  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors as Record<string, string[]>,
      message: 'Missing or invalid fields. Failed to create meeting.',
    };
  }
  const stakeBusiness = formData.get('stakeBusiness') === 'on';

  try {
    await dbCreateMeeting(toDbShape(validated.data, stakeBusiness));
  } catch (error) {
    console.error('Error creating meeting:', error);
    return { message: 'Database error: failed to create meeting. Please try again.' };
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}

export async function updateMeeting(id: number, prevState: State, formData: FormData): Promise<State> {
  const validated = parseFormData(formData);
  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors as Record<string, string[]>,
      message: 'Missing or invalid fields. Failed to update meeting.',
    };
  }
  const stakeBusiness = formData.get('stakeBusiness') === 'on';

  try {
    const updated = await dbUpdateMeeting(id, toDbShape(validated.data, stakeBusiness));
    if (!updated) {
      return { message: 'Meeting not found. It may have already been deleted.' };
    }
  } catch (error) {
    console.error('Error updating meeting:', error);
    return { message: 'Database error: failed to update meeting. Please try again.' };
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}

export async function deleteMeeting(id: number) {
  try {
    await dbDeleteMeeting(id);
  } catch (error) {
    console.error('Error deleting meeting:', error);
    throw new Error('Failed to delete meeting. Please try again later.');
  }
  revalidatePath('/meetings');
  redirect('/meetings');
}