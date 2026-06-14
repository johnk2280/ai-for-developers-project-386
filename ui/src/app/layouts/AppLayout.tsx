import type { ReactElement } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { AppShell, Group, Text, Container, Box, Anchor } from '@mantine/core';
import classes from './AppLayout.module.css';

const NAV_LINKS = [
  { label: 'Event Types', to: '/event-types' },
  { label: 'Availability', to: '/availability' },
];

export const AppLayout = (): ReactElement => (
  <AppShell header={{ height: 56 }}>
    <AppShell.Header>
      <Group h="100%" px="xl" justify="space-between">
        <Text fw={700} size="md" c="dark.8">
          CallCalendar
        </Text>
        <Group gap={4}>
          {NAV_LINKS.map((link) => (
            <Anchor
              key={link.to}
              component={NavLink}
              to={link.to}
              className={classes.navLink}
              underline="never"
            >
              {link.label}
            </Anchor>
          ))}
        </Group>
      </Group>
    </AppShell.Header>
    <AppShell.Main bg="gray.0">
      <Box py="xl">
        <Container size="lg">
          <Outlet />
        </Container>
      </Box>
    </AppShell.Main>
  </AppShell>
);
