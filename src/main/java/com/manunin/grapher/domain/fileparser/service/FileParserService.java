package com.manunin.grapher.domain.fileparser.service;

import com.manunin.grapher.core.Parser;
import com.manunin.grapher.domain.fileparser.dto.Link;

import java.io.InputStream;
import java.util.List;

public interface FileParserService extends Parser<List<Link>, InputStream> {
    List<Link> parseFile(InputStream file);
}
