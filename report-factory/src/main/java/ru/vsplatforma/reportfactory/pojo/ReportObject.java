package ru.vsplatforma.reportfactory.pojo;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
public class ReportObject implements Serializable {
    private String uuid;
    private String type;
    private String template;
    private String blob;
    private String fileName;
    private ReportState state = ReportState.New;
    private String error;

    @Id
    @GeneratedValue(generator="system-uuid")
    @GenericGenerator(name="system-uuid", strategy = "uuid")
    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getTemplate() {
        return template;
    }

    public void setTemplate(String template) {
        this.template = template;
    }

    @Lob
    public String getBlob() {
        return blob;
    }

    public void setBlob(String blob) {
        this.blob = blob;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public ReportState getState() {
        return state;
    }

    public void setState(ReportState state) {
        this.state = state;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ReportObject that = (ReportObject) o;
        return Objects.equals(uuid, that.uuid) &&
                Objects.equals(type, that.type) &&
                Objects.equals(template, that.template) &&
                Objects.equals(blob, that.blob) &&
                Objects.equals(fileName, that.fileName) &&
                state == that.state &&
                Objects.equals(error, that.error);
    }

    @Override
    public int hashCode() {
        return Objects.hash(uuid, type, template, blob, fileName, state, error);
    }

    @Override
    public String toString() {
        return "ReportRequest{" +
                "uuid='" + uuid + '\'' +
                ", type='" + type + '\'' +
                ", template='" + template + '\'' +
                ", blob='" + blob + '\'' +
                ", fileName='" + fileName + '\'' +
                ", state=" + state +
                ", error='" + error + '\'' +
                '}';
    }
}
