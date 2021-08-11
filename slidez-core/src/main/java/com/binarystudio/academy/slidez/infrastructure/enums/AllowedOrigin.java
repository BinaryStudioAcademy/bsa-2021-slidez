package com.binarystudio.academy.slidez.infrastructure.enums;

public enum AllowedOrigin {

	DEVELOP("http://localhost:3000"), PRODUCTION("http://bsa.slidez-fe-spa.s3-website-eu-west-1.amazonaws.com");

	private final String url;

	AllowedOrigin(String url) {
		this.url = url;
	}

	public static String[] getAllAllowedOrigins() {
		String[] out = new String[AllowedOrigin.values().length];
		for (int i = 0; i < AllowedOrigin.values().length; i++) {
			out[i] = AllowedOrigin.values()[i].url;
		}
		return out;
	}

}
