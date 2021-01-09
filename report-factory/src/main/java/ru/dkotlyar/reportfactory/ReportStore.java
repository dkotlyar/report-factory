package ru.dkotlyar.reportfactory;

import ru.dkotlyar.reportfactory.pojo.ReportObject;
import ru.dkotlyar.reportfactory.pojo.ReportState;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.persistence.EntityManager;
import javax.ws.rs.ext.Provider;
import java.util.*;

@Singleton
@Provider
public class ReportStore {
    @Inject
    EntityManager em;

    public String push(ReportObject reportObject) {
        em.persist(reportObject);
        return reportObject.getUuid();
    }

    public ReportObject get(String uuid) {
        return em.find(ReportObject.class, uuid);
    }

    public Collection<ReportObject> filter(ReportState reportState) {
        return em.createQuery("SELECT r FROM ReportObject r " +
                "where r.state=:state", ReportObject.class)
                .setParameter("state", reportState)
                .getResultList();
    }
}
