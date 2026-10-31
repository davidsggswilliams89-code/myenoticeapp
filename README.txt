HEADMASTER OFFICE UPDATE

Included files:
- index.html
- registrar.html
- school-connected-teacher.html

Changes:
1. The Registrar Portal's visible dashboard branding has been changed to Headmaster Office / Headmaster Dashboard.
2. The staff connection cards now include an Additional School Responsibilities editor.
3. The Headmaster can assign preset responsibilities including AHM Academic, AHM Administration, Examination Officer, Form Master, Assessment Coordinator, Attendance Officer, Discipline Officer, Safeguarding / Welfare Officer, ICT Coordinator, Library Coordinator, Sports Coordinator, Health Coordinator, Timetable Coordinator, Curriculum Coordinator, School Events Coordinator, and custom responsibilities.
4. Saved responsibilities are written to the school's teacherConnectionRequests record and mirrored to the matching schoolTeachers membership record.
5. The connected teacher dashboard displays the assigned responsibilities and refreshes them when the teacher connection record updates.
6. The teacher's base Firebase role remains "teacher". The existing registrars/{uid} account record and login routing are preserved to avoid breaking existing accounts.
7. Existing Form Master PTA class assignment remains separate. Selecting Form Master as a responsibility alone does not grant PTA payment access; use the existing Form Master Management controls in PTA Payments to assign the class.

Important:
- index.html is included unchanged because its existing login and role-routing flow is intentionally preserved.
- No Firestore security rules were changed or included. The existing rules must permit the authorized Headmaster/Registrar to update teacherConnectionRequests and schoolTeachers. These responsibility labels are assignment metadata; they do not independently grant access to restricted modules.
- Keep these three HTML files together in the same hosting directory so their existing relative navigation continues to work.
