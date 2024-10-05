import * as Sentry from "@sentry/react";
import defaultConfig from '../config/default.json';

const RELEASE_VERSION = import.meta.env.VITE_RELEASE_VERSION || 'unknown';
const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT || 'development';

Sentry.init({
    dsn: defaultConfig.sentry.dsn,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration(),
    ],
    release: RELEASE_VERSION,
    environment: ENVIRONMENT,
    tracesSampleRate: 1.0,
    tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  });