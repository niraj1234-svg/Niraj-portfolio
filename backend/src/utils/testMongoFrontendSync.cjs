// testMongoFrontendSync.cjs
// Validates end-to-end MongoDB to Frontend Public/Admin Sync lifecycle

const API_BASE = 'http://localhost:5000/api';

async function testLifecycle() {
  console.log('--- 1. Authenticating Admin ---');
  const loginRes = await fetch(`${API_BASE}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'dhoreniraj83@gmail.com',
      password: 'NirajAdminSecurePass2026!',
    }),
  });
  const loginData = await loginRes.json();
  if (!loginData.token) throw new Error('Admin login failed');
  const token = loginData.token;
  console.log('✓ Admin authenticated');

  console.log('\n--- 2. Creating New Project in MongoDB ---');
  const newProjPayload = {
    title: 'Kubernetes GitOps Cluster Monitor',
    slug: 'k8s-gitops-cluster-monitor',
    category: 'Projects',
    description: 'ArgoCD and Prometheus powered live cluster health observability stack.',
    technologies: ['Kubernetes', 'ArgoCD', 'Prometheus', 'Helm'],
    featured: false,
    status: 'completed',
    order: 99,
  };
  const createRes = await fetch(`${API_BASE}/admin/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newProjPayload),
  });
  const createData = await createRes.json();
  if (!createData.data?._id) throw new Error('Create project failed: ' + JSON.stringify(createData));
  const createdId = createData.data._id;
  console.log(`✓ Project inserted into MongoDB with _id: ${createdId}`);

  console.log('\n--- 3. Verifying Newly Created Project in Public API (Frontend consumer) ---');
  const publicRes1 = await fetch(`${API_BASE}/projects`);
  const publicData1 = await publicRes1.json();
  const foundInPublic = publicData1.data?.find((p) => p._id === createdId || p.slug === 'k8s-gitops-cluster-monitor');
  if (!foundInPublic) throw new Error('New project did NOT appear in public /api/projects');
  console.log(`✓ Public API successfully returned new project: "${foundInPublic.title}"`);

  console.log('\n--- 4. Updating Project in MongoDB via Admin PUT ---');
  const updateRes = await fetch(`${API_BASE}/admin/projects/${createdId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title: 'Kubernetes GitOps Cluster Monitor [PRODUCTION VERIFIED]',
      status: 'completed',
    }),
  });
  const updateData = await updateRes.json();
  if (!updateData.success) throw new Error('Update failed');
  console.log('✓ Project updated in MongoDB');

  console.log('\n--- 5. Verifying Update Propagated to Public API ---');
  const publicRes2 = await fetch(`${API_BASE}/projects`);
  const publicData2 = await publicRes2.json();
  const updatedInPublic = publicData2.data?.find((p) => p._id === createdId);
  if (!updatedInPublic || !updatedInPublic.title.includes('[PRODUCTION VERIFIED]')) {
    throw new Error('Project update did NOT reflect in public API');
  }
  console.log(`✓ Public API reflects updated title: "${updatedInPublic.title}"`);

  console.log('\n--- 6. Deleting Project from MongoDB via Admin DELETE ---');
  const deleteRes = await fetch(`${API_BASE}/admin/projects/${createdId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  const deleteData = await deleteRes.json();
  if (!deleteData.success) throw new Error('Delete failed');
  console.log('✓ Project deleted from MongoDB');

  console.log('\n--- 7. Verifying Deletion Propagated to Public API ---');
  const publicRes3 = await fetch(`${API_BASE}/projects`);
  const publicData3 = await publicRes3.json();
  const deletedFromPublic = publicData3.data?.find((p) => p._id === createdId);
  if (deletedFromPublic) throw new Error('Deleted project is STILL visible in public API');
  console.log('✓ Project confirmed removed from public API');

  console.log('\n--- 8. Contact Form -> Admin Inbox Flow ---');
  const contactRes = await fetch(`${API_BASE}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Verification Bot',
      email: 'bot@verify.dev',
      subject: 'Data Propagation Validation',
      message: 'Testing message receipt and administrative triage lifecycle.',
    }),
  });
  const contactData = await contactRes.json();
  const msgId = contactData.data?._id;
  if (!msgId) throw new Error('Contact message not saved');
  console.log(`✓ Contact message saved to MongoDB with _id: ${msgId}`);

  console.log('\n--- 9. Checking Admin Inbox for New Message ---');
  const adminMsgsRes = await fetch(`${API_BASE}/admin/messages`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const adminMsgsData = await adminMsgsRes.json();
  const receivedMsg = adminMsgsData.data?.find((m) => m._id === msgId);
  if (!receivedMsg || receivedMsg.status !== 'unread') throw new Error('Message not found in admin inbox or status is not unread');
  console.log(`✓ Admin inbox contains message from "${receivedMsg.name}" with status: ${receivedMsg.status}`);

  console.log('\n--- 10. Marking Message as Read ---');
  const patchRes = await fetch(`${API_BASE}/admin/messages/${msgId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status: 'read' }),
  });
  const patchData = await patchRes.json();
  if (patchData.data?.status !== 'read') throw new Error('Message status was not updated to read');
  console.log('✓ Message status successfully toggled to "read"');

  console.log('\n--- 11. Deleting Message via Admin DELETE ---');
  const deleteMsgRes = await fetch(`${API_BASE}/admin/messages/${msgId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  const deleteMsgData = await deleteMsgRes.json();
  if (!deleteMsgData.success) throw new Error('Failed to delete message');
  console.log('✓ Message successfully deleted from MongoDB');

  console.log('\n=============================================');
  console.log('ALL MONGODB <-> FRONTEND DATA SYNC TESTS PASSED');
  console.log('=============================================');
}

testLifecycle().catch((err) => {
  console.error('\n[FAILED]:', err.message);
  process.exit(1);
});
