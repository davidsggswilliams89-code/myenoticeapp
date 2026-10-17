MY E-NOTICE APP — PARENT PORTAL PACKAGE

Files
- index.html: your existing teacher/registrar app with Parent/Guardian registration added.
- registrar.html: your existing registrar portal with a Parent Account Approval section added.
- parent.html: new parent dashboard.
- firestore-parent-rules-addition.txt: parent-specific Firestore rule template/addition.

Parent registration flow
1. Parent creates an account using the exact School ID and phone number already recorded on at least one student record.
2. The account is created with status pending and is signed out after submission.
3. Registrar opens Parents in registrar portal and approves or rejects the request.
4. Approved parent signs in through index.html and is routed to parent.html.
5. Parent dashboard reads only student IDs matched at registration from that school.

IMPORTANT DEPLOYMENT NOTES
- These HTML files use the Firebase project configuration already present in your uploaded files.
- Firebase Authentication Email/Password must be enabled.
- The registrar must be signed in and have a valid registrars/{uid} record with schoolId.
- Firestore rules are security-critical. The supplied text is a template/addition, NOT a safe full replacement for your existing rules: merge the parent rules into your current rules while preserving every teacher, registrar, school, timetable, curriculum and student rule. The student rule shown is illustrative and may need merging with your existing access conditions.
- For stronger security, move parent-to-student matching into a trusted Cloud Function or server: client-side registration currently reads student documents to verify the phone and records matching IDs. Do not grant broad public read access to student records just to make registration work.
- This UI shows official student profile fields that exist in the schema; attendance, results, fees and notices are not fabricated. The page explains when data needs to be published/recorded.
- Test using a registrar account and a test student record before deploying to production.
