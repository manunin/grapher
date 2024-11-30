package com.manunin.grapher.domain.fileparser.service;

import com.manunin.grapher.core.Node;
import com.manunin.grapher.domain.fileparser.dto.Link;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.beans.factory.annotation.Qualifier;
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

    private final ChatModel aiClient;

    public FileParserServiceImpl(@Qualifier("openAiChatModel") ChatModel chatModel) {
        this.aiClient = chatModel;
    }

    @Override
    public List<Link> parseFile(InputStream file) {
        String prompt = """
                Find all relationships of the type "%s" (the type means semantic meaning) in the text: "%s". Return result as a relationships of links in format:
               <id>,<source>,<target>,<type>. Each line in the text is a separate relationship.
               For example, if the text is "John resides in New York. Mary lives in Los Angeles." and the type is "lives in", the result should be:
                1,John,New York,lives in
                2,Mary,Los Angeles,lives in
               """;

        String text = processFileLines(file, FileParserServiceImpl::linesToText);
        String aiResponse = aiClient.call(String.format(prompt, "lives in", text));
        return parse(aiResponse.lines());
    }

    private static String linesToText(Stream<String> lines) {
        return lines.collect(Collectors.joining());
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
                .map(line -> line.trim().split(","))
                .filter(parts -> parts.length == 4)
                .map(parts -> new Link(Long.parseLong(parts[0].trim()), new Node(1L, parts[1].trim()),
                        new Node(2L, parts[2].trim()), parts[3].trim()))
                .collect(Collectors.toList());
    }
}
