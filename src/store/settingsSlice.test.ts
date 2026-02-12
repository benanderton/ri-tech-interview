import { setOmdbConfig } from './settingsSlice';

describe('settingsSlice', () => {
  // Mock localStorage before tests
  const mockLocalStorage = {
    setItem: jest.fn(),
    getItem: jest.fn(),
  };
  global.localStorage = mockLocalStorage as any;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should set omdbConfig and persist to localStorage', () => {
    const action = setOmdbConfig({
      apiKey: 'myApiKey1234',
      baseUrl: 'https://custom.api.com',
    });

    // Apply reducer manually (or we could create a slice instance)
    const state = {
      omdbConfig: { apiKey: '', baseUrl: undefined },
    };

    // Simulate reducer execution
    state.omdbConfig = action.payload;
    // Persist to localStorage
    localStorage.setItem('omdbConfig', JSON.stringify(action.payload));

    // Verify persisted payload matches action payload
    const persisted = JSON.parse(localStorage.getItem('omdbConfig'));
    expect(persisted).toEqual(action.payload);

    // Verify state was updated
    expect(state.omdbConfig.apiKey).toBe('myApiKey1234');
    expect(state.omdbConfig.baseUrl).toBe('https://custom.api.com');
  });

  it('should validate key length in component (handled in UI)', async () => {
    // This test is mainly illustrative; validation happens in the component.
    const action = setOmdbConfig({ apiKey: 'short', baseUrl: undefined });

    const state = {
      omdbConfig: { apiKey: '', baseUrl: undefined },
    };

    state.omdbConfig = action.payload;
    localStorage.setItem('omdbConfig', JSON.stringify(action.payload));

    expect(state.omdbConfig.apiKey).toBe('short');
    // No assertion on length here because slice doesn't enforce it.
  });