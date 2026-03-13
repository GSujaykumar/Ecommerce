# Day 1: Project Setup & Spring Boot Basics

Welcome to Day 1! Today is all about laying the foundation. We are building a **Microservices Architecture**. This means instead of one huge application, we will have small, independent applications (services) that talk to each other.

## 🛠️ Prerequisites

Before we write code, ensure you have the following installed:

1.  **Java Development Kit (JDK)**: We recommend **JDK 17** or **JDK 21** (LTS versions).
    *   *Check*: Run `java -version` in your terminal.
2.  **Maven**: Use for building the project and managing dependencies.
    *   *Check*: Run `mvn -v` in your terminal.
3.  **IDE**: IntelliJ IDEA (Community Edition is fine) or VS Code (with "Extension Pack for Java").

## 📂 Project Structure

We will create a root folder called `ecommerce-backend`. This will act as a "Parent Project" to hold all our services.

Structure:
```text
ecommerce-backend/
├── pom.xml                   (Parent Maven configuration)
├── discovery-server/         (Day 12)
├── api-gateway/              (Day 14)
├── user-service/             (Day 3)
├── product-service/          (Day 4)
└── ...
```

## 🚀 Step-by-Step Implementation

### Step 1: Create the Root Directory
Create a folder named `ecommerce-backend` inside your project workspace.

### Step 2: Create the Parent Maven Project
In the root folder, we need a `pom.xml` file. This is the heart of a Maven project. It defines versions of libraries (dependencies) used across all our services so they stay consistent.

**Create a file named `pom.xml` in `ecommerce-backend/` with the following content:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.ecommerce</groupId>
    <artifactId>ecommerce-backend</artifactId>
    <version>1.0-SNAPSHOT</version>
    <packaging>pom</packaging>  <!-- IMPORTANT: This makes it a parent project -->

    <name>ecommerce-backend</name>
    <description>Parent project for Ecommerce Microservices</description>

    <properties>
        <java.version>17</java.version>
        <spring.boot.version>3.2.1</spring.boot.version>
        <spring.cloud.version>2023.0.0</spring.cloud.version>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
    </properties>

    <!-- Global Dependency Management -->
    <!-- This ensures all children usage the same versions -->
    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-dependencies</artifactId>
                <version>${spring.boot.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-dependencies</artifactId>
                <version>${spring.cloud.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>

    <dependencies>
        <!-- Lender Lombok to everyone (Optional but recommended) -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
    </dependencies>

</project>
```

### Explanation of `pom.xml`
- **`<packaging>pom</packaging>`**: This tells Maven that this project doesn't produce a `.jar` file itself, but aggregates other projects.
- **`dependencyManagement`**: We define the Spring Boot version (`3.2.1`) and Spring Cloud version here. When we create specific services later (like `product-service`), we won't need to specify version numbers, keeping everything strictly compatible.

## ✅ Verification
You have now set up the "Skeleton" of your backend.
1. Open this `ecommerce-backend` folder in your IDE.
2. It should be recognized as a Maven project.

That's it for Day 1! We have a clean slate ready for Day 2.
