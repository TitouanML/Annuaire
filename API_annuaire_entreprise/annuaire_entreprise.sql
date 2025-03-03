CREATE TABLE site (
    id            INT AUTO_INCREMENT NOT NULL,
    city          VARCHAR(100) NOT NULL,
    name          VARCHAR(100) NOT NULL,
    zip_code      VARCHAR(100) NOT NULL,
    created_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at    DATETIME NULL,
    updated_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT site_PK PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE service (
    id           INT AUTO_INCREMENT NOT NULL,
    name         VARCHAR(100) NOT NULL UNIQUE,
    created_at   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at   DATETIME NULL,
    CONSTRAINT service_PK PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE employee (
    id                 INT AUTO_INCREMENT NOT NULL,
    last_name          VARCHAR(100) NOT NULL,
    first_name         VARCHAR(100) NOT NULL,
    landline_phone     VARCHAR(15),
    mobile_phone       VARCHAR(15),
    email              VARCHAR(255) NOT NULL UNIQUE,
    created_at         DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at         DATETIME NULL,
    updated_at         DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    service_id         INT NOT NULL,
    site_id            INT NOT NULL,
    CONSTRAINT employee_PK PRIMARY KEY (id),
    CONSTRAINT employee_service_FK FOREIGN KEY (service_id) REFERENCES service(id) ON DELETE CASCADE,
    CONSTRAINT employee_site_FK FOREIGN KEY (site_id) REFERENCES site(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE administrator (
    id           INT AUTO_INCREMENT NOT NULL,
    last_name    VARCHAR(100) NOT NULL,
    first_name   VARCHAR(100) NOT NULL,
    password     VARCHAR(255) NOT NULL,
    salt         VARCHAR(255) NOT NULL,
    email        VARCHAR(255) NOT NULL UNIQUE,
    created_at   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at   DATETIME NULL,
    CONSTRAINT administrator_PK PRIMARY KEY (id)
) ENGINE=InnoDB;
