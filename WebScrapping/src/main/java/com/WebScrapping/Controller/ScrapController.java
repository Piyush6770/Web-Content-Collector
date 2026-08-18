package com.WebScrapping.Controller;

import com.WebScrapping.Model.ScrapResponse;
import com.WebScrapping.Service.ScraperService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@CrossOrigin(origins = "*")
@RestController
public class ScrapController {
    @Autowired
    private ScraperService scraperService;
    @GetMapping("/api/scrap")
    public ScrapResponse scrap(@RequestParam String url) throws IOException {
        return scraperService.webscrap(url);
    }
}
