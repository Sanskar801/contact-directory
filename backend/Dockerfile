FROM eclipse-temurin:25-jdk-jammy AS build
WORKDIR /build

# Install Maven (to avoid relying on a Maven image tag that may not exist for Java 25)
RUN apt-get update \
    && apt-get install -y --no-install-recommends maven \
    && rm -rf /var/lib/apt/lists/*

# Pre-fetch dependencies to take advantage of Docker layer caching
COPY pom.xml .
RUN mvn -B -q dependency:go-offline

# Build the application
COPY src ./src
RUN mvn -B -q package -DskipTests


FROM eclipse-temurin:25-jre-jammy AS runtime
WORKDIR /app

# Copy the Spring Boot fat jar from the build stage
COPY --from=build /build/target/backend-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]


