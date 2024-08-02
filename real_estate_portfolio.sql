DROP DATABASE IF EXISTS REAL_ESTATE_PORTFOLIO;
CREATE DATABASE REAL_ESTATE_PORTFOLIO;
USE REAL_ESTATE_PORTFOLIO;

DROP TABLE IF EXISTS OWNER;
CREATE TABLE OWNER (
	SIN					varchar(25) not null,
    Password			varchar(25) not null,
	First_Name			varchar(25) not null,
	Last_Name			varchar(25) not null,
	PhoneNo				varchar(25) unique, 
    Email				varchar(25) unique,
	primary key (SIN)
);

DROP TABLE IF EXISTS PROPERTY_MANAGER;
CREATE TABLE PROPERTY_MANAGER (
	SIN					varchar(25) not null,
    Password			varchar(25) not null,
	First_Name			varchar(25) not null,
	Last_Name			varchar(25) not null,
	PhoneNo				varchar(25) unique,
    Email				varchar(25) unique,
	Background_Check	varchar(25),
    O_SIN				varchar(25),
	primary key (SIN),
    constraint PM_O_FK foreign key(O_SIN) references OWNER(SIN) on delete cascade on update cascade
);

DROP TABLE IF EXISTS PROPERTY;
CREATE TABLE PROPERTY (
	PropertyNo			varchar(25) not null,
	NoOfUnits			int not null,
	City				varchar(25),
    Country				varchar(25),
    Street				varchar(25) not null,
    Postal_Code			varchar(25),
    PM_SIN				varchar(25),
	primary key (PropertyNo),
    constraint P_PM_FK foreign key(PM_SIN) references PROPERTY_MANAGER(SIN) on delete set null on update cascade
);

DROP TABLE IF EXISTS TENANT;
CREATE TABLE TENANT (
	SIN					varchar(25) not null,
    Password			varchar(25) not null,
	First_Name			varchar(25) not null,
	Last_Name			varchar(25) not null,
	PhoneNo				varchar(25) unique,
    Email				varchar(25) unique,
    Credit_Score		int not null,
    Rent				varchar(25),
    Start_Date			varchar(25),
    End_Date			varchar(25),
    P_PropertyNo		varchar(25),
	primary key (SIN),
    constraint T_P_FK foreign key(P_PropertyNo) references PROPERTY(PropertyNo) on delete cascade on update cascade
);

DROP TABLE IF EXISTS WORK_ORDER;
CREATE TABLE WORK_ORDER (
	RefNo				varchar(25) not null,
	Task				varchar(100) not null,
	Expense				varchar(25) not null,
	Time				varchar(25),
    Date				varchar(25),
    Approval_Date		varchar(25),
	O_SIN				varchar(25),
    PM_SIN				varchar(25),
    P_PropertyNo		varchar(25),
	primary key (RefNo),
    constraint W_O_FK foreign key(O_SIN) references OWNER(SIN) on delete cascade on update cascade,
    constraint W_PM_FK foreign key(PM_SIN) references PROPERTY_MANAGER(SIN) on delete set null on update cascade,
    constraint W_P_FK foreign key(P_PropertyNo) references PROPERTY(PropertyNo) on delete cascade on update cascade
);

DROP TABLE IF EXISTS MORTGAGE;
CREATE TABLE MORTGAGE (
	RefNo				varchar(25) not null,
    Principal_Amount	varchar(25),
    Monthly_Payment		varchar(25),
    Interest_Rate		varchar(25),
    Term				varchar(25),
    Bank				varchar(25),
    P_PropertyNo		varchar(25),
    primary key (RefNo),
    constraint M_P_FK foreign key(P_PropertyNo) references PROPERTY(PropertyNo) on delete cascade on update cascade
);

DROP TABLE IF EXISTS MEMO;
CREATE TABLE MEMO (
	MemoNo				varchar(25) not null,
    P_PropertyNo		varchar(25) not null,
    Message				varchar(280),
	O_SIN				varchar(25),
    PM_SIN				varchar(25),
    constraint ME_P_FK foreign key(P_PropertyNo) references PROPERTY(PropertyNo) on delete cascade on update cascade,
    constraint ME_PK primary key (MemoNo, P_PropertyNo),
    constraint ME_O_FK foreign key(O_SIN) references OWNER(SIN) on delete cascade on update cascade,
    constraint ME_PM_FK foreign key(PM_SIN) references PROPERTY_MANAGER(SIN) on delete set null on update cascade
);

DROP TABLE IF EXISTS FINANCIAL_RECORD;
CREATE TABLE FINANCIAL_RECORD(
	RecordNo				varchar(25) not null,
    P_PropertyNo			varchar(25) not null,
    Monthly_Income			varchar(25),
    Expenses				varchar(25),
    constraint FR_P_FK foreign key(P_PropertyNo) references PROPERTY(PropertyNo) on delete cascade on update cascade,
    constraint FR_PK primary key (RecordNo, P_PropertyNo)
);

DROP TABLE IF EXISTS TRACKS_EXPENSES_OF;
CREATE TABLE TRACKS_EXPENSES_OF(
    P_PropertyNo	varchar(25) not null,
    RecordNo		varchar(25) not null,
    constraint TEO_P_FK foreign key(P_PropertyNo) references PROPERTY(PropertyNo) on delete cascade on update cascade,
    constraint TEO_FR_FK foreign key(RecordNo) references FINANCIAL_RECORD(RecordNo) on delete cascade on update cascade,
    constraint TEO_PK primary key(P_PropertyNo, RecordNo)
);

INSERT INTO OWNER (SIN, Password, First_Name, Last_Name, PhoneNo, Email)
VALUES
('123-456-789', 'password', 'John',	'Doe', '403-555-5555', 'john.doe@gmail.com');

INSERT INTO PROPERTY_MANAGER (SIN, Password, First_Name, Last_Name, PhoneNo, Email, Background_Check, O_SIN)
VALUES
('987-654-321', 'password', 'Jane',	'Doe', '403-444-4444', 'jane.doe@gmail.com', 'Passed', '123-456-789');

INSERT INTO PROPERTY (PropertyNo, NoOfUnits, City, Country, Street, Postal_Code, PM_SIN)
VALUES
('100ABC', 4, 'Calgary', 'Canada', '24 17th Ave', 'T2T 2T2', '987-654-321');

INSERT INTO TENANT (SIN, Password, First_Name, Last_Name, PhoneNo, Email, Credit_Score, Rent, Start_Date, End_Date, P_PropertyNo)
VALUES
('111-222-333', 'password', 'Bob', 'Doe', '403-123-4567', 'bob.doe@gmail.com', '900', '900', '2022-12-07', '2023-12-07', '100ABC');

INSERT INTO WORK_ORDER (RefNo, Task, Expense, Time, Date, Approval_Date, O_SIN, PM_SIN, P_PropertyNo)
VALUES
('0001', 'Electrical', '1000', '13:00', '2022-12-07', '2022-12-06', '123-456-789', '987-654-321', '100ABC');
    
INSERT INTO MORTGAGE (RefNo, Principal_Amount, Monthly_Payment, Interest_Rate, Term, Bank, P_PropertyNo)
VALUES
('AAAA', '$500, 000', '$3500', '5%', '30 Year', 'CIBC', '100ABC');
    
INSERT INTO MEMO (MemoNo, P_PropertyNo, Message, O_SIN, PM_SIN)
VALUES
('AAA100', '100ABC', 'BBQ Next Weekend!', '123-456-789', '987-654-321');
    
INSERT INTO FINANCIAL_RECORD (RecordNo, P_PropertyNo, Monthly_Income, Expenses)
VALUES
('100000', '100ABC', '900', '1000');