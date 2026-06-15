import { ActionIcon, Badge, Box, Card, Group, Stack, Text } from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import type { ReactElement } from 'react';
import type { EventType } from '../model/types/types';

interface EventTypeCardProps {
    eventType: EventType;
    onEdit: (eventType: EventType) => void;
    onRemove: (id: string) => void;
}

export const EventTypeCard = ({ eventType, onEdit, onRemove }: EventTypeCardProps): ReactElement => (
    <Card withBorder radius="md" p="lg">
        <Stack gap="xs" style={{ flex: 1 }}>
            <Group justify="space-between" wrap="nowrap">
                <Text fw={600} size="md" lineClamp={1}>{eventType.name}</Text>
                <Badge variant="light" color="gray" size="sm" style={{ flexShrink: 0 }}>
                    {eventType.duration} min
                </Badge>
            </Group>
            <Text c="dimmed" size="sm" lineClamp={2} style={{ flex: 1 }}>
                {eventType.description}
            </Text>
        </Stack>
        <Box mt="md" pt="md" style={{ borderTop: '1px solid var(--mantine-color-gray-2)' }}>
            <Group gap="xs" justify="flex-end">
                <ActionIcon variant="subtle" color="gray" onClick={() => onEdit(eventType)}>
                    <IconPencil size={16} />
                </ActionIcon>
                <ActionIcon variant="subtle" color="red" onClick={() => onRemove(eventType.id)}>
                    <IconTrash size={16} />
                </ActionIcon>
            </Group>
        </Box>
    </Card>
);
