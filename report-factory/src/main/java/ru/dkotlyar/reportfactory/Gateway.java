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

@Path("/report")
public class Gateway {

    @Inject
    ReportStore reportStore;

    @ConfigProperty(name="report.fileurl")
    String fileurl;

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
}