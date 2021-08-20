package com.binarystudio.academy.slidez.infrastructure.external_slide_service;

import com.binarystudio.academy.slidez.domain.auth.oauth2.GoogleOauthTokenManager;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.slides.v1.Slides;
import com.google.api.services.slides.v1.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
public class GoogleSlidesExternalPresentationService {
    private static final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();
    private static final HttpTransport TRANSPORT = new NetHttpTransport();
    private final GoogleOauthTokenManager tokenManager;

    @Autowired
    public GoogleSlidesExternalPresentationService(GoogleOauthTokenManager tokenManager) {
        this.tokenManager = tokenManager;
    }

    public String createSlide(UUID actorId, String presentationId, String slideId, String text) throws IOException {
        var tokens = tokenManager.getCredentialPairForUser(actorId)
            .orElseThrow(() -> new RuntimeException("Token pair for user not found"));

        var slides = new Slides.Builder(TRANSPORT, JSON_FACTORY, tokens).setApplicationName("Slidez").build();
        var textBoxId = "text_box_test";
        var pt350 = new Dimension().setMagnitude(350.0).setUnit("PT");
        var request = new BatchUpdatePresentationRequest();
        request.setRequests(
            List.of(
                new Request()
                    .setCreateSlide(
                        new CreateSlideRequest().setObjectId(slideId)
                    ),
                new Request()
                    .setCreateShape(new CreateShapeRequest()
                        .setObjectId(textBoxId)
                        .setShapeType("TEXT_BOX")
                        .setElementProperties(new PageElementProperties()
                            .setPageObjectId(slideId)
                            .setSize(new Size()
                                .setHeight(pt350)
                                .setWidth(pt350))
                            .setTransform(new AffineTransform()
                                .setScaleX(1.0)
                                .setScaleY(1.0)
                                .setTranslateX(10.0)
                                .setTranslateY(30.0)
                                .setUnit("PT")
                            )
                        )
                    ),
                new Request()
                    .setInsertText(new InsertTextRequest()
                        .setText(text)
                        .setObjectId(textBoxId)
                    )
            )
        );
        slides.presentations().batchUpdate(presentationId, request).execute();

        return slideId;
    }
}
