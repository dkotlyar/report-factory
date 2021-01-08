package ru.vsplatforma.reportfactory;

import java.io.IOException;

public class ProcessTest {
    public static void main(String[] args) throws IOException, InterruptedException {

        ProcessBuilder processBuilder = new ProcessBuilder();
        processBuilder.command("sh", "-c",
                "google-chrome --headless --disable-gpu --no-sandbox --disable-web-security " +
                        "--allow-file-access-from-files --no-margins --print-to-pdf-no-header " +
                        "--run-all-compositor-stages-before-draw --virtual-time-budget=100000 " +
                        "--print-to-pdf=reports/44d5e622-9a02-406d-9083-72f18ae3ff45.pdf " +
                        "http://localhost:4200/msks/44d5e622-9a02-406d-9083-72f18ae3ff45");

        Process process = processBuilder.start();
        process.waitFor();
    }
}
