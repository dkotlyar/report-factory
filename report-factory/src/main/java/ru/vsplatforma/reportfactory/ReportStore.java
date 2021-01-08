package ru.vsplatforma.reportfactory;

import ru.vsplatforma.reportfactory.pojo.ReportObject;
import ru.vsplatforma.reportfactory.pojo.ReportState;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.persistence.EntityManager;
import javax.ws.rs.ext.Provider;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
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
