import { StorageUtils } from './storage';

describe('StorageUtils', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it('stores and reads items from local storage by default', () => {
    StorageUtils.setItem('language', 'cs');

    expect(StorageUtils.getItem('language')).toBe('cs');
    expect(localStorage.getItem('language')).toBe('cs');
  });

  it('uses session storage when requested', () => {
    StorageUtils.setItem('postId', '42', 'session');

    expect(StorageUtils.getItem('postId', 'session')).toBe('42');
    expect(localStorage.getItem('postId')).toBeNull();
  });

  it('notifies current tab watchers when storage changes', () => {
    const listener = vi.fn<(key: string, value: string | null) => void>();

    StorageUtils.watchCurrentTab(listener);
    StorageUtils.setItem('theme', 'dark');
    StorageUtils.removeItem('theme');

    expect(listener).toHaveBeenNthCalledWith(1, 'theme', 'dark');
    expect(listener).toHaveBeenNthCalledWith(2, 'theme', null);
  });

  it('coerces JSON objects and ignores invalid values', () => {
    interface Settings {
      density: number;
      theme: string;
    }

    expect(StorageUtils.coerceObject<Settings>('{"density":2,"theme":"dark"}')).toEqual({
      density: 2,
      theme: 'dark',
    });
    expect(StorageUtils.coerceObject<Settings>('not-json')).toBeNull();
    expect(StorageUtils.coerceObject<Settings>(null)).toBeNull();
  });
});
