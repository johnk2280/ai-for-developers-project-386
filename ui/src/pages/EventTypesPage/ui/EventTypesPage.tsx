import { useStore } from '@/app/providers/StoreProvider';
import type { EventType, EventTypeCreate, EventTypeUpdate } from '@entities/EventType';
import {
    ActionIcon,
    Alert,
    Badge,
    Box,
    Button,
    Card,
    Center,
    Group,
    Modal,
    Select,
    SimpleGrid,
    Skeleton,
    Stack,
    Text,
    TextInput, Textarea,
    Title,
} from '@mantine/core';
import { IconAlertCircle, IconCalendarEvent, IconPencil, IconPlus, IconTrash } from '@tabler/icons-react';
import { observer } from 'mobx-react-lite';
import type { ReactElement } from 'react';
import { useEffect, useState } from 'react';

const DURATION_OPTIONS = [
    { value: '15', label: '15 min' },
    { value: '30', label: '30 min' },
    { value: '45', label: '45 min' },
    { value: '60', label: '60 min' },
    { value: '90', label: '90 min' },
    { value: '120', label: '2 hours' },
];

interface FormState {
    name: string;
    description: string;
    duration: string;
}

const EMPTY_FORM: FormState = { name: '', description: '', duration: '30' };

export const EventTypesPage = observer((): ReactElement => {
    const { eventTypes: store } = useStore();
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState<EventType | null>(null);
    const [form, setForm] = useState<FormState>(EMPTY_FORM);

    useEffect(() => {
        void store.fetchAll();
    }, [store]);

    const openCreate = (): void => {
        setEditing(null);
        setForm(EMPTY_FORM);
        store.clearError();
        setModalOpen(true);
    };

    const openEdit = (et: EventType): void => {
        setEditing(et);
        setForm({ name: et.name, description: et.description, duration: String(et.duration) });
        store.clearError();
        setModalOpen(true);
    };

    const closeModal = (): void => {
        setModalOpen(false);
        setEditing(null);
    };

    const handleSave = async (): Promise<void> => {
        const duration = Number(form.duration);
        if (editing) {
            const payload: EventTypeUpdate = { name: form.name, description: form.description, duration };
            await store.update(editing.id, payload);
        } else {
            const payload: EventTypeCreate = { name: form.name, description: form.description, duration };
            await store.create(payload);
        }
        if (!store.error) closeModal();
    };

    const handleRemove = async (id: string): Promise<void> => {
        await store.remove(id);
    };

    return (
        <>
            <Group justify="space-between" mb="xl">
                <Title order={2} fw={700}>Event Types</Title>
                <Button leftSection={<IconPlus size={16} />} onClick={openCreate}>
                    New Event Type
                </Button>
            </Group>

            {store.error && (
                <Alert icon={<IconAlertCircle size={16} />} color="red" mb="lg">
                    {store.error}
                </Alert>
            )}

            {store.isLoading ? (
                <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
                    {[1, 2, 3].map((n) => <Skeleton key={n} h={160} radius="md" />)}
                </SimpleGrid>
            ) : store.eventTypes.length === 0 ? (
                <Center h={300}>
                    <Stack align="center" gap="sm">
                        <IconCalendarEvent size={48} color="var(--mantine-color-gray-4)" />
                        <Text c="dimmed" size="sm">No event types yet. Create your first one.</Text>
                    </Stack>
                </Center>
            ) : (
                <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
                    {store.eventTypes.map((et) => (
                        <Card key={et.id} withBorder radius="md" p="lg">
                            <Stack gap="xs" style={{ flex: 1 }}>
                                <Group justify="space-between" wrap="nowrap">
                                    <Text fw={600} size="md" lineClamp={1}>{et.name}</Text>
                                    <Badge variant="light" color="gray" size="sm" style={{ flexShrink: 0 }}>
                                        {et.duration} min
                                    </Badge>
                                </Group>
                                <Text c="dimmed" size="sm" lineClamp={2} style={{ flex: 1 }}>
                                    {et.description}
                                </Text>
                            </Stack>
                            <Box mt="md" pt="md" style={{ borderTop: '1px solid var(--mantine-color-gray-2)' }}>
                                <Group gap="xs" justify="flex-end">
                                    <ActionIcon variant="subtle" color="gray" onClick={() => openEdit(et)}>
                                        <IconPencil size={16} />
                                    </ActionIcon>
                                    <ActionIcon variant="subtle" color="red" onClick={() => void handleRemove(et.id)}>
                                        <IconTrash size={16} />
                                    </ActionIcon>
                                </Group>
                            </Box>
                        </Card>
                    ))}
                </SimpleGrid>
            )}

            <Modal
                opened={modalOpen}
                onClose={closeModal}
                title={<Text fw={600}>{editing ? 'Edit Event Type' : 'New Event Type'}</Text>}
                size="sm"
            >
                <Stack gap="md">
                    {store.error && (
                        <Alert icon={<IconAlertCircle size={16} />} color="red">
                            {store.error}
                        </Alert>
                    )}
                    <TextInput
                        label="Name"
                        placeholder="e.g. 30-min intro call"
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        required
                    />
                    <Textarea
                        label="Description"
                        placeholder="What is this event about?"
                        value={form.description}
                        onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                        rows={3}
                    />
                    <Select
                        label="Duration"
                        data={DURATION_OPTIONS}
                        value={form.duration}
                        onChange={(v) => setForm((f) => ({ ...f, duration: v ?? '30' }))}
                    />
                    <Group justify="flex-end" mt="xs">
                        <Button variant="default" onClick={closeModal}>Cancel</Button>
                        <Button loading={store.isSaving} onClick={() => void handleSave()}>
                            {editing ? 'Save changes' : 'Create'}
                        </Button>
                    </Group>
                </Stack>
            </Modal>
        </>
    );
});
