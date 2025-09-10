package com.example.demo.service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.OtpVerification;
import com.example.demo.repository.OtpRepository;

@Service
public class OtpService {

    @Autowired
    private OtpRepository otpRepository;

    private String generateOtp() {
        Random random = new Random();
        return String.format("%06d", random.nextInt(999999));
    }

    public String createOtp(String email) {
        String otp = generateOtp();
        OtpVerification entity = new OtpVerification();
        entity.setEmail(email);
        entity.setOtp(otp);
        entity.setExpiryTime(LocalDateTime.now().plusMinutes(5));
        entity.setVerified(false);
        otpRepository.save(entity);

        // TEMP: print OTP in backend console
        System.out.println("Generated OTP for " + email + " = " + otp);
        return otp;
    }

    public boolean verifyOtp(String email, String otp) {
        Optional<OtpVerification> record = otpRepository.findTopByEmailOrderByIdDesc(email);

        if (record.isPresent()) {
            OtpVerification entity = record.get();
            if (entity.getOtp().equals(otp) && entity.getExpiryTime().isAfter(LocalDateTime.now())) {
                entity.setVerified(true);
                otpRepository.save(entity);
                return true;
            }                  
        }
        return false;
    }
} 
