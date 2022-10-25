# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

**Assuming following are the table structure in current architecture -**

Facilities:
    id: <facility_id>
    ...(other columns containing facility details)

Agents:
    id: <agent_id>
    ...(other columns containing agent details)

Shifts:
    id: <shift_id>
    facility_id: <facility_id>
    agent_id: <agent_id>
    ...(other columns containg shift details)

**Requirements -**

1. Create an interface to create custom_id and fetch agent details based on the custom_id
    subtasks:
        `Backend Task`:
            a) Create a new table to save custom_id, facility_id and agent_id mapping
                Table Structure:
                    id: <custom_id assigned by facility as Primary key>
                    facility_id: <facility_id>
                    agent_id: <agent_id>
                    `facility_id and agent_id together forms a candidate key`
            b) Create an api endpoint to create mapping: (facility_id, agent_id, custom_id) => {success or failure with error}
            c) Create an api endpoint to fetch the list agents given faicility_id: (facility_id) => { list of agents created from joining new table and agents table with custom_id field and agent_id field both presents with agent details(only the agreed upon details that can be exposed to the facility)}
            d) Create a internal function convert custom_id into agent_id based on facility_id: (facility_id, custom_id) => {agent_id}
        `Frontend Task`:
            e) Create a GUI to add the information and show the list of agents in the facility

2. Create wrapper over `generateReport` function to fetch internal agent_id from custom_agent_id using the internal function mentioned above.

**Task Division -**
*Task1: Database table creation*
    - Acceptance criteria: Given table structure should be followed. Triggers should be created for auditing.
    - Time: 2 hours (dev estimate)
*Task2: API to create and fetch list*
    - Acceptance criteria: Given definition should be followed. Required test-cases should be written.
    - Time: 4 hours (dev estimate)
*Task3: GUI*
    - Acceptance Criteria: Design provided by the UX team should be adhered to.
    - Time: 1 day (assuming we already have a GUI setup for facilities and this will just be a new page) (dev estimate)
*Task4: Wrapper and utility function:*
    - Acceptance Criteria: Given definition should be followed. Required test-cases should be written.
    - Time: 4 hours (dev estimate)

**Timeline including QA, Code Reviews-**
    - Backend Tasks: 3 days
    - Frontend Tasks: 2 days (assuming the api testing does not depend on frontend)
