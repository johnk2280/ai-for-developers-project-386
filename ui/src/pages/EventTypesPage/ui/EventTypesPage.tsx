import { useStore } from '@/app/providers/StoreProvider';
import type { EventType } from '@entities/EventType';
import { EventTypeCard } from '@entities/EventType';
import { EventTypeFormModal } from '@features/EventTypeForm';
import {
    Alert,
    Button,
    Center,
    Group,
    SimpleGrid,
    Skeleton,
    Stack,
    Text,
    Title,
} from '@mantine/core';
import { IconAlertCircle, IconCalendarEvent, IconPlus } from '@tabler/icons-react';
import { observer } from 'mobx-react-lite';
import type { ReactElement } from 'react';
import { useEffect, useState } from 'react';

export const EventTypesPage = observer((): ReactElement => {
    const { eventTypes: store } = useStore();
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState<EventType | null>(null);

    useEffect(() => {
        void store.fetchAll();
    }, [store]);

    const openCreate = (): void => {
        setEditing(null);
        setModalOpen(true);
    };

    const openEdit = (et: EventType): void => {
        setEditing(et);
        setModalOpen(true);
    };

    const closeModal = (): void => {
        setModalOpen(false);
        setEditing(null);
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
                        <EventTypeCard
                            key={et.id}
                            eventType={et}
                            onEdit={openEdit}
                            onRemove={(id) => void handleRemove(id)}
                        />
                    ))}
                </SimpleGrid>
            )}

            <EventTypeFormModal
                opened={modalOpen}
                onClose={closeModal}
                eventType={editing}
            />
        </>
    );
});
