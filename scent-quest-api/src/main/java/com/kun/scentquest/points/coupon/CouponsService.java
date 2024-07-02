package com.kun.scentquest.points.coupon;

import com.kun.scentquest.email.EmailService;
import com.kun.scentquest.email.EmailTemplateName;
import com.kun.scentquest.points.site.Sites;
import com.kun.scentquest.points.site.SitesRepository;
import com.kun.scentquest.users.user.User;
import com.kun.scentquest.users.user.UserRepository;
import jakarta.mail.MessagingException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;

@Service
@AllArgsConstructor
public class CouponsService {

    private final CouponsRepository couponsRepository;
    private final SitesRepository sitesRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;

    public String generateCoupon(int siteId, int userId) throws MessagingException {
        String characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        StringBuilder codeBuilder = new StringBuilder();
        SecureRandom secureRandom = new SecureRandom();
        for (int i = 0; i < 8; i++) {
            int randomIndex = secureRandom.nextInt(characters.length());
            codeBuilder.append(characters.charAt(randomIndex));
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Sites site = sitesRepository.findById(siteId)
                .orElseThrow(() -> new RuntimeException("Site not found"));


        if(user.getPoints() >= site.getPrice()){
            user.setPoints(user.getPoints() - site.getPrice());
            userRepository.save(user);
        } else
            throw new RuntimeException("Not enough points");

        String generatedCode = codeBuilder.toString();
        Coupons coupon = Coupons.builder()
                .generatedCode(generatedCode)
                .createdAt(LocalDateTime.now())
                .expiresAt(LocalDateTime.now().plusDays(7))
                .userId(user.getId())
                .sitesId(site.getId())
                .site(site.getSite())
                .price(site.getPrice())
                .discount(site.getDiscount())
                .build();

        couponsRepository.save(coupon);
        sendDiscountCouponEmail(user.getEmail(), user.getFullName(), site.getDiscount().toString(), site.getSite(), generatedCode,site.getPrice().toString());
        return generatedCode;
    }

    private void sendDiscountCouponEmail(String email, String name, String discount, String site, String generated_code,String price) throws MessagingException {
        emailService.sendEmailDiscount(
                email,
                name,
                EmailTemplateName.DISCOUNT_COUPON,
                discount,
                generated_code,
                site,
                price,
                "Discount coupon"
        );
    }

}
