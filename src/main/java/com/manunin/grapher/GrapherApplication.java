package com.manunin.grapher;

import com.manunin.grapher.readers.Reader;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

@SpringBootApplication
public class GrapherApplication {

	public static void main(String[] args) {
		ConfigurableApplicationContext run = SpringApplication.run(GrapherApplication.class, args);

		if (args.length != 1) {
			System.out.println("Usage: java -jar grapher-<VERSION>.jar <filename>");
			System.exit(1);
		}

		Reader reader = run.getBean(Reader.class);
		String content = reader.read(args[0]);
		System.out.println(content);
	}

}
