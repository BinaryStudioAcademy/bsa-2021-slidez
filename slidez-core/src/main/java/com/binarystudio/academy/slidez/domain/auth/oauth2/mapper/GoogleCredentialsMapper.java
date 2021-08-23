package com.binarystudio.academy.slidez.domain.auth.oauth2.mapper;

import com.binarystudio.academy.slidez.domain.auth.oauth2.model.GoogleCredentials;
import com.google.api.client.auth.oauth2.StoredCredential;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.factory.Mappers;

@Mapper
public interface GoogleCredentialsMapper {

	GoogleCredentialsMapper INSTANCE = Mappers.getMapper(GoogleCredentialsMapper.class);

	@Mappings({ @Mapping(target = "accessToken", source = "credentials.accessToken"),
			@Mapping(target = "refreshToken", source = "credentials.refreshToken"),
			@Mapping(target = "expirationTimeMilliseconds", source = "credentials.expirationTimeMillis") })
	StoredCredential mapGoogleCredentialsToStoredCredentials(GoogleCredentials credentials);

	@Mappings({ @Mapping(source = "storedCredential.accessToken", target = "accessToken"),
			@Mapping(source = "storedCredential.refreshToken", target = "refreshToken"),
			@Mapping(source = "storedCredential.expirationTimeMilliseconds", target = "expirationTimeMillis") })
	GoogleCredentials mapStoredCredentialsToGoogleCredentials(StoredCredential storedCredential);

}
