package com.WebScrapping.Service;

import com.WebScrapping.Model.ScrapResponse;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


@Service
public class ScraperService {

    public ScrapResponse webscrap(String url) throws IOException {
        Document doc = Jsoup.connect(url)
                .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36")
                .timeout(20000)
                .followRedirects(true)
                .get();
        List<String> images = new ArrayList<>();
        List<String> videos = new ArrayList<>();
        List<String> links = new ArrayList<>();

        for(Element img : doc.select("img")){
            String src = img.absUrl("src");
            if(!src.isEmpty()){
                images.add(src);
            }
        }
        for(Element video : doc.select("video")){
            String src = video.absUrl("src");
            if(!src.isEmpty()){
                videos.add(src);
            }
        }
        for(Element link : doc.select("a[href]")){
            String href = link.absUrl("href");
            if(!href.isEmpty()){
                links.add(href);
            }
        }

        ScrapResponse response = new ScrapResponse();
        response.setImages(images);
        response.setVideos(videos);
        response.setLinks(links);
        return response;

    }


}
