-- ============================================================
-- Device Management System - Dummy Data
-- ============================================================

USE DeviceManagement;
GO

-- ------------------------------------------------------------
-- Manufacturers (10)
-- ------------------------------------------------------------
INSERT INTO Manufacturer (Name) VALUES
    ('Apple'),
    ('Samsung'),
    ('Google'),
    ('Microsoft'),
    ('OnePlus'),
    ('Xiaomi'),
    ('Sony'),
    ('Motorola'),
    ('Huawei'),
    ('ASUS');
GO

-- ------------------------------------------------------------
-- Operating Systems (6)
-- ------------------------------------------------------------
INSERT INTO OperatingSystem (Name) VALUES
    ('iOS'),
    ('Android'),
    ('Windows'),
    ('HarmonyOS'),
    ('GrapheneOS'),
    ('iPadOS');
GO

-- ------------------------------------------------------------
-- Locations (12)
-- ------------------------------------------------------------
INSERT INTO Location (Name, Address, City, Country) VALUES
    ('HQ - Main Office',         '1 Innovation Drive',      'New York',       'USA'),
    ('Branch - West Coast',      '500 Silicon Ave',         'San Francisco',  'USA'),
    ('Branch - Texas',           '300 Lone Star Blvd',      'Austin',         'USA'),
    ('Branch - London',          '10 Thames Street',        'London',         'UK'),
    ('Branch - Berlin',          '22 Unter den Linden',     'Berlin',         'Germany'),
    ('Branch - Paris',           '5 Rue de Rivoli',         'Paris',          'France'),
    ('Branch - Tokyo',           '1-1 Marunouchi',          'Tokyo',          'Japan'),
    ('Branch - Sydney',          '88 George Street',        'Sydney',         'Australia'),
    ('Branch - Toronto',         '200 Bay Street',          'Toronto',        'Canada'),
    ('Branch - Dubai',           'Sheikh Zayed Road 14',    'Dubai',          'UAE'),
    ('Warehouse - Storage NJ',   '99 Depot Lane',           'Newark',         'USA'),
    ('Warehouse - Storage EU',   '7 Logistics Park',        'Amsterdam',      'Netherlands');
GO

-- ------------------------------------------------------------
-- Users (40)
-- ------------------------------------------------------------
INSERT INTO [User] (Name, Role, Email, LocationId) VALUES
    ('Alice Johnson',       'Software Engineer',        'alice.johnson@company.com',        1),
    ('Bob Martinez',        'Product Manager',          'bob.martinez@company.com',         1),
    ('Carol White',         'UX Designer',              'carol.white@company.com',          1),
    ('David Brown',         'DevOps Engineer',          'david.brown@company.com',          1),
    ('Eve Davis',           'QA Engineer',              'eve.davis@company.com',            1),
    ('Frank Wilson',        'Backend Developer',        'frank.wilson@company.com',         2),
    ('Grace Lee',           'Frontend Developer',       'grace.lee@company.com',            2),
    ('Henry Taylor',        'Data Scientist',           'henry.taylor@company.com',         2),
    ('Isla Anderson',       'Cloud Architect',          'isla.anderson@company.com',        2),
    ('James Thomas',        'Security Analyst',         'james.thomas@company.com',         2),
    ('Karen Jackson',       'Software Engineer',        'karen.jackson@company.com',        3),
    ('Liam Harris',         'Mobile Developer',         'liam.harris@company.com',          3),
    ('Mia Martin',          'Scrum Master',             'mia.martin@company.com',           3),
    ('Noah Garcia',         'Systems Administrator',    'noah.garcia@company.com',          3),
    ('Olivia Clark',        'Business Analyst',         'olivia.clark@company.com',         3),
    ('Paul Lewis',          'Software Engineer',        'paul.lewis@company.com',           4),
    ('Quinn Robinson',      'Tech Lead',                'quinn.robinson@company.com',       4),
    ('Rachel Walker',       'Product Owner',            'rachel.walker@company.com',        4),
    ('Sam Hall',            'QA Engineer',              'sam.hall@company.com',             4),
    ('Tina Allen',          'UX Designer',              'tina.allen@company.com',           4),
    ('Uma Young',           'Backend Developer',        'uma.young@company.com',            5),
    ('Victor Hernandez',    'DevOps Engineer',          'victor.hernandez@company.com',     5),
    ('Wendy King',          'Data Analyst',             'wendy.king@company.com',           5),
    ('Xander Wright',       'Mobile Developer',         'xander.wright@company.com',        5),
    ('Yara Lopez',          'Software Engineer',        'yara.lopez@company.com',           5),
    ('Zane Scott',          'Cloud Engineer',           'zane.scott@company.com',           6),
    ('Amy Green',           'Frontend Developer',       'amy.green@company.com',            6),
    ('Brian Adams',         'Security Engineer',        'brian.adams@company.com',          6),
    ('Chloe Baker',         'Software Engineer',        'chloe.baker@company.com',          7),
    ('Daniel Carter',       'Systems Administrator',    'daniel.carter@company.com',        7),
    ('Elena Mitchell',      'Data Scientist',           'elena.mitchell@company.com',       7),
    ('Felix Perez',         'Backend Developer',        'felix.perez@company.com',          8),
    ('Gina Roberts',        'Product Manager',          'gina.roberts@company.com',         8),
    ('Hank Turner',         'Mobile Developer',         'hank.turner@company.com',          8),
    ('Iris Phillips',       'QA Engineer',              'iris.phillips@company.com',        9),
    ('Jack Campbell',       'Tech Lead',                'jack.campbell@company.com',        9),
    ('Kylie Parker',        'UX Designer',              'kylie.parker@company.com',         9),
    ('Leo Evans',           'Software Engineer',        'leo.evans@company.com',           10),
    ('Maya Edwards',        'Cloud Architect',          'maya.edwards@company.com',        10),
    ('Nolan Collins',       'DevOps Engineer',          'nolan.collins@company.com',        1);
GO

-- ------------------------------------------------------------
-- Devices (60)
-- ------------------------------------------------------------
INSERT INTO Device (Name, ManufacturerId, Type, OperatingSystemId, OSVersion, Processor, RAM_MB, Description, LocationId) VALUES

-- Apple iPhones (OS: iOS = 1, Manufacturer: Apple = 1)
('iPhone 15 Pro',           1, 'Phone',   1, '17.4',     'Apple A17 Pro',        8192,   'Flagship iPhone with titanium frame',                          1),
('iPhone 15',               1, 'Phone',   1, '17.4',     'Apple A16 Bionic',     6144,   'Standard iPhone 15 model',                                     1),
('iPhone 14 Pro Max',       1, 'Phone',   1, '17.3',     'Apple A15 Bionic',     6144,   'Previous gen flagship, large screen',                          2),
('iPhone 14',               1, 'Phone',   1, '17.2',     'Apple A15 Bionic',     6144,   'Standard iPhone 14',                                           3),
('iPhone 13 Pro',           1, 'Phone',   1, '16.7',     'Apple A15 Bionic',     6144,   'Older flagship with ProMotion display',                        4),
('iPhone 13',               1, 'Phone',   1, '16.5',     'Apple A15 Bionic',     4096,   'Standard iPhone 13, good battery life',                        5),
('iPhone SE (3rd gen)',      1, 'Phone',   1, '17.1',     'Apple A15 Bionic',     4096,   'Compact budget iPhone',                                        11),

-- Apple iPads (OS: iPadOS = 6, Manufacturer: Apple = 1)
('iPad Pro 12.9 M2',        1, 'Tablet',  6, '17.4',     'Apple M2',             16384,  'High-end tablet for creative work',                            1),
('iPad Pro 11 M2',          1, 'Tablet',  6, '17.4',     'Apple M2',             8192,   'Compact pro tablet',                                           2),
('iPad Air 5th Gen',        1, 'Tablet',  6, '17.2',     'Apple M1',             8192,   'Mid-range iPad with M1 chip',                                  3),
('iPad 10th Gen',           1, 'Tablet',  6, '17.1',     'Apple A14 Bionic',     4096,   'Standard iPad, great for everyday tasks',                      4),
('iPad Mini 6th Gen',       1, 'Tablet',  6, '17.0',     'Apple A15 Bionic',     4096,   'Compact tablet for field work',                                5),

-- Samsung Galaxy Phones (OS: Android = 2, Manufacturer: Samsung = 2)
('Galaxy S24 Ultra',        2, 'Phone',   2, 'Android 14','Snapdragon 8 Gen 3',  12288,  'Top-tier Samsung with S Pen',                                  1),
('Galaxy S24+',             2, 'Phone',   2, 'Android 14','Snapdragon 8 Gen 3',  12288,  'Large premium Galaxy phone',                                   2),
('Galaxy S24',              2, 'Phone',   2, 'Android 14','Snapdragon 8 Gen 3',  8192,   'Standard Galaxy S24',                                          3),
('Galaxy S23 FE',           2, 'Phone',   2, 'Android 13','Snapdragon 8 Gen 1',  8192,   'Fan Edition, great value flagship',                            4),
('Galaxy A55',              2, 'Phone',   2, 'Android 14','Exynos 1480',         8192,   'Mid-range Samsung device',                                     5),
('Galaxy A35',              2, 'Phone',   2, 'Android 14','Exynos 1380',         6144,   'Budget-friendly Samsung phone',                                11),
('Galaxy Z Flip 5',         2, 'Phone',   2, 'Android 14','Snapdragon 8 Gen 2',  8192,   'Foldable flip phone',                                          6),
('Galaxy Z Fold 5',         2, 'Phone',   2, 'Android 14','Snapdragon 8 Gen 2',  12288,  'Large foldable phone/tablet hybrid',                           7),

-- Samsung Galaxy Tablets (OS: Android = 2, Manufacturer: Samsung = 2)
('Galaxy Tab S9 Ultra',     2, 'Tablet',  2, 'Android 14','Snapdragon 8 Gen 2',  12288,  'Premium large Android tablet',                                 1),
('Galaxy Tab S9+',          2, 'Tablet',  2, 'Android 14','Snapdragon 8 Gen 2',  12288,  'High-end mid-size tablet',                                     2),
('Galaxy Tab S9 FE',        2, 'Tablet',  2, 'Android 13','Exynos 1380',         6144,   'Fan Edition tablet, value pick',                               8),
('Galaxy Tab A9+',          2, 'Tablet',  2, 'Android 13','Snapdragon 695',      4096,   'Budget Android tablet',                                        11),

-- Google Pixel Phones (OS: Android = 2 / GrapheneOS = 5, Manufacturer: Google = 3)
('Pixel 8 Pro',             3, 'Phone',   2, 'Android 14','Google Tensor G3',    12288,  'Flagship Pixel with AI features',                              1),
('Pixel 8',                 3, 'Phone',   2, 'Android 14','Google Tensor G3',    8192,   'Standard Pixel 8',                                             2),
('Pixel 7a',                3, 'Phone',   2, 'Android 14','Google Tensor G2',    8192,   'Mid-range Pixel, excellent camera',                            3),
('Pixel 8 Pro (Secure)',    3, 'Phone',   5, '14.0',      'Google Tensor G3',    12288,  'Pixel 8 Pro running GrapheneOS for security team',             4),
('Pixel Tablet',            3, 'Tablet',  2, 'Android 14','Google Tensor G2',    8192,   'Google tablet with dock speaker',                              5),

-- Microsoft Surface (OS: Windows = 3, Manufacturer: Microsoft = 4)
('Surface Pro 9',           4, 'Tablet',  3, 'Windows 11','Intel Core i7-1265U', 16384,  '2-in-1 Windows tablet for executives',                         1),
('Surface Pro 9 (i5)',      4, 'Tablet',  3, 'Windows 11','Intel Core i5-1235U', 8192,   'Surface Pro 9 entry level',                                    2),
('Surface Duo 2',           4, 'Phone',   2, 'Android 12','Snapdragon 888',      8192,   'Dual screen Android device from Microsoft',                    9),

-- OnePlus (OS: Android = 2, Manufacturer: OnePlus = 5)
('OnePlus 12',              5, 'Phone',   2, 'Android 14','Snapdragon 8 Gen 3',  12288,  'Flagship OnePlus with fast charging',                          6),
('OnePlus 12R',             5, 'Phone',   2, 'Android 14','Snapdragon 8 Gen 1',  8192,   'Value flagship OnePlus',                                       7),
('OnePlus Nord 4',          5, 'Phone',   2, 'Android 14','Snapdragon 7+ Gen 3', 8192,   'Mid-range OnePlus device',                                     8),

-- Xiaomi (OS: Android = 2, Manufacturer: Xiaomi = 6)
('Xiaomi 14 Ultra',         6, 'Phone',   2, 'Android 14','Snapdragon 8 Gen 3',  16384,  'Top Xiaomi flagship with Leica camera',                        5),
('Xiaomi 14',               6, 'Phone',   2, 'Android 14','Snapdragon 8 Gen 3',  12288,  'Standard Xiaomi 14',                                           6),
('Xiaomi Pad 6 Pro',        6, 'Tablet',  2, 'Android 13','Snapdragon 8+ Gen 1', 8192,   'High-end Xiaomi tablet',                                       7),
('Redmi Note 13 Pro',       6, 'Phone',   2, 'Android 13','Snapdragon 7s Gen 2', 8192,   'Popular mid-range device',                                     11),

-- Sony (OS: Android = 2, Manufacturer: Sony = 7)
('Xperia 1 VI',             7, 'Phone',   2, 'Android 14','Snapdragon 8 Gen 3',  12288,  'Sony flagship with 4K display',                                8),
('Xperia 5 V',              7, 'Phone',   2, 'Android 13','Snapdragon 8 Gen 2',  8192,   'Compact Sony flagship',                                        9),
('Xperia 10 VI',            7, 'Phone',   2, 'Android 14','Snapdragon 6 Gen 1',  6144,   'Mid-range Sony device',                                        10),

-- Motorola (OS: Android = 2, Manufacturer: Motorola = 8)
('Motorola Edge 50 Pro',    8, 'Phone',   2, 'Android 14','Snapdragon 7 Gen 3',  12288,  'Premium Motorola Edge device',                                 3),
('Motorola Edge 40',        8, 'Phone',   2, 'Android 13','Dimensity 8020',      8192,   'Mid-range Edge phone',                                         4),
('Moto G84',                8, 'Phone',   2, 'Android 13','Snapdragon 695',      12288,  'Budget-friendly Motorola',                                     11),

-- Huawei (OS: HarmonyOS = 4, Manufacturer: Huawei = 9)
('Huawei Mate 60 Pro',      9, 'Phone',   4, 'HarmonyOS 4', 'Kirin 9000S',       12288,  'Huawei flagship with satellite calling',                       10),
('Huawei P60 Pro',          9, 'Phone',   4, 'HarmonyOS 3', 'Snapdragon 8+ Gen 1',12288, 'Camera-focused Huawei flagship',                               10),
('MatePad Pro 13.2',        9, 'Tablet',  4, 'HarmonyOS 4', 'Kirin 9000S',       12288,  'Huawei premium tablet',                                        12),

-- ASUS (OS: Android = 2, Manufacturer: ASUS = 10)
('ROG Phone 8 Pro',        10, 'Phone',   2, 'Android 14','Snapdragon 8 Gen 3',  16384,  'Gaming-focused smartphone',                                     2),
('ROG Phone 8',            10, 'Phone',   2, 'Android 14','Snapdragon 8 Gen 3',  12288,  'Gaming phone standard edition',                                 3),
('ZenFone 10',             10, 'Phone',   2, 'Android 13','Snapdragon 8 Gen 2',  8192,   'Compact flagship from ASUS',                                    4),
('ASUS Zenpad 10',         10, 'Tablet',  2, 'Android 13','Snapdragon 680',      4096,   'Budget ASUS tablet for general use',                           11);
GO

-- ------------------------------------------------------------
-- Device Assignments (active + historical)
-- Active = ReturnedAt IS NULL
-- ------------------------------------------------------------

-- Active assignments
INSERT INTO DeviceAssignment (DeviceId, UserId, AssignedAt, ReturnedAt) VALUES
(1,  1,  '2024-01-10 09:00:00', NULL),   -- iPhone 15 Pro → Alice
(2,  2,  '2024-01-12 10:00:00', NULL),   -- iPhone 15 → Bob
(3,  3,  '2024-02-01 08:30:00', NULL),   -- iPhone 14 Pro Max → Carol
(4,  4,  '2024-02-05 09:15:00', NULL),   -- iPhone 14 → David
(5,  5,  '2024-03-01 10:00:00', NULL),   -- iPhone 13 Pro → Eve
(8,  6,  '2024-01-20 09:00:00', NULL),   -- iPad Pro 12.9 → Frank
(9,  7,  '2024-01-22 10:30:00', NULL),   -- iPad Pro 11 → Grace
(10, 8,  '2024-02-10 09:00:00', NULL),   -- iPad Air → Henry
(13, 9,  '2024-02-15 11:00:00', NULL),   -- Galaxy S24 Ultra → Isla
(14, 10, '2024-03-01 09:30:00', NULL),   -- Galaxy S24+ → James
(15, 11, '2024-03-05 10:00:00', NULL),   -- Galaxy S24 → Karen
(16, 12, '2024-03-10 09:00:00', NULL),   -- Galaxy S23 FE → Liam
(17, 13, '2024-03-15 08:45:00', NULL),   -- Galaxy A55 → Mia
(21, 14, '2024-01-25 09:00:00', NULL),   -- Galaxy Tab S9 Ultra → Noah
(22, 15, '2024-02-01 10:00:00', NULL),   -- Galaxy Tab S9+ → Olivia
(25, 16, '2024-02-20 09:00:00', NULL),   -- Pixel 8 Pro → Paul
(26, 17, '2024-02-22 10:15:00', NULL),   -- Pixel 8 → Quinn
(27, 18, '2024-03-01 09:00:00', NULL),   -- Pixel 7a → Rachel
(28, 19, '2024-01-15 08:00:00', NULL),   -- Pixel 8 Pro Secure → Sam
(30, 20, '2024-01-18 09:30:00', NULL),   -- Surface Pro 9 → Tina
(31, 21, '2024-02-05 10:00:00', NULL),   -- Surface Pro 9 i5 → Uma
(33, 22, '2024-02-08 09:00:00', NULL),   -- OnePlus 12 → Victor
(34, 23, '2024-03-01 10:30:00', NULL),   -- OnePlus 12R → Wendy
(36, 24, '2024-03-05 09:00:00', NULL),   -- Xiaomi 14 Ultra → Xander
(37, 25, '2024-03-10 10:00:00', NULL),   -- Xiaomi 14 → Yara
(38, 26, '2024-01-30 09:15:00', NULL),   -- Xiaomi Pad 6 Pro → Zane
(40, 27, '2024-02-12 10:00:00', NULL),   -- Xperia 1 VI → Amy
(41, 28, '2024-02-15 09:30:00', NULL),   -- Xperia 5 V → Brian
(43, 29, '2024-02-20 09:00:00', NULL),   -- Motorola Edge 50 Pro → Chloe
(44, 30, '2024-03-01 10:00:00', NULL),   -- Motorola Edge 40 → Daniel
(46, 31, '2024-01-20 09:00:00', NULL),   -- Huawei Mate 60 Pro → Elena
(47, 32, '2024-01-22 10:00:00', NULL),   -- Huawei P60 Pro → Felix
(49, 33, '2024-02-01 09:00:00', NULL),   -- ROG Phone 8 Pro → Gina
(50, 34, '2024-02-05 10:15:00', NULL),   -- ROG Phone 8 → Hank
(51, 35, '2024-03-01 09:30:00', NULL),   -- ZenFone 10 → Iris
(29, 36, '2024-03-10 10:00:00', NULL),   -- Pixel Tablet → Jack
(11, 37, '2024-03-12 09:00:00', NULL),   -- iPad 10th Gen → Kylie
(35, 38, '2024-03-15 10:30:00', NULL),   -- OnePlus Nord 4 → Leo
(48, 39, '2024-02-18 09:00:00', NULL),   -- MatePad Pro → Maya
(32, 40, '2024-02-25 10:00:00', NULL);   -- Surface Duo 2 → Nolan
GO

-- Historical assignments (returned)
INSERT INTO DeviceAssignment (DeviceId, UserId, AssignedAt, ReturnedAt) VALUES
-- Previous assignments before current holders
(1,  3,  '2023-06-01 09:00:00', '2024-01-09 17:00:00'),  -- iPhone 15 Pro was with Carol
(13, 5,  '2023-07-01 09:00:00', '2024-02-14 17:00:00'),  -- Galaxy S24 Ultra was with Eve
(25, 2,  '2023-08-01 09:00:00', '2024-02-19 17:00:00'),  -- Pixel 8 Pro was with Bob
(30, 1,  '2023-09-01 09:00:00', '2024-01-17 17:00:00'),  -- Surface Pro 9 was with Alice
(8,  10, '2023-05-01 09:00:00', '2024-01-19 17:00:00'),  -- iPad Pro was with James
(21, 7,  '2023-06-15 09:00:00', '2024-01-24 17:00:00'),  -- Galaxy Tab S9 Ultra was with Grace
(33, 11, '2023-07-10 09:00:00', '2024-02-07 17:00:00'),  -- OnePlus 12 was with Karen
(49, 12, '2023-08-20 09:00:00', '2024-01-31 17:00:00'),  -- ROG Phone 8 Pro was with Liam
(36, 6,  '2023-09-05 09:00:00', '2024-03-04 17:00:00'),  -- Xiaomi 14 Ultra was with Frank
(46, 16, '2023-06-01 09:00:00', '2024-01-19 17:00:00'),  -- Huawei Mate 60 was with Paul
-- Devices that went through multiple users
(6,  20, '2022-11-01 09:00:00', '2023-06-30 17:00:00'),  -- iPhone 13 old user 1
(6,  15, '2023-07-01 09:00:00', '2023-12-31 17:00:00'),  -- iPhone 13 old user 2
(7,  8,  '2023-01-01 09:00:00', '2023-09-30 17:00:00'),  -- iPhone SE old user
(12, 22, '2023-02-01 09:00:00', '2023-11-30 17:00:00'),  -- iPad Mini old user
(18, 30, '2023-03-01 09:00:00', '2024-02-28 17:00:00'),  -- Galaxy A35 old user
(20, 25, '2023-04-01 09:00:00', '2023-12-31 17:00:00'),  -- Galaxy Z Flip old user
(23, 35, '2023-05-01 09:00:00', '2024-01-31 17:00:00'),  -- Galaxy Tab S9 FE old user
(39, 40, '2023-06-01 09:00:00', '2023-12-15 17:00:00'),  -- Redmi Note old user
(42, 38, '2023-07-01 09:00:00', '2024-01-10 17:00:00'),  -- Xperia 10 old user
(45, 27, '2023-08-01 09:00:00', '2024-02-11 17:00:00');  -- Moto G84 old user
GO
