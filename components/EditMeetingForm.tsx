'use client';

import { useActionState } from 'react';
import { updateMeeting, deleteMeeting, type State } from '@/lib/actions';
import type { SacramentMeeting } from '@/lib/types';
import { Field, ErrorList, HymnFieldset } from '@/components/MeetingFormFields';

const initialState: State = { message: null, errors: {} };

export default function EditMeetingForm({ meeting, id }: { meeting: SacramentMeeting; id: number }) {
  const updateMeetingWithId = updateMeeting.bind(null, id);
  const [state, formAction, isPending] = useActionState(updateMeetingWithId, initialState);

  return (
    <div className="space-y-8">
      <form action={formAction} className="space-y-4">
        <div>
          <label htmlFor="date" className="block text-sm font-medium mb-1">Date</label>
          <input id="date" name="date" type="date" required defaultValue={meeting.date}
            aria-describedby="date-error" className="w-full rounded-[10px_0_10px_0] border border-stone-300 px-3 py-2" />
          <ErrorList id="date-error" errors={state.errors?.date} />
        </div>

        <div>
          <label htmlFor="meetingType" className="block text-sm font-medium mb-1">Meeting Type</label>
          <select id="meetingType" name="meetingType" required defaultValue={meeting.meetingType}
            aria-describedby="meetingType-error" className="w-full rounded-[10px_0_10px_0] border border-stone-300 px-3 py-2">
            <option value="regular">Regular</option>
            <option value="testimony">Testimony</option>
            <option value="stake">Stake</option>
            <option value="general">General</option>
          </select>
          <ErrorList id="meetingType-error" errors={state.errors?.meetingType} />
        </div>

        <Field label="Presiding" id="presiding" defaultValue={meeting.presiding} placeholder="e.g. Bishop Ojukwu" errors={state.errors?.presiding} />
        <Field label="Conducting" id="conducting" defaultValue={meeting.conducting} placeholder="e.g. Brother Abraham" errors={state.errors?.conducting} />

        <HymnFieldset legend="Opening Hymn" numberId="openingHymnNumber" titleId="openingHymnTitle"
          defaultNumber={meeting.openingHymn.number} defaultTitle={meeting.openingHymn.title}
          numberErrors={state.errors?.openingHymnNumber} titleErrors={state.errors?.openingHymnTitle} />
        <Field label="Opening Prayer" id="openingPrayer" defaultValue={meeting.openingPrayer} placeholder="Name of person saying the opening prayer" errors={state.errors?.openingPrayer} />

        <HymnFieldset legend="Sacrament Hymn" numberId="sacramentHymnNumber" titleId="sacramentHymnTitle"
          defaultNumber={meeting.sacramentHymn.number} defaultTitle={meeting.sacramentHymn.title}
          numberErrors={state.errors?.sacramentHymnNumber} titleErrors={state.errors?.sacramentHymnTitle} />

        <div className="flex items-center gap-2">
          <input id="stakeBusiness" name="stakeBusiness" type="checkbox" defaultChecked={meeting.stakeBusiness} className="h-4 w-4" />
          <label htmlFor="stakeBusiness" className="text-sm">This meeting includes stake business</label>
        </div>

        <HymnFieldset legend="Closing Hymn" numberId="closingHymnNumber" titleId="closingHymnTitle"
          defaultNumber={meeting.closingHymn.number} defaultTitle={meeting.closingHymn.title}
          numberErrors={state.errors?.closingHymnNumber} titleErrors={state.errors?.closingHymnTitle} />
        <Field label="Closing Prayer" id="closingPrayer" defaultValue={meeting.closingPrayer} placeholder="Name of person saying the closing prayer" errors={state.errors?.closingPrayer} />

        <div>
          <label htmlFor="announcements" className="block text-sm font-medium mb-1">Announcements (one per line)</label>
          <textarea id="announcements" name="announcements" rows={3}
            defaultValue={meeting.announcements?.join('\n')}
            placeholder="e.g. Ward temple night: Jan 30&#10;Sustaining of new Primary president"
            className="w-full rounded-[10px_0_10px_0] border border-stone-300 px-3 py-2" />
        </div>

        {state.message ? <p className="text-sm text-red-600" role="alert">{state.message}</p> : null}

        <button type="submit" disabled={isPending}
          className="rounded-[8px_0_8px_0] bg-amber-600 text-white px-5 py-2.5 font-semibold hover:bg-amber-700 disabled:opacity-60">
          {isPending ? 'Saving...' : 'Save Changes'}
        </button>
      </form>

      <form action={deleteMeeting.bind(null, id)}>
        <button type="submit"
          className="rounded-[8px_0_8px_0] border border-red-300 text-red-700 px-5 py-2.5 font-semibold hover:bg-red-50">
          Delete Meeting
        </button>
      </form>
    </div>
  );
}