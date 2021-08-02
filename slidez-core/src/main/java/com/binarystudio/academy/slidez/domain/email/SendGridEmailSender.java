package com.binarystudio.academy.slidez.domain.email;

import com.binarystudio.academy.slidez.domain.email.dto.EmailMessageDto;
import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import com.sendgrid.helpers.mail.objects.MailSettings;
import com.sendgrid.helpers.mail.objects.Setting;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class SendGridEmailSender implements EmailSender {
    @Value("${sendgrid.api-key}")
    private String apiKey;
    @Value("${sendgrid.from-email}")
    private String fromEmail;

    @Override
    public boolean sendEmail(EmailMessageDto emailMessageDto) throws IOException {
        Mail mail = getMailFromDto(emailMessageDto);
        setSandboxMode(mail);
        Request request = getSendMailRequest(mail);
        Response response = sendMailRequest(request);

        // Logger in future
        System.out.println(response.getStatusCode());
        System.out.println(response.getBody());

        return true;
    }

    private Mail getMailFromDto(EmailMessageDto emailMessageDto) {
        Email from = new Email(fromEmail);
        Email to = new Email(emailMessageDto.getEmail());
        Content content = new Content("text/plain", emailMessageDto.getContent());
        return new Mail(from, emailMessageDto.getSubject(), to, content);
    }

    private static void setSandboxMode(Mail mail) {
        Setting enableSetting = new Setting();
        enableSetting.setEnable(true);
        MailSettings mailSettings = new MailSettings();
        mailSettings.setSandboxMode(enableSetting);
        mail.setMailSettings(mailSettings);
    }

    private static Request getSendMailRequest(Mail mail) throws IOException {
        Request request = new Request();
        request.setMethod(Method.POST);
        request.setEndpoint("mail/send");
        request.setBody(mail.build());
        return request;
    }

    private Response sendMailRequest(Request request) throws IOException {
        SendGrid sg = new SendGrid(apiKey);
        return sg.api(request);
    }
}
