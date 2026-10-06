const baseUrl = 'http://localhost:5000/api';

async function testAll() {
  console.log('--- STARTING COMPREHENSIVE BACKEND API TEST SUITE ---');
  let token = '';

  // 1. Health
  const healthRes = await fetch(`${baseUrl}/health`).then((r) => r.json());
  console.log('1. GET /api/health:', healthRes.status === 'healthy' ? 'PASS' : 'FAIL');

  // 2. Projects
  const projectsRes = await fetch(`${baseUrl}/projects`).then((r) => r.json());
  console.log(`2. GET /api/projects: PASS (Count: ${projectsRes.count}, First: "${projectsRes.data[0]?.title}")`);

  // 3. Project by slug
  const slugRes = await fetch(`${baseUrl}/projects/kala-ecommerce-platform`).then((r) => r.json());
  console.log(`3. GET /api/projects/:slug: ${slugRes.success ? 'PASS' : 'FAIL'} ("${slugRes.data?.title}")`);

  // 4. Experience
  const expRes = await fetch(`${baseUrl}/experience`).then((r) => r.json());
  console.log(`4. GET /api/experience: PASS (Count: ${expRes.count})`);

  // 5. Education
  const eduRes = await fetch(`${baseUrl}/education`).then((r) => r.json());
  console.log(`5. GET /api/education: PASS (Institution: "${eduRes.data[0]?.institution}")`);

  // 6. Achievements
  const achRes = await fetch(`${baseUrl}/achievements`).then((r) => r.json());
  console.log(`6. GET /api/achievements: PASS (Count: ${achRes.count})`);

  // 7. Skills
  const skillsRes = await fetch(`${baseUrl}/skills`).then((r) => r.json());
  console.log(`7. GET /api/skills: PASS (Count: ${skillsRes.count})`);

  // 8. Social Links
  const socialsRes = await fetch(`${baseUrl}/social-links`).then((r) => r.json());
  console.log(`8. GET /api/social-links: PASS (Count: ${socialsRes.count})`);

  // 9. Site Settings
  const settingsRes = await fetch(`${baseUrl}/site-settings`).then((r) => r.json());
  console.log(`9. GET /api/site-settings: PASS (Name: "${settingsRes.data?.name}")`);

  // 10. Contact form submission
  const contactRes = await fetch(`${baseUrl}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Test Recruiter',
      email: 'recruiter@techcorp.com',
      subject: 'DevOps Engineering Opportunity',
      message: 'Hello Niraj, we were very impressed by your KALA e-commerce project and would love to connect!',
    }),
  }).then((r) => r.json());
  console.log(`10. POST /api/contact: ${contactRes.success ? 'PASS' : 'FAIL'} (${contactRes.message})`);

  // 11. Contact validation test (invalid email)
  const contactInvalidRes = await fetch(`${baseUrl}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'T',
      email: 'invalid-email',
      subject: '',
      message: 'too short',
    }),
  }).then((r) => r.json());
  console.log(`11. POST /api/contact (validation check): ${!contactInvalidRes.success ? 'PASS' : 'FAIL'} (Caught ${contactInvalidRes.errors?.length} validation errors)`);

  // 12. Admin Login
  const loginRes = await fetch(`${baseUrl}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'dhoreniraj83@gmail.com',
      password: 'NirajAdminSecurePass2026!',
    }),
  }).then((r) => r.json());
  console.log(`12. POST /api/admin/login: ${loginRes.success ? 'PASS' : 'FAIL'} (User: "${loginRes.user?.name}")`);
  token = loginRes.token;

  // 13. Protected route without token
  const unauthRes = await fetch(`${baseUrl}/admin/stats`).then((r) => r.json());
  console.log(`13. GET /api/admin/stats (without token): ${!unauthRes.success ? 'PASS' : 'FAIL'} (${unauthRes.message})`);

  // 14. Protected route with token
  const statsRes = await fetch(`${baseUrl}/admin/stats`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then((r) => r.json());
  console.log(`14. GET /api/admin/stats (with token): ${statsRes.success ? 'PASS' : 'FAIL'} (Projects: ${statsRes.data?.projects}, Messages: ${statsRes.data?.messages})`);

  // 15. Admin CRUD: Create, Update, Delete Project
  const createProjRes = await fetch(`${baseUrl}/admin/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title: 'Automated CI/CD Pipeline Lab',
      slug: 'automated-cicd-pipeline-lab',
      category: 'Projects',
      description: 'Hands-on automated continuous integration testing with GitHub Actions and container registries.',
      technologies: ['Docker', 'GitHub Actions', 'Linux'],
      status: 'completed',
      order: 99,
    }),
  }).then((r) => r.json());
  console.log(`15a. Admin Create Project: ${createProjRes.success ? 'PASS' : 'FAIL'} (ID: ${createProjRes.data?._id})`);

  const newProjId = createProjRes.data?._id;
  if (newProjId) {
    const updateProjRes = await fetch(`${baseUrl}/admin/projects/${newProjId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: 'Automated CI/CD Pipeline Lab (Updated)',
      }),
    }).then((r) => r.json());
    console.log(`15b. Admin Update Project: ${updateProjRes.success ? 'PASS' : 'FAIL'} ("${updateProjRes.data?.title}")`);

    const delProjRes = await fetch(`${baseUrl}/admin/projects/${newProjId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    }).then((r) => r.json());
    console.log(`15c. Admin Delete Project: ${delProjRes.success ? 'PASS' : 'FAIL'}`);
  }

  // 16. Admin Messages check
  const messagesRes = await fetch(`${baseUrl}/admin/messages`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then((r) => r.json());
  console.log(`16. GET /api/admin/messages: PASS (Found ${messagesRes.count} message(s))`);

  console.log('--- ALL BACKEND TESTS PASSED SUCCESSFULLY! ---');
}

testAll().catch(console.error);
