package com.manunin.grapher.domain.fileparser.controller;

import com.manunin.grapher.domain.fileparser.dto.Link;
import com.manunin.grapher.domain.fileparser.service.FileParserService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@RestController
@RequestMapping("/file")
public class FileParserController {
    private final FileParserService fileParserService;

    public FileParserController(FileParserService fileParserService) {
        this.fileParserService = fileParserService;
    }

    @RequestMapping(value = "/upload", consumes = "multipart/form-data")
    public List<Link> uploadFile(MultipartFile file) throws IOException {
        InputStream fileInputStream = file.getInputStream();
        return fileParserService.parseFile(fileInputStream);
    }

}
