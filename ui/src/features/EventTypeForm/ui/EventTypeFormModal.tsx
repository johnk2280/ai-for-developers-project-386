import { useStore } from '@/app/providers/StoreProvider';
import type { EventType } from '@entities/EventType';
import { Modal, Text } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import type { ReactElement } from 'react';
import { useEffect, useState } from 'react';
import type { FormState } from '../model/const/formModel';
import { EMPTY_FORM } from '../model/const/formModel';
import { EventTypeForm } from './EventTypeForm';

interface EventTypeFormModalProps {
    opened: boolean;
    onClose: () => void;
    eventType: EventType | null;
}

export const EventTypeFormModal = observer(({
    opened,
    onClose,
    eventType,
}: EventTypeFormModalProps): ReactElement => {
    const { eventTypes: store } = useStore();
    const [form, setForm] = useState<FormState>(EMPTY_FORM);

    useEffect(() => {
        if (opened) {
            store.clearError();
            setForm(
                eventType
                    ? { name: eventType.name, description: eventType.description, duration: String(eventType.duration) }
                    : EMPTY_FORM,
            );
        }
    }, [opened, eventType, store]);

    const handleSave = async (): Promise<void> => {
        const duration = Number(form.duration);
        if (eventType) {
            await store.update(eventType.id, { name: form.name, description: form.description, duration });
        } else {
            await store.create({ name: form.name, description: form.description, duration });
        }
        if (!store.error) onClose();
    };

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title={<Text fw={600}>{eventType ? 'Edit Event Type' : 'New Event Type'}</Text>}
            size="sm"
        >
            <EventTypeForm
                form={form}
                onChange={setForm}
                onSubmit={() => void handleSave()}
                onCancel={onClose}
                isSaving={store.isSaving}
                error={store.error}
                isEditing={eventType !== null}
            />
        </Modal>
    );
});
