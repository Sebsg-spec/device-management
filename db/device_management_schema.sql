-- ============================================================
-- Device Management System - Database Schema
-- DB: MS SQL Server (T-SQL)
-- ============================================================


USE DeviceManagement;
GO

-- ------------------------------------------------------------
-- Manufacturer
-- ------------------------------------------------------------
CREATE TABLE Manufacturer (
    Id              INT             IDENTITY(1,1)   PRIMARY KEY,
    Name            NVARCHAR(100)   NOT NULL UNIQUE
);
GO

-- ------------------------------------------------------------
-- OperatingSystem
-- ------------------------------------------------------------
CREATE TABLE OperatingSystem (
    Id              INT             IDENTITY(1,1)   PRIMARY KEY,
    Name            NVARCHAR(100)   NOT NULL UNIQUE
);
GO

-- ------------------------------------------------------------
-- Location
-- ------------------------------------------------------------
CREATE TABLE Location (
    Id              INT             IDENTITY(1,1)   PRIMARY KEY,
    Name            NVARCHAR(100)   NOT NULL,
    Address         NVARCHAR(200)   NULL,
    City            NVARCHAR(100)   NULL,
    Country         NVARCHAR(100)   NULL
);
GO

-- ------------------------------------------------------------
-- Device
-- ------------------------------------------------------------
CREATE TABLE Device (
    Id                  INT             IDENTITY(1,1)   PRIMARY KEY,
    Name                NVARCHAR(150)   NOT NULL,
    ManufacturerId      INT             NOT NULL,
    Type                NVARCHAR(20)    NOT NULL
                            CONSTRAINT CHK_Device_Type CHECK (Type IN ('Phone', 'Tablet')),
    OperatingSystemId   INT             NOT NULL,
    OSVersion           NVARCHAR(50)    NOT NULL,
    Processor           NVARCHAR(100)   NULL,
    RAM_MB              INT             NULL
                            CONSTRAINT CHK_Device_RAM CHECK (RAM_MB > 0),
    Description         NVARCHAR(500)   NULL,
    LocationId          INT             NULL,
    CreatedAt           DATETIME2       NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAt           DATETIME2       NOT NULL DEFAULT SYSUTCDATETIME(),

    CONSTRAINT FK_Device_Manufacturer   FOREIGN KEY (ManufacturerId)    REFERENCES Manufacturer(Id),
    CONSTRAINT FK_Device_OS             FOREIGN KEY (OperatingSystemId) REFERENCES OperatingSystem(Id),
    CONSTRAINT FK_Device_Location       FOREIGN KEY (LocationId)        REFERENCES Location(Id)
);
GO

-- ------------------------------------------------------------
-- User
-- ------------------------------------------------------------
CREATE TABLE [User] (
    Id              INT             IDENTITY(1,1)   PRIMARY KEY,
    Name            NVARCHAR(150)   NOT NULL,
    Role            NVARCHAR(100)   NOT NULL,
    Email           NVARCHAR(200)   NULL UNIQUE,
    LocationId      INT             NULL,
    CreatedAt       DATETIME2       NOT NULL DEFAULT SYSUTCDATETIME(),
	PasswordHash    VARCHAR(100)    NOT NULL

    CONSTRAINT FK_User_Location FOREIGN KEY (LocationId) REFERENCES Location(Id)
);
GO

-- ------------------------------------------------------------
-- DeviceAssignment  (tracks current + historical assignments)
-- Active assignment = ReturnedAt IS NULL
-- ------------------------------------------------------------
CREATE TABLE DeviceAssignment (
    Id              INT             IDENTITY(1,1)   PRIMARY KEY,
    DeviceId        INT             NOT NULL,
    UserId          INT             NOT NULL,
    AssignedAt      DATETIME2       NOT NULL DEFAULT SYSUTCDATETIME(),
    ReturnedAt      DATETIME2       NULL,

    CONSTRAINT FK_Assignment_Device FOREIGN KEY (DeviceId) REFERENCES Device(Id),
    CONSTRAINT FK_Assignment_User   FOREIGN KEY (UserId)   REFERENCES [User](Id),

    -- A device can only have one active assignment at a time
    CONSTRAINT UQ_Device_Active_Assignment UNIQUE (DeviceId, ReturnedAt)
);
GO

-- ------------------------------------------------------------
-- Indexes
-- ------------------------------------------------------------

-- Speed up lookups for the current holder of a device
CREATE INDEX IX_DeviceAssignment_DeviceId  ON DeviceAssignment (DeviceId, ReturnedAt);

-- Speed up all assignments for a user
CREATE INDEX IX_DeviceAssignment_UserId    ON DeviceAssignment (UserId);

-- Speed up device filtering by type, OS, manufacturer
CREATE INDEX IX_Device_Type                ON Device (Type);
CREATE INDEX IX_Device_ManufacturerId      ON Device (ManufacturerId);
CREATE INDEX IX_Device_OperatingSystemId   ON Device (OperatingSystemId);
CREATE INDEX IX_Device_LocationId          ON Device (LocationId);
GO

-- ------------------------------------------------------------
-- View: currently assigned devices
-- ------------------------------------------------------------
CREATE VIEW vw_CurrentAssignments AS
    SELECT
        d.Id            AS DeviceId,
        d.Name          AS DeviceName,
        d.Type          AS DeviceType,
        os.Name         AS OperatingSystem,
        d.OSVersion,
        m.Name          AS Manufacturer,
        u.Id            AS UserId,
        u.Name          AS UserName,
        u.Role          AS UserRole,
        l_user.City     AS UserCity,
        l_device.City   AS DeviceCity,
        da.AssignedAt
    FROM DeviceAssignment da
    INNER JOIN Device          d        ON da.DeviceId        = d.Id
    INNER JOIN [User]          u        ON da.UserId          = u.Id
    INNER JOIN Manufacturer    m        ON d.ManufacturerId   = m.Id
    INNER JOIN OperatingSystem os       ON d.OperatingSystemId= os.Id
    LEFT  JOIN Location        l_user   ON u.LocationId       = l_user.Id
    LEFT  JOIN Location        l_device ON d.LocationId       = l_device.Id
    WHERE da.ReturnedAt IS NULL;
GO

