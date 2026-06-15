import { Alert, Button, Group, Select, Stack, Textarea, TextInput } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import type { ReactElement } from 'react';
import type { FormState } from '../model/const/formModel';
import { DURATION_OPTIONS } from '../model/const/formModel';

interface EventTypeFormProps {
    form: FormState;
    onChange: (form: FormState) => void;
    onSubmit: () => void;
    onCancel: () => void;
    isSaving: boolean;
    error: string | null;
    isEditing: boolean;
}

export const EventTypeForm = ({
    form,
    onChange,
    onSubmit,
    onCancel,
    isSaving,
    error,
    isEditing,
}: EventTypeFormProps): ReactElement => (
    <Stack gap="md">
        {error && (
            <Alert icon={<IconAlertCircle size={16} />} color="red">
                {error}
            </Alert>
        )}
        <TextInput
            label="Name"
            placeholder="e.g. 30-min intro call"
            value={form.name}
            onChange={(e) => onChange({ ...form, name: e.target.value })}
            required
        />
        <Textarea
            label="Description"
            placeholder="What is this event about?"
            value={form.description}
            onChange={(e) => onChange({ ...form, description: e.target.value })}
            rows={3}
        />
        <Select
            label="Duration"
            data={DURATION_OPTIONS}
            value={form.duration}
            onChange={(v) => onChange({ ...form, duration: v ?? '30' })}
        />
        <Group justify="flex-end" mt="xs">
            <Button variant="default" onClick={onCancel}>Cancel</Button>
            <Button loading={isSaving} onClick={onSubmit}>
                {isEditing ? 'Save changes' : 'Create'}
            </Button>
        </Group>
    </Stack>
);
