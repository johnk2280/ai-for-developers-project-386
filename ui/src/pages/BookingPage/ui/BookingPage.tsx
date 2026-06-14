import type { ReactElement } from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import {
  Box, Group, Stack, Title, Text, Badge, TextInput, Textarea,
  Select, Button, Alert, Skeleton, Paper, Divider, Center, ThemeIcon,
} from '@mantine/core';
import {
  IconClock, IconAlertCircle, IconCheck, IconCalendarEvent,
} from '@tabler/icons-react';
import { useStore } from '@/app/providers/StoreProvider';
import { bookingApi } from '@entities/Booking';

interface BookingForm {
  date: string;
  timeStart: string;
  guestName: string;
  guestEmail: string;
  reason: string;
  platformId: string;
  url: string;
}

const EMPTY_FORM: BookingForm = {
  date: '',
  timeStart: '',
  guestName: '',
  guestEmail: '',
  reason: '',
  platformId: '',
  url: '',
};

const addMinutes = (time: string, minutes: number): string => {
  const [h, m] = time.split(':').map(Number);
  const total = h * 60 + m + minutes;
  return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
};

export const BookingPage = observer((): ReactElement => {
  const { ownerUsername, eventTypeId } = useParams<{ ownerUsername: string; eventTypeId: string }>();
  const { owners: ownerStore, eventTypes: etStore, meetingPlatforms: platformStore, schedules: scheduleStore } = useStore();

  const [form, setForm] = useState<BookingForm>(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    void ownerStore.fetchAll();
    void etStore.fetchAll();
    void platformStore.fetchAll();
  }, [ownerStore, etStore, platformStore]);

  const owner = ownerStore.owners.find((o) => o.username === ownerUsername);
  const eventType = etStore.eventTypes.find((et) => et.id === eventTypeId);

  useEffect(() => {
    if (owner) void scheduleStore.fetchRules(owner.id);
  }, [owner, scheduleStore]);

  const platformOptions = platformStore.platforms.map((p) => ({
    value: p.id,
    label: p.name,
  }));

  const generateSlots = (): string[] => {
    if (!form.date || !eventType) return [];
    const dayOfWeek = new Date(form.date).getDay();
    const weekday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    const rule = scheduleStore.rules.find((r) => r.weekday === weekday);
    if (!rule || rule.periods.length === 0) return [];

    const slots: string[] = [];
    for (const period of rule.periods) {
      let cursor = period.start;
      while (cursor < period.end) {
        const next = addMinutes(cursor, eventType.duration);
        if (next <= period.end) slots.push(cursor);
        cursor = addMinutes(cursor, 15);
      }
    }
    return slots;
  };

  const slotOptions = generateSlots().map((s) => ({ value: s, label: s }));

  const handleSubmit = async (): Promise<void> => {
    if (!owner || !eventType || !form.date || !form.timeStart) {
      setError('Please fill in all required fields.');
      return;
    }
    setIsSubmitting(true);
    setError(null);
    try {
      const start = `${form.date}T${form.timeStart}:00Z`;
      const end = `${form.date}T${addMinutes(form.timeStart, eventType.duration)}:00Z`;
      await bookingApi.create(owner.id, {
        start,
        end,
        typeId: eventType.id,
        reason: form.reason,
        platformId: form.platformId,
        url: form.url,
        guestName: form.guestName,
        guestEmail: form.guestEmail,
      });
      setSubmitted(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Booking failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <Center h="100vh">
        <Stack align="center" gap="md">
          <ThemeIcon size={64} radius="xl" color="teal" variant="light">
            <IconCheck size={36} />
          </ThemeIcon>
          <Title order={3} fw={700}>Booking confirmed!</Title>
          <Text c="dimmed" size="sm">You will receive a confirmation shortly.</Text>
        </Stack>
      </Center>
    );
  }

  const isLoading = ownerStore.isLoading || etStore.isLoading || platformStore.isLoading;

  return (
    <Box mih="100vh" bg="gray.0">
      <Center py="xl" px="md">
        <Box w="100%" maw={800}>
          {isLoading ? (
            <Stack gap="md">
              <Skeleton h={200} radius="md" />
              <Skeleton h={400} radius="md" />
            </Stack>
          ) : !owner || !eventType ? (
            <Alert icon={<IconAlertCircle size={16} />} color="red">
              Event not found. Please check the link.
            </Alert>
          ) : (
            <Group align="flex-start" gap="xl" wrap="nowrap"
              style={{ flexDirection: 'row' }}
            >
              {/* Left: event info */}
              <Paper withBorder radius="md" p="xl" w={260} style={{ flexShrink: 0 }}>
                <Stack gap="md">
                  <Box>
                    <Text size="xs" c="dimmed" tt="uppercase" fw={600} mb={4}>
                      {owner.name}
                    </Text>
                    <Title order={3} fw={700}>{eventType.name}</Title>
                  </Box>
                  <Group gap="xs">
                    <IconClock size={16} color="var(--mantine-color-gray-6)" />
                    <Badge variant="light" color="gray">{eventType.duration} min</Badge>
                  </Group>
                  {eventType.description && (
                    <>
                      <Divider />
                      <Text size="sm" c="dimmed">{eventType.description}</Text>
                    </>
                  )}
                  <Divider />
                  <Stack gap={2}>
                    <Text size="xs" c="dimmed">Timezone</Text>
                    <Text size="sm">{owner.timezone}</Text>
                  </Stack>
                </Stack>
              </Paper>

              {/* Right: booking form */}
              <Paper withBorder radius="md" p="xl" style={{ flex: 1 }}>
                <Stack gap="md">
                  <Group gap="xs" mb="xs">
                    <IconCalendarEvent size={18} />
                    <Text fw={600}>Book a time</Text>
                  </Group>

                  {error && (
                    <Alert icon={<IconAlertCircle size={16} />} color="red">
                      {error}
                    </Alert>
                  )}

                  <TextInput
                    label="Date"
                    type="date"
                    value={form.date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setForm((f) => ({ ...f, date: e.target.value, timeStart: '' }))}
                    required
                  />

                  <Select
                    label="Time"
                    placeholder={form.date ? 'Pick a time slot' : 'Select a date first'}
                    data={slotOptions}
                    value={form.timeStart}
                    onChange={(v) => setForm((f) => ({ ...f, timeStart: v ?? '' }))}
                    disabled={!form.date || slotOptions.length === 0}
                    required
                  />

                  <Divider label="Your details" labelPosition="left" />

                  <TextInput
                    label="Your name"
                    placeholder="John Doe"
                    value={form.guestName}
                    onChange={(e) => setForm((f) => ({ ...f, guestName: e.target.value }))}
                    required
                  />
                  <TextInput
                    label="Email"
                    type="email"
                    placeholder="john@example.com"
                    value={form.guestEmail}
                    onChange={(e) => setForm((f) => ({ ...f, guestEmail: e.target.value }))}
                    required
                  />

                  <Divider label="Meeting details" labelPosition="left" />

                  <Select
                    label="Platform"
                    placeholder="Select platform"
                    data={platformOptions}
                    value={form.platformId}
                    onChange={(v) => setForm((f) => ({ ...f, platformId: v ?? '' }))}
                  />
                  <TextInput
                    label="Meeting URL"
                    placeholder="https://meet.google.com/..."
                    value={form.url}
                    onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))}
                  />
                  <Textarea
                    label="Reason (optional)"
                    placeholder="What would you like to discuss?"
                    value={form.reason}
                    onChange={(e) => setForm((f) => ({ ...f, reason: e.target.value }))}
                    rows={3}
                  />

                  <Button
                    fullWidth
                    size="md"
                    loading={isSubmitting}
                    onClick={() => void handleSubmit()}
                    mt="xs"
                  >
                    Confirm booking
                  </Button>
                </Stack>
              </Paper>
            </Group>
          )}
        </Box>
      </Center>
    </Box>
  );
});
