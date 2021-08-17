package com.binarystudio.academy.slidez.infrastructure.sentry;

import io.sentry.spring.EnableSentry;
import org.springframework.context.annotation.Configuration;

@Configuration
// use property from properties or empty string to disable sentry
@EnableSentry(dsn = "${sentry.dsn:#{\"\"}}")
public class SentryConfig {

}
