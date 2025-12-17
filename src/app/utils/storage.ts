export type StorageType = 'local' | 'session';

export interface StorageChangeEvent {
  key: string;
  value: string | null;
}

export type StorageChangeFn = (key: string, value: string | null) => void;

export class StorageUtils {
  private static eventTarget = new EventTarget();

  public static isAvailable = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

  public static getStorageType = (storage: StorageType): Storage => {
    return storage === 'session' ? sessionStorage : localStorage;
  };

  public static getItem = (key: string, storageType: StorageType = 'local'): string | null => {
    if (this.isAvailable) {
      const storage = this.getStorageType(storageType);
      return storage.getItem(key);
    } else {
      console.warn(`${storageType}Storage setItem`, key);
      return null;
    }
  };

  public static setItem = (key: string, value: string, storageType: StorageType = 'local'): void => {
    if (this.isAvailable) {
      const storage = this.getStorageType(storageType);
      storage.setItem(key, value);
      StorageUtils.eventTarget.dispatchEvent(
        new CustomEvent<StorageChangeEvent>('storage', { detail: { key, value: value } }),
      );
    } else {
      console.warn(`${storageType}Storage setItem`, key, value);
    }
  };

  public static removeItem = (key: string, storageType: StorageType = 'local'): void => {
    if (this.isAvailable) {
      const storage = this.getStorageType(storageType);
      storage.removeItem(key);
      StorageUtils.eventTarget.dispatchEvent(
        new CustomEvent<StorageChangeEvent>('storage', { detail: { key, value: null } }),
      );
    } else {
      console.warn(`${storageType}Storage removeItem`, key);
    }
  };

  public static watchCrossTab = (fn: StorageChangeFn) => {
    return window.addEventListener('storage', (e) => {
      const event = e as StorageEvent;
      fn(event.key ?? '', event.newValue);
    });
  };

  public static watchCurrentTab = (fn: StorageChangeFn) => {
    return StorageUtils.eventTarget.addEventListener('storage', (e) => {
      const customEvent = e as CustomEvent<StorageChangeEvent>;
      fn(customEvent.detail.key, customEvent.detail.value);
    });
  };

  public static coerceObject = <T extends object>(settings?: string | null): T | null => {
    try {
      if (settings && typeof settings === 'string') {
        return JSON.parse(settings);
      }
      return null;
    } catch {
      return null;
    }
  };
}
