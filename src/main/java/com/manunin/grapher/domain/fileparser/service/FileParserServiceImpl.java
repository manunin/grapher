package com.manunin.grapher.domain.fileparser.service;

import com.manunin.grapher.core.Node;
import com.manunin.grapher.domain.fileparser.dto.Link;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Component
public class FileParserServiceImpl implements FileParserService {
    @Override
    public List<Link> parseFile(InputStream file) {
        return processFileLines(file, FileParserServiceImpl::parse);
    }

    private static <T> T processFileLines(final InputStream file, final Function<Stream<String>, T> func) {
        try(BufferedReader reader = new BufferedReader(new InputStreamReader(file))) {
            return func.apply(reader.lines());
        } catch (IOException e) {
            throw new RuntimeException("Error while parsing file", e);
        }
    }

    private static List<Link> parse(final Stream<String> lines) {
        return lines
                .map(line -> line.split(","))
                .filter(parts -> parts.length == 4)
                .map(parts -> new Link(Long.parseLong(parts[0]), new Node(1L, parts[1]), new Node(2L, parts[2]), parts[3]))
                .collect(Collectors.toList());
    }
}
