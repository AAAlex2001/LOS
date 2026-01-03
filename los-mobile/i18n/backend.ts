import config from '@/config';

const API_BASE = config.API_BASE;

interface BackendOptions {
  loadPath: string;
}

class I18nextBackend {
  type = 'backend' as const;
  static type = 'backend' as const;

  private options: BackendOptions;

  constructor(services: any, options: BackendOptions) {
    this.init(services, options);
  }

  init(services: any, options: BackendOptions) {
    this.options = options || { loadPath: `${API_BASE}/api/translations/{{lng}}/` };
  }

  read(language: string, namespace: string, callback: (error: Error | null, data?: any) => void) {
    const url = this.options.loadPath.replace('{{lng}}', language).replace('{{ns}}', namespace);

    fetch(url, { cache: 'no-store' })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch translations for ${language}`);
        }
        return response.json();
      })
      .then((data) => {
        callback(null, data);
      })
      .catch((error) => {
        console.error(`Error loading translations for ${language}:`, error);
        callback(error);
      });
  }
}

export default I18nextBackend;
