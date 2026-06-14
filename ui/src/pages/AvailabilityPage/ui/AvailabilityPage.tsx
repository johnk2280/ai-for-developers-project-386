import type { ReactElement } from 'react';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Title, Select, Stack, Group, Text, Switch, TextInput, Button,
  ActionIcon, Divider, Card, Badge, Modal, Alert, Skeleton, Box,
} from '@mantine/core';
import {
  IconPlus, IconTrash, IconAlertCircle, IconClock,
} from '@tabler/icons-react';
import { useStore } from '@/app/providers/StoreProvider';
import type { AvailabilityRuleWrite, AvailabilityOverrideCreate } from '@entities/Schedule';

const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

interface DayEntry {
  weekday: number;
  enabled: boolean;
  periods: { start: string; end: string }[];
}

const defaultPeriod = (): { start: string; end: string } => ({ start: '09:00', end: '17:00' });

const buildInitialDays = (): DayEntry[] =>
  WEEKDAYS.map((_, i) => ({
    weekday: i,
    enabled: i < 5,
    periods: i < 5 ? [defaultPeriod()] : [],
  }));

export const AvailabilityPage = observer((): ReactElement => {
  const { owners: ownerStore, schedules: scheduleStore } = useStore();
  const [selectedOwnerId, setSelectedOwnerId] = useState<string | null>(null);
  const [days, setDays] = useState<DayEntry[]>(buildInitialDays);
  const [overrideModal, setOverrideModal] = useState(false);
  const [overrideDate, setOverrideDate] = useState('');
  const [overridePeriods, setOverridePeriods] = useState([defaultPeriod()]);

  useEffect(() => {
    void ownerStore.fetchAll();
  }, [ownerStore]);

  useEffect(() => {
    if (!selectedOwnerId) return;
    void scheduleStore.fetchRules(selectedOwnerId);
    void scheduleStore.fetchOverrides(selectedOwnerId);
  }, [selectedOwnerId, scheduleStore]);

  useEffect(() => {
    if (!scheduleStore.rules.length) return;
    setDays((prev) =>
      prev.map((day) => {
        const rule = scheduleStore.rules.find((r) => r.weekday === day.weekday);
        if (!rule) return { ...day, enabled: false, periods: [] };
        return {
          ...day,
          enabled: rule.periods.length > 0,
          periods: rule.periods.length > 0 ? rule.periods.map((p) => ({ start: p.start, end: p.end })) : [defaultPeriod()],
        };
      }),
    );
  }, [scheduleStore.rules]);

  const toggleDay = (weekday: number): void => {
    setDays((prev) =>
      prev.map((d) =>
        d.weekday === weekday
          ? { ...d, enabled: !d.enabled, periods: !d.enabled ? [defaultPeriod()] : d.periods }
          : d,
      ),
    );
  };

  const updatePeriod = (weekday: number, idx: number, field: 'start' | 'end', value: string): void => {
    setDays((prev) =>
      prev.map((d) =>
        d.weekday === weekday
          ? { ...d, periods: d.periods.map((p, i) => (i === idx ? { ...p, [field]: value } : p)) }
          : d,
      ),
    );
  };

  const addPeriod = (weekday: number): void => {
    setDays((prev) =>
      prev.map((d) =>
        d.weekday === weekday ? { ...d, periods: [...d.periods, defaultPeriod()] } : d,
      ),
    );
  };

  const removePeriod = (weekday: number, idx: number): void => {
    setDays((prev) =>
      prev.map((d) =>
        d.weekday === weekday ? { ...d, periods: d.periods.filter((_, i) => i !== idx) } : d,
      ),
    );
  };

  const saveRules = async (): Promise<void> => {
    if (!selectedOwnerId) return;
    const payload: AvailabilityRuleWrite[] = days
      .filter((d) => d.enabled && d.periods.length > 0)
      .map((d) => ({ weekday: d.weekday, periods: d.periods }));
    await scheduleStore.replaceRules(selectedOwnerId, payload);
  };

  const saveOverride = async (): Promise<void> => {
    if (!selectedOwnerId || !overrideDate) return;
    const payload: AvailabilityOverrideCreate = { date: overrideDate, periods: overridePeriods };
    await scheduleStore.createOverride(selectedOwnerId, payload);
    setOverrideModal(false);
    setOverrideDate('');
    setOverridePeriods([defaultPeriod()]);
  };

  const ownerOptions = ownerStore.owners.map((o) => ({
    value: o.id,
    label: `${o.name} (@${o.username})`,
  }));

  return (
    <>
      <Group justify="space-between" mb="xl">
        <Title order={2} fw={700}>Availability</Title>
      </Group>

      {ownerStore.isLoading ? (
        <Skeleton h={36} w={320} radius="md" />
      ) : (
        <Select
          placeholder="Select owner"
          data={ownerOptions}
          value={selectedOwnerId}
          onChange={setSelectedOwnerId}
          w={320}
          mb="xl"
        />
      )}

      {scheduleStore.error && (
        <Alert icon={<IconAlertCircle size={16} />} color="red" mb="lg">
          {scheduleStore.error}
        </Alert>
      )}

      {selectedOwnerId && (
        <>
          {/* Weekly schedule */}
          <Card withBorder radius="md" p="lg" mb="lg">
            <Group justify="space-between" mb="lg">
              <Text fw={600}>Weekly Hours</Text>
              <Button
                size="xs"
                variant="default"
                leftSection={<IconClock size={14} />}
                loading={scheduleStore.isSaving}
                onClick={() => void saveRules()}
              >
                Save schedule
              </Button>
            </Group>

            <Stack gap="md">
              {days.map((day) => (
                <Box key={day.weekday}>
                  <Group align="flex-start" gap="md" wrap="nowrap">
                    <Switch
                      checked={day.enabled}
                      onChange={() => toggleDay(day.weekday)}
                      mt={4}
                    />
                    <Box style={{ width: 96, flexShrink: 0 }}>
                      <Text size="sm" fw={500} mt={4}>{WEEKDAYS[day.weekday]}</Text>
                    </Box>

                    {day.enabled ? (
                      <Stack gap="xs" style={{ flex: 1 }}>
                        {day.periods.map((period, idx) => (
                          <Group key={idx} gap="xs" wrap="nowrap">
                            <TextInput
                              type="time"
                              size="xs"
                              value={period.start}
                              onChange={(e) => updatePeriod(day.weekday, idx, 'start', e.target.value)}
                              style={{ width: 110 }}
                            />
                            <Text size="xs" c="dimmed">–</Text>
                            <TextInput
                              type="time"
                              size="xs"
                              value={period.end}
                              onChange={(e) => updatePeriod(day.weekday, idx, 'end', e.target.value)}
                              style={{ width: 110 }}
                            />
                            {day.periods.length > 1 && (
                              <ActionIcon
                                variant="subtle"
                                color="gray"
                                size="sm"
                                onClick={() => removePeriod(day.weekday, idx)}
                              >
                                <IconTrash size={14} />
                              </ActionIcon>
                            )}
                          </Group>
                        ))}
                        <Button
                          size="compact-xs"
                          variant="subtle"
                          color="gray"
                          leftSection={<IconPlus size={12} />}
                          onClick={() => addPeriod(day.weekday)}
                          style={{ alignSelf: 'flex-start' }}
                        >
                          Add period
                        </Button>
                      </Stack>
                    ) : (
                      <Text size="sm" c="dimmed" mt={4}>Unavailable</Text>
                    )}
                  </Group>
                  {day.weekday < 6 && <Divider mt="md" />}
                </Box>
              ))}
            </Stack>
          </Card>

          {/* Date overrides */}
          <Card withBorder radius="md" p="lg">
            <Group justify="space-between" mb="lg">
              <Text fw={600}>Date Overrides</Text>
              <Button
                size="xs"
                variant="default"
                leftSection={<IconPlus size={14} />}
                onClick={() => setOverrideModal(true)}
              >
                Add override
              </Button>
            </Group>

            {scheduleStore.isLoadingOverrides ? (
              <Skeleton h={60} radius="md" />
            ) : scheduleStore.overrides.length === 0 ? (
              <Text c="dimmed" size="sm">No overrides set for specific dates.</Text>
            ) : (
              <Stack gap="sm">
                {scheduleStore.overrides.map((override) => (
                  <Group key={override.date} justify="space-between" p="sm"
                    style={{ borderRadius: 8, border: '1px solid var(--mantine-color-gray-2)' }}>
                    <Group gap="sm">
                      <Text size="sm" fw={500}>{override.date}</Text>
                      <Group gap={4}>
                        {override.periods.map((p, i) => (
                          <Badge key={i} variant="light" color="gray" size="sm">
                            {p.start}–{p.end}
                          </Badge>
                        ))}
                        {override.periods.length === 0 && (
                          <Badge variant="light" color="red" size="sm">Unavailable</Badge>
                        )}
                      </Group>
                    </Group>
                    <ActionIcon
                      variant="subtle"
                      color="red"
                      size="sm"
                      onClick={() => void scheduleStore.deleteOverride(selectedOwnerId, override.date)}
                    >
                      <IconTrash size={14} />
                    </ActionIcon>
                  </Group>
                ))}
              </Stack>
            )}
          </Card>

          <Modal
            opened={overrideModal}
            onClose={() => setOverrideModal(false)}
            title={<Text fw={600}>Add Date Override</Text>}
            size="sm"
          >
            <Stack gap="md">
              <TextInput
                label="Date"
                type="date"
                value={overrideDate}
                onChange={(e) => setOverrideDate(e.target.value)}
                required
              />
              <Text size="sm" fw={500}>Hours</Text>
              {overridePeriods.map((period, idx) => (
                <Group key={idx} gap="xs" wrap="nowrap">
                  <TextInput
                    type="time"
                    size="xs"
                    value={period.start}
                    onChange={(e) => setOverridePeriods((prev) =>
                      prev.map((p, i) => (i === idx ? { ...p, start: e.target.value } : p))
                    )}
                    style={{ width: 110 }}
                  />
                  <Text size="xs" c="dimmed">–</Text>
                  <TextInput
                    type="time"
                    size="xs"
                    value={period.end}
                    onChange={(e) => setOverridePeriods((prev) =>
                      prev.map((p, i) => (i === idx ? { ...p, end: e.target.value } : p))
                    )}
                    style={{ width: 110 }}
                  />
                  {overridePeriods.length > 1 && (
                    <ActionIcon
                      variant="subtle"
                      color="gray"
                      size="sm"
                      onClick={() => setOverridePeriods((prev) => prev.filter((_, i) => i !== idx))}
                    >
                      <IconTrash size={14} />
                    </ActionIcon>
                  )}
                </Group>
              ))}
              <Button
                size="compact-xs"
                variant="subtle"
                color="gray"
                leftSection={<IconPlus size={12} />}
                onClick={() => setOverridePeriods((prev) => [...prev, defaultPeriod()])}
                style={{ alignSelf: 'flex-start' }}
              >
                Add period
              </Button>
              <Group justify="flex-end" mt="xs">
                <Button variant="default" onClick={() => setOverrideModal(false)}>Cancel</Button>
                <Button loading={scheduleStore.isSaving} onClick={() => void saveOverride()}>Save</Button>
              </Group>
            </Stack>
          </Modal>
        </>
      )}
    </>
  );
});
