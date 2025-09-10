package com.example.demo.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.service.OtpService;

@RestController
@RequestMapping("/otp")
@CrossOrigin(origins = "http://localhost:3000") // allow React frontend
public class OtpController {

    @Autowired
    private OtpService otpService;

    @PostMapping("/generate")
    public Map<String, String> generateOtp(@RequestBody Map<String, String> req) {
        String email = req.get("email");
        otpService.createOtp(email);
        Map<String, String> response = new HashMap<>();
        response.put("message", "OTP sent to " + email);
        return response;
    }

    @PostMapping("/verify")
    public Map<String, String> verifyOtp(@RequestBody Map<String, String> req) {
        String email = req.get("email");
        String otp = req.get("otp");

        boolean isValid = otpService.verifyOtp(email, otp);
        Map<String, String> response = new HashMap<>();
        response.put("status", isValid ? "success" : "failed");
        return response;
    }
}
