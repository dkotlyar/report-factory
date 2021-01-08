package ru.vsplatforma.reportfactory;

import org.eclipse.microprofile.config.inject.ConfigProperty;
import ru.vsplatforma.reportfactory.pojo.ReportObject;
import ru.vsplatforma.reportfactory.pojo.ReportState;
import ru.vsplatforma.reportfactory.report.GetStatusReportResponse;
import ru.vsplatforma.reportfactory.report.RegisterReportResponse;

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
    public String getReportData(@PathParam("id") String id) {
        return reportStore.get(id).getBlob();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/status/{id}")
    @Transactional
    public Response getStatusReport(@PathParam("id") String id, @HeaderParam("Origin") String origin) {
        ReportObject reportObject = reportStore.get(id);

        GetStatusReportResponse statusReportResponse = new GetStatusReportResponse();
        statusReportResponse.setUuid(reportObject.getUuid());
        statusReportResponse.setStatus(reportObject.getState().toString());

        if (reportObject.getState() == ReportState.Done) {
            statusReportResponse.setFile(fileurl + reportObject.getFileName());
        }
        if (reportObject.getState() == ReportState.Error) {
            statusReportResponse.setErrorMsg(reportObject.getError());
        }

        return Response
                .ok(statusReportResponse)
                .build();
    }
}