'use client';

import { useActionState } from 'react';
import { createMeeting, type State } from '@/lib/actions';
import { Field, ErrorList, HymnFieldset } from '@/components/MeetingFormFields';

const initialState: State = { message: null, errors: {} };

export default function CreateMeetingForm() {
  const [state, formAction, isPending] = useActionState(createMeeting, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <Field label="Date" id="date" type="date" errors={state.errors?.date} />
      <div>
        <label htmlFor="meetingType" className="block text-sm font-medium mb-1">Meeting Type</label>
        <select id="meetingType" name="meetingType" required aria-describedby="meetingType-error"
          className="w-full rounded-[10px_0_10px_0] border border-stone-300 px-3 py-2">
          <option value="">Select a type</option>
          <option value="regular">Regular</option>
          <option value="testimony">Testimony</option>
          <option value="stake">Stake</option>
          <option value="general">General</option>
        </select>
        <ErrorList id="meetingType-error" errors={state.errors?.meetingType} />
      </div>

      <Field label="Presiding" id="presiding" placeholder="e.g. Bishop Ojukwu" errors={state.errors?.presiding} />
      <Field label="Conducting" id="conducting" placeholder="e.g. Brother Abraham" errors={state.errors?.conducting} />

      <HymnFieldset legend="Opening Hymn" numberId="openingHymnNumber" titleId="openingHymnTitle"
        numberErrors={state.errors?.openingHymnNumber} titleErrors={state.errors?.openingHymnTitle} />
      <Field label="Opening Prayer" id="openingPrayer" placeholder="Name of person saying the opening prayer" errors={state.errors?.openingPrayer} />

      <HymnFieldset legend="Sacrament Hymn" numberId="sacramentHymnNumber" titleId="sacramentHymnTitle"
        numberErrors={state.errors?.sacramentHymnNumber} titleErrors={state.errors?.sacramentHymnTitle} />

      <div className="flex items-center gap-2">
        <input id="stakeBusiness" name="stakeBusiness" type="checkbox" className="h-4 w-4" />
        <label htmlFor="stakeBusiness" className="text-sm">This meeting includes stake business</label>
      </div>

      <HymnFieldset legend="Closing Hymn" numberId="closingHymnNumber" titleId="closingHymnTitle"
        numberErrors={state.errors?.closingHymnNumber} titleErrors={state.errors?.closingHymnTitle} />
      <Field label="Closing Prayer" id="closingPrayer" placeholder="Name of person saying the closing prayer" errors={state.errors?.closingPrayer} />

      <div>
        <label htmlFor="announcements" className="block text-sm font-medium mb-1">
          Announcements (one per line, optional)
        </label>
        <textarea id="announcements" name="announcements" rows={3}
            placeholder="e.g. Ward temple night: Jan 30&#10;Sustaining of new Primary president"
            className="w-full rounded-[10px_0_10px_0] border border-stone-300 px-3 py-2" />
      </div>

      {state.message ? <p className="text-sm text-red-600" role="alert">{state.message}</p> : null}

      <button type="submit" disabled={isPending}
        className="rounded-[8px_0_8px_0] bg-amber-600 text-white px-5 py-2.5 font-semibold hover:bg-amber-700 disabled:opacity-60">
        {isPending ? 'Saving...' : 'Save Meeting'}
      </button>
    </form>
  );
}