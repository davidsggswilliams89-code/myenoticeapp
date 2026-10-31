MYSCHOOLBOOK PRIMARY SCHOOL MANAGEMENT SYSTEM — LOGIN AND FIRESTORE UPDATE

FILES INCLUDED
- index.html: fixed login panel handling, single role-routing path, username/password autofill metadata, and teacher UID writes.
- school-connected-teacher.html: same login/session and teacher UID consistency fixes.
- independent-teacher.html: same login/session and teacher UID consistency fixes.
- firestore.rules: consolidated Firestore Security Rules for the Firebase collections used by the supplied HTML files.
- FIRESTORE_RULES.txt: plain-text copy of the rules for Firebase Console.
- All other supplied HTML files are included without intentional UI changes.

LOGIN FIX
The login page's initial Firebase onAuthStateChanged callback previously called showPanel(loginForm), which hid all account forms and immediately displayed the login form again. On some Android/mobile browsers this hide/show cycle can clear typed or autofilled values. The fix leaves the initial login form in place, makes panel switching idempotent, and only shows the login form after a later sign-out. The login submit handler now signs in once; the auth-state listener performs role verification and routing once, avoiding duplicate role checks.

TEACHER UID FIX
The previous teacher account/profile writes did not consistently include uid even though the existing security rules required it. Teacher account creation now writes uid, profile creation/backfill writes uid, and teacher profile updates include uid.

PUBLISH FIRESTORE RULES
1. Open Firebase Console for project myschoolbook-4d23d.
2. Open Firestore Database > Rules.
3. Replace the rules with the complete contents of FIRESTORE_RULES.txt (skip the first two explanatory lines if you prefer; the rules begin at rules_version = '2';).
4. Click Publish.
5. Upload/replace the three corrected HTML files in your hosting project, keeping their filenames exactly as shown.
6. Test using a teacher, registrar, and parent account. Then test the subscription administrator and GPS/ PTA sections.

IMPORTANT ADMIN SETUP
The subscription-admin-portal.html checks for an admin profile at admins/{AUTH_UID} or users/{AUTH_UID}. The rules allow the signed-in owner to read that profile but intentionally deny client-side creation or modification. Create the administrator profile manually in Firestore Console or through trusted server code. The profile must contain one of these accepted role values: admin, superadmin, super_admin, platformadmin, platform_admin; or isAdmin: true / isSuperAdmin: true. Never let an ordinary user create their own admin profile.

SECURITY AND SCOPE NOTES
- The rules intentionally have no catch-all allow rule. Unknown collections remain denied.
- Official school student records are managed by the registrar. Connected teachers can read assigned classes and update assessmentRecords for their assigned classes. A Form Master can read and update PTA payment fields only for the assigned class.
- Parent student access requires an approved parentSchoolConnections/{schoolId}_{parentUid} document and a matching student ID in matchedStudentIds.
- Timetable/exam timetable and notices are readable by approved school connections; registrar-owned school data is writable only by that school's registrar.
- GPS check-in/event records are restricted to the connected teacher and the owning registrar. Browser GPS coordinates are client-reported and cannot be treated as tamper-proof proof of physical presence without trusted server-side verification.
- Curriculum.html is a static curriculum source in the supplied files; Firestore Rules do not govern its local/static content.
- Some dashboard sections may still store data in browser localStorage rather than Firestore. Firestore Rules protect only Firestore operations; they do not secure localStorage data.

TESTING LIMITATION
The HTML scripts were checked for JavaScript syntax in the changed Firebase authentication modules. This environment cannot publish rules to your Firebase project or run authenticated emulator tests against your live database. After publishing, use Firebase Rules Playground or the app with test accounts to verify each role and operation. If a specific operation is denied, capture its exact Firebase error and the affected section; do not replace these rules with a broad allow rule.
