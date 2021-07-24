# BUILD
FROM gradle:7.1.1-jdk11
WORKDIR /app/build
# copy all files
COPY . .
RUN gradle assemble
# RUN
FROM openjdk:13-alpine
# Setup user
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring
# Copy files
ARG JAR_FILE=build/libs/slidez-0.0.1-SNAPSHOT.jar
WORKDIR /app
COPY --from=0 /app/build/${JAR_FILE} app.jar
# Expose ports
EXPOSE 8000
# Run the app
ENTRYPOINT [ "java", "-jar", "app.jar" ]