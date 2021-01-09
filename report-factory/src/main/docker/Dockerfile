FROM maven:3.6.0-jdk-11-slim

RUN mvn -v
RUN java -version

USER root

RUN apt update && \
    apt install -y chromium libreoffice sshpass

RUN ln -s /usr/bin/chromium /usr/bin/chromium-browser

RUN mkdir /jar
RUN mkdir -p /usr/local/dkotlyar/reports/REPORTS
RUN mkdir -p /usr/local/dkotlyar/reports/output
RUN mkdir -p /root/.local/share/fonts

COPY ./target/report-factory-1.0.0-SNAPSHOT-runner.jar /jar
COPY ./target/lib /jar/lib

CMD java -jar -Xmx3500m /jar/report-factory-1.0.0-SNAPSHOT-runner.jar