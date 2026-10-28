/** Values accepted by the consultation form's "Project type" field. Kept small: it ships to the browser. */
export const formServices = [
  { value: 'bathrooms', label: 'Bathrooms' },
  { value: 'kitchens', label: 'Kitchens' },
  { value: 'additions', label: 'Additions' },
  { value: 'new-construction', label: 'New Construction' },
  { value: 'commercial-multifamily', label: 'Commercial & Multifamily' },
  { value: 'small-repairs', label: 'Small repairs' },
  { value: 'other', label: 'Other / Not sure' },
] as const;
export type FormServiceValue = (typeof formServices)[number]['value'];
