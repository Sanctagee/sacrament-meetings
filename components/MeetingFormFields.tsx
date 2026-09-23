export function Field({ label, id, type = 'text', defaultValue, placeholder, errors }: {
  label: string; id: string; type?: string; defaultValue?: string | number; placeholder?: string; errors?: string[];
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-1">{label}</label>
      <input id={id} name={id} type={type} required defaultValue={defaultValue} placeholder={placeholder}
        aria-describedby={`${id}-error`}
        className="w-full rounded-[10px_0_10px_0] border border-stone-300 px-3 py-2" />
      <ErrorList id={`${id}-error`} errors={errors} />
    </div>
  );
}

export function ErrorList({ id, errors }: { id: string; errors?: string[] }) {
  return (
    <div id={id} aria-live="polite" aria-atomic="true">
      {errors?.map((e) => <p key={e} className="text-sm text-red-600 mt-1">{e}</p>)}
    </div>
  );
}

export function HymnFieldset({ legend, numberId, titleId, defaultNumber, defaultTitle, numberErrors, titleErrors }: {
  legend: string; numberId: string; titleId: string;
  defaultNumber?: number; defaultTitle?: string;
  numberErrors?: string[]; titleErrors?: string[];
}) {
  return (
    <fieldset className="border border-stone-300 rounded-[10px_0_10px_0] p-4">
      <legend className="text-sm font-medium px-1">{legend}</legend>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="w-full sm:flex-1">
          <label htmlFor={numberId} className="block text-sm mb-1">Number</label>
          <input id={numberId} name={numberId} type="number" required defaultValue={defaultNumber}
            aria-describedby={`${numberId}-error`}
            className="w-full rounded border border-stone-300 px-3 py-2" />
        </div>
        <div className="w-full sm:flex-[2]">
          <label htmlFor={titleId} className="block text-sm mb-1">Title</label>
          <input id={titleId} name={titleId} type="text" required defaultValue={defaultTitle}
            aria-describedby={`${titleId}-error`}
            className="w-full rounded border border-stone-300 px-3 py-2" />
        </div>
      </div>
      <ErrorList id={`${numberId}-error`} errors={numberErrors} />
      <ErrorList id={`${titleId}-error`} errors={titleErrors} />
    </fieldset>
  );
}