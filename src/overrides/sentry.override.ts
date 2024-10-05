import { getCurrentScope } from '@sentry/browser';
import { captureConsoleIntegration } from '@sentry/integrations';
import type { BrowserOptions } from '@sentry/react';
import {
    init,
    reactRouterV6BrowserTracingIntegration,
    replayIntegration
} from '@sentry/react';
import type { Integration } from '@sentry/types';
import { useEffect } from 'react';
import {
    createRoutesFromChildren,
    matchRoutes,
    useLocation,
    useNavigationType
} from 'react-router-dom';
import defaultConfig from '../config/default.json';

const RELEASE_VERSION = import.meta.env.VITE_RELEASE_VERSION || 'unknown';
const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT || 'development';


const SentryInit = () => {
    const options: BrowserOptions = {
        dsn: defaultConfig.sentry.dsn,
        tracesSampleRate: 1.0,
        replaysSessionSampleRate: 0.1,
        replaysOnErrorSampleRate: 0.1,
        release: RELEASE_VERSION,
        environment: ENVIRONMENT,
        enabled: Boolean(defaultConfig.env !== 'local') // Prevents new bugs while dev is typing
    };


        const integrations: Integration[] = [
            reactRouterV6BrowserTracingIntegration({
                useEffect,
                useLocation,
                useNavigationType,
                createRoutesFromChildren,
                matchRoutes
                // stripBasename
            }),
            replayIntegration(),
            captureConsoleIntegration({
                levels: ['error']
            })
        ];

        options.tracePropagationTargets = [config.host || 'localhost'];

        if (defaultConfig.env !== 'local') {
            integrations.push(
                captureConsoleIntegration({
                    levels: ['error', 'warn']
                })
            );
        }

        options.integrations = integrations;

        init(options);

        getCurrentScope().setTags({
            // eslint-disable-next-line camelcase
            // session_id: getSessionId(),
            // eslint-disable-next-line camelcase
            // browser_id: getBrowserId()
        });
    
};

SentryInit();

export * from '@sentry/react';
