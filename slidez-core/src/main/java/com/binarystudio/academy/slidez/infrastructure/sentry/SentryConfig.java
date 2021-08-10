package com.binarystudio.academy.slidez.infrastructure.sentry;

import io.sentry.Sentry;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@Log4j2
public class SentryConfig implements InitializingBean {

	@Value("${sentry.dsn:#{null}}")
	private String sentryDsn;

	@Value("${sentry.in-app-includes:#{null}}")
	private String inAppIncludes;

	@Override
	public void afterPropertiesSet() throws Exception {
		if (this.sentryDsn == null) {
			log.warn("Sentry DSN is not set, failed to initialize Sentry");
			return;
		}
		if (this.inAppIncludes == null) {
			log.warn("Sentry in-app-includes is not set, failed to initialize Sentry");
			return;
		}

		Sentry.init();
	}

}
