import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'

export function initSentry(dsn: string) {
    Sentry.init({
        dsn: dsn,
        integrations: [new Integrations.BrowserTracing()],

        // We recommend adjusting this value in production, or using tracesSampler
        // for finer control
        tracesSampleRate: 1.0,
    })
}
