import { EventTypeStore } from './EventTypeStore';

test('starts with empty state', () => {
    const store = new EventTypeStore();
    expect(store.eventTypes).toHaveLength(0);
    expect(store.isLoading).toBe(false);
    expect(store.error).toBeNull();
});
