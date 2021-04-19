package ru.dkotlyar.reportfactory.pojo;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
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
    private Date startGenerating;
    private Date endGenerating;

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

        if (state == ReportState.Generating) {
            this.setStartGenerating(new Date());
        } else if (state == ReportState.Error || state == ReportState.Done) {
            this.setEndGenerating(new Date());
        }
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public Date getStartGenerating() {
        return startGenerating;
    }

    public void setStartGenerating(Date startGenerating) {
        this.startGenerating = startGenerating;
    }

    public Date getEndGenerating() {
        return endGenerating;
    }

    public void setEndGenerating(Date endGenerating) {
        this.endGenerating = endGenerating;
    }

    @Transient
    public Long getGeneratingTime() {
        if (this.startGenerating == null || this.endGenerating == null) {
            return Long.valueOf(0);
        }

        return this.endGenerating.getTime() - this.startGenerating.getTime();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ReportObject that = (ReportObject) o;
        return Objects.equals(uuid, that.uuid) && Objects.equals(type, that.type) && Objects.equals(template, that.template) && Objects.equals(blob, that.blob) && Objects.equals(fileName, that.fileName) && state == that.state && Objects.equals(error, that.error) && Objects.equals(startGenerating, that.startGenerating) && Objects.equals(endGenerating, that.endGenerating);
    }

    @Override
    public int hashCode() {
        return Objects.hash(uuid, type, template, blob, fileName, state, error, startGenerating, endGenerating);
    }

    @Override
    public String toString() {
        return "ReportObject{" +
                "uuid='" + uuid + '\'' +
                ", type='" + type + '\'' +
                ", template='" + template + '\'' +
                ", blob='" + blob + '\'' +
                ", fileName='" + fileName + '\'' +
                ", state=" + state +
                ", error='" + error + '\'' +
                ", startGenerating=" + startGenerating +
                ", endGenerating=" + endGenerating +
                '}';
    }
}
