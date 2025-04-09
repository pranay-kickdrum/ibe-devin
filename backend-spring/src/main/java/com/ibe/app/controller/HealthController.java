package com.ibe.app.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.Map;

@RestController
public class HealthController {

    /**
     * Health check endpoint that returns a status of "ok".
     * This matches the FastAPI endpoint in the original backend.
     */
    @GetMapping("/healthz")
    public Map<String, String> healthz() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "ok");
        return response;
    }
}
