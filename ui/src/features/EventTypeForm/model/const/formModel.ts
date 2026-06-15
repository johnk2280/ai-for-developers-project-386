export interface FormState {
    name: string;
    description: string;
    duration: string;
}

export const EMPTY_FORM: FormState = { name: '', description: '', duration: '30' };

export const DURATION_OPTIONS = [
    { value: '15', label: '15 min' },
    { value: '30', label: '30 min' },
    { value: '45', label: '45 min' },
    { value: '60', label: '60 min' },
    { value: '90', label: '90 min' },
    { value: '120', label: '2 hours' },
];
