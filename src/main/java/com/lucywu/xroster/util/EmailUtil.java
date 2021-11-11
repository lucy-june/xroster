/*******************************************************************************
 * Copyright (c) 2018-2026 lucywu.com
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     Lucy Wu - initial API and implementation
 *******************************************************************************/

package com.lucywu.xroster.util;

import java.util.*;
import javax.mail.*;
import javax.mail.internet.*;
import javax.activation.*;

/**
 * Created by lucy on 4/21/2018.
 */
public class EmailUtil {

//    public static void main(String[] args) {
//        sendEmail("981088636@qq.com","[校悉网]账户密码","qwe234");
//    }

    public static boolean sendEmail(String receiver, String subject, String text){
        final String SSL_FACTORY = "javax.net.ssl.SSLSocketFactory";
        // Get a Properties object
        Properties props = System.getProperties();
        props.setProperty("mail.smtp.host", "smtp.qq.com");
        props.setProperty("mail.smtp.socketFactory.class", SSL_FACTORY);
        props.setProperty("mail.smtp.socketFactory.fallback", "false");
        props.setProperty("mail.smtp.port", "465");
        props.setProperty("mail.smtp.socketFactory.port", "465");
        props.put("mail.smtp.auth", "true");
        props.put("mail.debug", "true");
        props.put("mail.store.protocol", "pop3");
        props.put("mail.transport.protocol", "smtp");
        final String email = "shuimuyanyuan@qq.com";
        final String password = "qetuoadgjlzcbm";
        try {
            Session session = Session.getDefaultInstance(props,
                    new Authenticator() {
                        protected PasswordAuthentication getPasswordAuthentication() {
                            return new PasswordAuthentication(email, password);
                        }
                    });

            // -- Create a new message --
            Message msg = new MimeMessage(session);

            // -- Set the FROM and TO fields --
            msg.setFrom(new InternetAddress(email));
            msg.setRecipients(Message.RecipientType.TO,
                    InternetAddress.parse(receiver, false));
            msg.setSubject(subject);
            msg.setText(text);
            msg.setSentDate(new Date());
            Transport.send(msg);
            System.out.println("Message sent."+receiver);
            return true;
        } catch (MessagingException e) {
            System.out.println("Error send email, cause: " + e);
            return false;
        }
    }

}
