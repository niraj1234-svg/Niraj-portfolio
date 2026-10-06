const API_BASE = 'http://localhost:5000/api';
const FRONTEND_URL = 'http://127.0.0.1:5173';

const results = {
  passed: [],
  failed: [],
};

function pass(name, detail = '') {
  results.passed.push({ name, detail });
  console.log(`[PASS] ${name} ${detail ? `(${detail})` : ''}`);
}

function fail(name, error) {
  results.failed.push({ name, error });
  console.error(`[FAIL] ${name}:`, error);
}

async function runTests() {
  console.log('====================================================');
  console.log('   FULL-STACK COMPREHENSIVE INTEGRATION TEST SUITE   ');
  console.log('====================================================\n');

  let adminToken = '';
  let createdProjectId = '';
  let submittedMessageId = '';

  // 1. MongoDB Connection & 2. GET /api/health
  try {
    const res = await fetch(`${API_BASE}/health`);
    const data = await res.json();
    if (res.status === 200 && data.status === 'healthy') {
      pass('1. MongoDB connection & Server health', `Uptime: ${Math.round(data.uptime)}s, status: ${data.status}`);
    } else {
      fail('1. MongoDB connection & Server health', `Status: ${res.status}`);
    }
  } catch (err) {
    fail('1. MongoDB connection & Server health', err.message);
  }

  // 3. Projects API (list & slug)
  try {
    const listRes = await fetch(`${API_BASE}/projects`);
    const listData = await listRes.json();
    if (listRes.status === 200 && Array.isArray(listData.data) && listData.data.length > 0) {
      pass('3a. GET /api/projects', `Count: ${listData.count}, First project: "${listData.data[0].title}"`);

      // Test slug endpoint
      const slug = listData.data[0].slug;
      const slugRes = await fetch(`${API_BASE}/projects/${slug}`);
      const slugData = await slugRes.json();
      if (slugRes.status === 200 && slugData.data?.slug === slug) {
        pass('3b. GET /api/projects/:slug', `Slug: ${slug}`);
      } else {
        fail('3b. GET /api/projects/:slug', `Slug fetch failed: ${slug}`);
      }

      // Test category filter
      const filterRes = await fetch(`${API_BASE}/projects?category=Projects`);
      const filterData = await filterRes.json();
      if (filterRes.status === 200 && filterData.data.every(p => p.category.toLowerCase() === 'projects')) {
        pass('3c. GET /api/projects?category=Projects', `Filtered count: ${filterData.count}`);
      } else {
        fail('3c. GET /api/projects?category=Projects', 'Category filter failed');
      }
    } else {
      fail('3a. GET /api/projects', 'No project records returned');
    }
  } catch (err) {
    fail('3. Projects API', err.message);
  }

  // 4. Experience API
  try {
    const res = await fetch(`${API_BASE}/experience`);
    const data = await res.json();
    if (res.status === 200 && Array.isArray(data.data) && data.data.length >= 4) {
      pass('4. GET /api/experience', `Count: ${data.count}, First org: "${data.data[0].organization}"`);
    } else {
      fail('4. GET /api/experience', `Expected >= 4 entries, got ${data.count}`);
    }
  } catch (err) {
    fail('4. GET /api/experience', err.message);
  }

  // 5. Education API
  try {
    const res = await fetch(`${API_BASE}/education`);
    const data = await res.json();
    if (res.status === 200 && Array.isArray(data.data) && data.data.length > 0) {
      pass('5. GET /api/education', `Institution: "${data.data[0].institution}", Degree: "${data.data[0].degree}"`);
    } else {
      fail('5. GET /api/education', 'No education records found');
    }
  } catch (err) {
    fail('5. GET /api/education', err.message);
  }

  // 6. Skills API
  try {
    const res = await fetch(`${API_BASE}/skills`);
    const data = await res.json();
    if (res.status === 200 && Array.isArray(data.data) && data.data.length >= 10) {
      pass('6. GET /api/skills', `Count: ${data.count}, Categories: ${[...new Set(data.data.map(s => s.category))].join(', ')}`);
    } else {
      fail('6. GET /api/skills', `Expected >= 10 skills, got ${data.count}`);
    }
  } catch (err) {
    fail('6. GET /api/skills', err.message);
  }

  // 7. Achievements API
  try {
    const res = await fetch(`${API_BASE}/achievements`);
    const data = await res.json();
    if (res.status === 200 && Array.isArray(data.data) && data.data.length >= 3) {
      pass('7. GET /api/achievements', `Count: ${data.count}, Items: ${data.data.map(a => a.title).join(' | ')}`);
    } else {
      fail('7. GET /api/achievements', `Expected >= 3 achievements, got ${data.count}`);
    }
  } catch (err) {
    fail('7. GET /api/achievements', err.message);
  }

  // 8. Contact Form API (Valid submission & validation failure)
  try {
    // 8a. Valid contact
    const validContact = {
      name: 'Integration Test Bot',
      email: 'bot@testing.com',
      subject: 'DevOps System Verification',
      message: 'This is an automated verification message checking MongoDB persistence.',
    };
    const contactRes = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validContact),
    });
    const contactData = await contactRes.json();
    if (contactRes.status === 201 && contactData.success) {
      submittedMessageId = contactData.data?.id;
      pass('8a. POST /api/contact (Valid submission)', `Stored ID: ${submittedMessageId}`);
    } else {
      fail('8a. POST /api/contact', contactData.message);
    }

    // 8b. Invalid email validation rejection
    const invalidContact = {
      name: '',
      email: 'not-an-email',
      subject: 'hi',
      message: 'short',
    };
    const invalidRes = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(invalidContact),
    });
    const invalidData = await invalidRes.json();
    if (invalidRes.status === 400 && !invalidData.success && invalidData.errors?.length >= 3) {
      pass('8b. POST /api/contact (Validation check)', `Rejected correctly with ${invalidData.errors.length} validation errors`);
    } else {
      fail('8b. POST /api/contact (Validation check)', 'Did not reject invalid contact payload');
    }
  } catch (err) {
    fail('8. Contact Form API', err.message);
  }

  // 9. Admin Login & Auth
  try {
    // 9a. Successful login
    const loginRes = await fetch(`${API_BASE}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'dhoreniraj83@gmail.com',
        password: 'NirajAdminSecurePass2026!',
      }),
    });
    const loginData = await loginRes.json();
    if (loginRes.status === 200 && loginData.token) {
      adminToken = loginData.token;
      pass('9a. POST /api/admin/login (Valid credentials)', `User: ${loginData.user?.name}, Token issued`);
    } else {
      fail('9a. POST /api/admin/login', loginData.message);
    }

    // 9b. Bad password rejection
    const badLoginRes = await fetch(`${API_BASE}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'dhoreniraj83@gmail.com',
        password: 'WrongPassword123!',
      }),
    });
    const badLoginData = await badLoginRes.json();
    if (badLoginRes.status === 401 && !badLoginData.success) {
      pass('9b. POST /api/admin/login (Invalid credentials check)', 'Unauthorized error returned correctly');
    } else {
      fail('9b. POST /api/admin/login', 'Accepted bad password unexpectedly');
    }
  } catch (err) {
    fail('9. Admin Login', err.message);
  }

  // 10. Admin CRUD Operations
  try {
    // 10a. Verify token protection (Request without token -> 401)
    const noTokenRes = await fetch(`${API_BASE}/admin/stats`);
    if (noTokenRes.status === 401) {
      pass('10a. Protected route authentication guard', 'Rejected unauthenticated request with 401');
    } else {
      fail('10a. Protected route guard', `Expected 401, got ${noTokenRes.status}`);
    }

    // 10b. Create Project
    const newProj = {
      title: 'Automated Container Health Prober',
      slug: 'automated-container-health-prober',
      category: 'Projects',
      description: 'Microservice prober that queries Docker daemon socket metrics and sends alert webhooks.',
      technologies: ['Docker', 'Node.js', 'Bash'],
      featured: false,
      status: 'completed',
      order: 10,
    };
    const createRes = await fetch(`${API_BASE}/admin/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify(newProj),
    });
    const createData = await createRes.json();
    if (createRes.status === 201 && createData.data?._id) {
      createdProjectId = createData.data._id;
      pass('10b. Admin Create Project (POST /api/admin/projects)', `Created ID: ${createdProjectId}`);
    } else {
      fail('10b. Admin Create Project', createData.message);
    }

    // 10c. Update Project
    const updateRes = await fetch(`${API_BASE}/admin/projects/${createdProjectId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify({
        title: 'Automated Container Health Prober (Updated)',
        status: 'ongoing',
      }),
    });
    const updateData = await updateRes.json();
    if (updateRes.status === 200 && updateData.data?.title.includes('Updated')) {
      pass('10c. Admin Update Project (PUT /api/admin/projects/:id)', `New title: "${updateData.data.title}"`);
    } else {
      fail('10c. Admin Update Project', updateData.message);
    }

    // 10d. Delete Project
    const deleteRes = await fetch(`${API_BASE}/admin/projects/${createdProjectId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    const deleteData = await deleteRes.json();
    if (deleteRes.status === 200 && deleteData.success) {
      pass('10d. Admin Delete Project (DELETE /api/admin/projects/:id)', 'Deleted successfully');
    } else {
      fail('10d. Admin Delete Project', deleteData.message);
    }

    // 10e. Message status toggle
    if (submittedMessageId) {
      const toggleRes = await fetch(`${API_BASE}/admin/messages/${submittedMessageId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ status: 'read' }),
      });
      const toggleData = await toggleRes.json();
      if (toggleRes.status === 200 && toggleData.data?.status === 'read') {
        pass('10e. Admin Patch Message Status', `Message ${submittedMessageId} marked as read`);
      } else {
        fail('10e. Admin Patch Message Status', toggleData.message);
      }
    }
  } catch (err) {
    fail('10. Admin CRUD', err.message);
  }

  // 11. Frontend API Integration & Dev Server
  try {
    const frontRes = await fetch(FRONTEND_URL);
    const html = await frontRes.text();
    if (frontRes.status === 200 && html.includes('Niraj Dhore') && html.includes('bg-triangles')) {
      pass('11a. Frontend dev server (http://127.0.0.1:5173)', 'HTML index served with correct branding & layout');
    } else {
      fail('11a. Frontend dev server', `Status: ${frontRes.status}`);
    }

    // Check CORS headers on API
    const corsRes = await fetch(`${API_BASE}/projects`, {
      headers: { Origin: 'http://127.0.0.1:5173' },
    });
    const allowOrigin = corsRes.headers.get('access-control-allow-origin');
    if (allowOrigin === 'http://127.0.0.1:5173' || allowOrigin === '*') {
      pass('11b. CORS Policy check', `Access-Control-Allow-Origin: ${allowOrigin}`);
    } else {
      fail('11b. CORS Policy check', `Unexpected header: ${allowOrigin}`);
    }
  } catch (err) {
    fail('11. Frontend integration', err.message);
  }

  // 12. Production Environment Variables & Documentation
  try {
    const fs = require('fs');
    const path = require('path');
    const rootEnvExample = fs.readFileSync(path.join(__dirname, '../../../.env.example'), 'utf8');
    const backendEnvExample = fs.readFileSync(path.join(__dirname, '../../.env.example'), 'utf8');
    const hasMongoUri = backendEnvExample.includes('MONGODB_URI');
    const hasJwtSecret = backendEnvExample.includes('JWT_SECRET');
    const hasCors = backendEnvExample.includes('CORS_ORIGIN');
    const hasViteUrl = rootEnvExample.includes('VITE_API_URL');

    if (hasMongoUri && hasJwtSecret && hasCors && hasViteUrl) {
      pass('12. Production environment variables & configs', 'All required variables documented in .env.example files');
    } else {
      fail('12. Production environment variables', 'Missing required keys in .env.example');
    }
  } catch (err) {
    fail('12. Production environment variables', err.message);
  }

  console.log('\n====================================================');
  console.log(`TEST SUMMARY: ${results.passed.length} PASSED | ${results.failed.length} FAILED`);
  console.log('====================================================');

  if (results.failed.length > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runTests();
