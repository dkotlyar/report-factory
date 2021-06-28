package ru.dkotlyar.reportfactory;

import org.eclipse.microprofile.config.inject.ConfigProperty;
import ru.dkotlyar.reportfactory.pojo.ReportObject;
import ru.dkotlyar.reportfactory.pojo.ReportState;
import ru.dkotlyar.reportfactory.report.GetStatusReportResponse;
import ru.dkotlyar.reportfactory.report.RegisterReportResponse;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStreamReader;
import java.nio.file.Paths;

@Path("/report")
public class Gateway {

    @Inject
    ReportStore reportStore;

    @ConfigProperty(name="report.fileurl")
    String fileurl;
    @ConfigProperty(name = "report.path")
    String reportPath;

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.TEXT_PLAIN)
    @Path("/{type}/{template}")
    @Transactional
    public Response registerReport(@PathParam("type") String type,
                           @PathParam("template") String template,
                           String blob) {
        ReportObject reportObject = new ReportObject();
        reportObject.setType(type);
        reportObject.setTemplate(template);
        reportObject.setBlob(blob);

        String uuid = reportStore.push(reportObject);
        RegisterReportResponse registerReportResponse = new RegisterReportResponse();
        registerReportResponse.setUuid(uuid);

        return Response
                .ok(registerReportResponse)
                .build();
    }

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    @Path("/blob/{id}")
    @Transactional
    public Response getReportData(@PathParam("id") String id) {
        ReportObject reportObject = reportStore.get(id);

        if (reportObject == null) {
            return Response
                    .status(404)
                    .build();
        }

        return Response
                .ok(reportObject.getBlob())
                .build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/status/{id}")
    @Transactional
    public Response getStatusReport(@PathParam("id") String id, @HeaderParam("Origin") String origin) {
        ReportObject reportObject = reportStore.get(id);

        if (reportObject == null) {
            return Response
                    .status(404)
                    .build();
        }

        GetStatusReportResponse statusReportResponse = new GetStatusReportResponse();
        statusReportResponse.setUuid(reportObject.getUuid());
        statusReportResponse.setStatus(reportObject.getState().toString());

        statusReportResponse.setDuration((int)(reportObject.getGeneratingTime() / 1000));
        statusReportResponse.setStart(reportObject.getStartGenerating());
        statusReportResponse.setEnd(reportObject.getEndGenerating());

        if (reportObject.getState() == ReportState.Done) {
            statusReportResponse.setFilename(reportObject.getFileName());
            statusReportResponse.setUrl(fileurl + reportObject.getFileName());
        }
        if (reportObject.getState() == ReportState.Error) {
            statusReportResponse.setErrorMsg(reportObject.getError());
        }

        return Response
                .ok(statusReportResponse)
                .build();
    }

    @GET
    @Path("/files/{id}")
    @Produces(MediaType.APPLICATION_OCTET_STREAM)
    @Transactional
    public Response getFile(@PathParam("id") String id) {
        ReportObject reportObject = reportStore.get(id);

        if (reportObject == null) {
            return Response
                    .status(404)
                    .build();
        }

        try {
            File file = Paths.get(new File(reportPath).getAbsolutePath(), reportObject.getFileName()).toFile();
            if (file.exists()) {
                return Response
                        .ok(new FileInputStream(file), MediaType.APPLICATION_OCTET_STREAM)
                        .header("Content-Disposition", "attachment; filename=\"" + file.getName() + "\"")
                        .build();
            } else {
                return Response
                        .status(404)
                        .build();
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
            return Response
                    .status(500)
                    .build();
        }
    }
}