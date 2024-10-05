import { getCurrentScope } from "@sentry/browser";
import { captureConsoleIntegration } from "@sentry/integrations";
import type { BrowserOptions } from "@sentry/react";
import {
  init,
  reactRouterV6BrowserTracingIntegration,
  replayIntegration,
} from "@sentry/react";
import type { Integration } from "@sentry/types";
import defaultConfig from "config/default.json";
import { useEffect } from "react";
import {
  createRoutesFromChildren,
  matchRoutes,
  useLocation,
  useNavigationType,
} from "react-router-dom";

const SentryInit = () => {
  const options: BrowserOptions = {
    dsn: defaultConfig.sentry.dsn,
    release: defaultConfig.version,
    environment: defaultConfig.env,
    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 0.1,
    tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
    profilesSampleRate: 1.0,
  };

  const integrations: Integration[] = [
    reactRouterV6BrowserTracingIntegration({
      useEffect,
      useLocation,
      useNavigationType,
      createRoutesFromChildren,
      matchRoutes,
      // stripBasename
    }),
    replayIntegration(),
    captureConsoleIntegration({
      levels: ["error"],
    }),
  ];

  // options.tracePropagationTargets = [config.API_HOST || 'localhost'];

  if (defaultConfig.env !== "local") {
    integrations.push(
      captureConsoleIntegration({
        levels: ["error", "warn"],
      })
    );
  }

  options.integrations = integrations;

  init(options);

  getCurrentScope().setTags({
    version: defaultConfig.version,
    env: defaultConfig.env,
    // sessionId: () => {
    //   return Math.random().toString(36).substring(2, 15);
    // },
    // browserId: () => {
    //   return Math.random().toString(36).substring(2, 15);
    // },
  });
};

SentryInit();

export * from "@sentry/react";
