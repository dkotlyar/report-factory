package ru.dkotlyar.reportfactory;

import io.quarkus.scheduler.Scheduled;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import ru.dkotlyar.reportfactory.pojo.ReportObject;
import ru.dkotlyar.reportfactory.pojo.ReportState;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.NotDirectoryException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.attribute.PosixFilePermission;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@ApplicationScoped
public class ReportScheduller {

    private Map<String, Process> processes = new HashMap<>();
    private File reportDir;

    @Inject
    ReportStore reportStore;

    @ConfigProperty(name = "report.weburl")
    String weburl;

    public ReportScheduller(@ConfigProperty(name = "report.path") String reportPath) throws NotDirectoryException {
        reportDir = new File(reportPath);

        boolean ok = true;
        if (!reportDir.exists()) {
            ok = reportDir.mkdirs();
        }
        ok = ok && reportDir.isDirectory();

        if (!ok) {
            throw new NotDirectoryException(reportDir.getAbsolutePath());
        }
    }

    @Scheduled(every = "10s")
    @Transactional
    void generateReport() {
        generateWebReport();
    }

    private void generateWebReport() {
        reportStore.filter(ReportState.New)
                .stream()
                .filter(reportObject -> reportObject.getType().toLowerCase().equals("web"))
                .forEach(reportObject -> {
                    reportObject.setState(ReportState.Generating);

                    String filename = generateFilename(reportObject, "pdf");
                    reportObject.setFileName(filename);

                    ProcessBuilder processBuilder = new ProcessBuilder();
                    processBuilder.directory(reportDir);
                    processBuilder.command("sh", "-c",
                            "chromium-browser --headless --disable-gpu --no-sandbox --disable-web-security " +
                                    "--allow-insecure-localhost --allow-file-access-from-files --no-margins " +
                                    "--print-to-pdf-no-header --no-first-run --disable-software-rasterizer " +
                                    "--disable-translate --disable-extensions --disable-setuid-sandbox " +
                                    "--run-all-compositor-stages-before-draw --virtual-time-budget=100000 " +
                                    "--print-to-pdf=" + reportObject.getFileName() + " " +
                                    weburl + reportObject.getTemplate() + "/" + reportObject.getUuid());
                    try {
                        Process process = processBuilder.start();
                        processes.put(reportObject.getUuid(), process);
                    } catch (IOException e) {
                        reportObject.setState(ReportState.Error);
                        reportObject.setError(e.getMessage());
                    }
                });

        processes.forEach((key, process) -> {
            if (!process.isAlive()) {
                ReportObject reportObject = reportStore.get(key);
                if (reportObject.getState() == ReportState.Generating) {
                    if (process.exitValue() == 0) {
                        Set<PosixFilePermission> perms = new HashSet<>();
                        perms.add(PosixFilePermission.OWNER_READ);
                        perms.add(PosixFilePermission.OWNER_WRITE);
                        perms.add(PosixFilePermission.GROUP_READ);
                        perms.add(PosixFilePermission.OTHERS_READ);

                        try {
                            Path path = Paths.get(reportDir.getAbsolutePath(), reportObject.getFileName());
                            Files.setPosixFilePermissions(path, perms);
                            reportObject.setState(ReportState.Done);
                        } catch (IOException e) {
                            reportObject.setState(ReportState.Error);
                            reportObject.setError(e.getMessage());
                        }
                    } else {
                        reportObject.setState(ReportState.Error);
                        reportObject.setError("Process finished with code " + process.exitValue());
                    }
                }
            }
        });
    }

    private String generateFilename(ReportObject reportObject, String ext) {
        return generateFilename(reportObject, ext, 0);
    }

    private String generateFilename(ReportObject reportObject, String ext, Integer iteration) {
        StringBuilder filename = new StringBuilder();
        filename.append(reportObject.getUuid());
        if (iteration > 0) {
            filename.append("-")
                    .append(String.format("%3d", iteration));
        }
        filename.append(".")
                .append(ext);

        File f = Paths.get(reportDir.getAbsolutePath(), filename.toString()).toFile();
        if (f.exists()) {
            return generateFilename(reportObject, ext, iteration + 1);
        }

        return filename.toString();
    }

}
