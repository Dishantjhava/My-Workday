/* MY WORKDAY — APP LOGIC */

let tasks = JSON.parse(JSON.stringify(TASKS));
let notifData = JSON.parse(JSON.stringify(NOTIFICATIONS));
let currentTask = null;

/* ─── VIEW SWITCHING ─── */
function showDashboard(mode) {
  document.getElementById('landing-view').style.display = 'none';
  const dv = document.getElementById('dashboard-view');
  dv.style.display = 'flex';
  window.scrollTo(0, 0);
  if (mode) setMode(mode);
  renderAll();
}

function showLanding() {
  document.getElementById('dashboard-view').style.display = 'none';
  document.getElementById('landing-view').style.display = 'block';
  window.scrollTo(0, 0);
}

function setMode(mode) {
  const empView = document.getElementById('emp-view');
  const mgrView = document.getElementById('mgr-view');
  const empBtn  = document.getElementById('emp-toggle');
  const mgrBtn  = document.getElementById('mgr-toggle');
  if (mode === 'employee') {
    empView.style.display = 'block';
    mgrView.style.display = 'none';
    empBtn.classList.add('active');
    mgrBtn.classList.remove('active');
  } else {
    empView.style.display = 'none';
    mgrView.style.display = 'block';
    mgrBtn.classList.add('active');
    empBtn.classList.remove('active');
    renderTeam();
    renderStandups();
  }
}

function renderAll() {
  renderTasks('all');
  renderClarifications();
  renderOneOnOnes();
  renderNotifications();
}

/* ─── TASKS ─── */
function renderTasks(filter) {
  const el = document.getElementById('tasks-list');
  if (!el) return;
  let list = tasks;
  if (filter === 'in-progress') list = tasks.filter(t => t.status === 'in-progress');
  else if (filter === 'done') list = tasks.filter(t => t.status === 'done');
  else if (filter === 'overdue') list = tasks.filter(t => t.status === 'overdue');

  if (!list.length) {
    el.innerHTML = '<div class="db-empty">No tasks found.</div>';
    return;
  }
  el.innerHTML = list.map((t, i) => `
    <div class="task-card priority-${t.priority} status-${t.status} fade-in"
         style="animation-delay:${i*0.05}s"
         onclick="openDrawer('${t.id}')">
      <div class="tc-checkbox ${t.status === 'done' ? 'checked' : ''}"
           onclick="event.stopPropagation();toggleDone('${t.id}')"></div>
      <div class="tc-body">
        <div class="task-title">${t.title}</div>
        <div class="task-meta">
          <span class="task-deadline ${t.status==='overdue'?'urgent':t.deadlineLabel==='Due today'?'today':''}">⏰ ${t.deadlineLabel}</span>
          <span>· ${t.assignedBy}</span>
        </div>
        <div class="task-progress-wrap">
          <div class="task-progress-bar"><div class="task-progress-fill" style="width:${t.progress}%"></div></div>
          <span class="task-progress-pct">${t.progress}%</span>
        </div>
      </div>
      <div class="tc-right">
        <span class="priority-badge ${t.priority}">${t.priority.toUpperCase()}</span>
        <span class="status-pill ${t.status}">${fmtStatus(t.status)}</span>
      </div>
    </div>
  `).join('');
}

function toggleDone(id) {
  const t = tasks.find(t => t.id === id);
  if (!t) return;
  t.status = t.status === 'done' ? 'pending' : 'done';
  if (t.status === 'done') t.progress = 100;
  renderTasks('all');
}

function fmtStatus(s) {
  return { overdue:'Overdue','in-progress':'In Progress',pending:'Pending',done:'Done' }[s] || s;
}

function filterTasks(filter, e) {
  if (e) { e.preventDefault(); }
  document.querySelectorAll('.dbs-item').forEach(el => el.classList.remove('active'));
  if (e && e.currentTarget) e.currentTarget.classList.add('active');
  else document.getElementById('home-nav-item').classList.add('active');
  renderTasks(filter);
}

/* ─── CLARIFICATIONS ─── */
function renderClarifications() {
  const el = document.getElementById('clarifications-list');
  if (!el) return;
  const list = tasks.filter(t => t.messages && t.messages.length && t.status !== 'done');
  if (!list.length) {
    el.innerHTML = '<div class="db-empty">No pending clarifications — all clear! ✅</div>';
    return;
  }
  el.innerHTML = list.map(t => {
    const last = t.messages[t.messages.length - 1];
    const waiting = last.from === 'alex';
    return `
      <div class="clarif-card" onclick="openDrawer('${t.id}')">
        <span class="clarif-icon">${waiting ? '❓' : '💬'}</span>
        <div class="clarif-body">
          <div class="clarif-task">${t.title}</div>
          <div class="clarif-msg">"${last.text.substring(0,80)}${last.text.length>80?'...':''}"</div>
          <div class="clarif-time">${last.from==='alex'?'You asked':'Sarah replied'} · ${last.time}, ${last.date}</div>
        </div>
        ${waiting ? '<span class="clarif-badge">Awaiting reply</span>' : ''}
      </div>`;
  }).join('');
}

/* ─── 1-ON-1s ─── */
function renderOneOnOnes() {
  const el = document.getElementById('one-on-ones');
  if (!el) return;
  el.innerHTML = ONE_ON_ONES.map(p => `
    <div class="db-person-card">
      <div class="dpc-av" style="background:${p.color}">${p.initial}</div>
      <div class="dpc-name">${p.name}</div>
      <div class="dpc-meta">
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><rect x="1" y="2" width="10" height="8" rx="1" stroke="#9CA3AF" stroke-width="1.2"/><path d="M4 1V2M8 1V2" stroke="#9CA3AF" stroke-width="1.2" stroke-linecap="round"/><path d="M1 4.5H11" stroke="#9CA3AF" stroke-width="1.2"/></svg>
        ${p.nextSession}
      </div>
    </div>`).join('');
}

/* ─── TEAM VIEW ─── */
function renderTeam(filter) {
  const el = document.getElementById('team-grid');
  if (!el) return;
  let members = TEAM_MEMBERS;
  if (filter && filter !== 'all') members = TEAM_MEMBERS.filter(m => m.status === filter);
  if (!members.length) {
    el.innerHTML = '<div class="db-empty" style="grid-column:1/-1">No team members match this filter.</div>';
    return;
  }
  el.innerHTML = members.map((m, i) => {
    const pct = Math.round((m.tasks.done / m.tasks.total) * 100);
    return `
      <div class="team-member-card fade-in" style="animation-delay:${i*0.06}s">
        <div class="tmc-avatar" style="background:${m.color}">${m.initial}</div>
        <div class="tmc-name">${m.name}</div>
        <div class="tmc-role">${m.role}</div>
        <div class="tmc-tasks">${m.tasks.done} / ${m.tasks.total} tasks</div>
        <div class="tmc-bar"><div class="tmc-fill" style="width:${pct}%;background:${m.color}"></div></div>
        <span class="tmc-status ${m.status}">${fmtMemberStatus(m.status)}</span>
        <div class="tmc-last">Active ${m.lastActive}</div>
      </div>`;
  }).join('');
}

function renderStandups() {
  const el = document.getElementById('standup-list');
  if (!el) return;
  el.innerHTML = TEAM_MEMBERS.map(m => `
    <div class="standup-card">
      <div class="standup-av" style="background:${m.color}">${m.initial}</div>
      <div>
        <div class="standup-name">${m.name} · ${m.role}</div>
        ${m.standup
          ? `<div class="standup-text">"${m.standup}"</div>`
          : '<div class="standup-empty">No standup posted today</div>'}
      </div>
    </div>`).join('');
}

function filterTeam(filter, btn) {
  document.querySelectorAll('.dmf-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderTeam(filter === 'all' ? null : filter);
}

function fmtMemberStatus(s) {
  return {'on-track':'On Track','needs-attention':'Needs Attention',done:'All Done',overdue:'Overdue'}[s] || s;
}

/* ─── DRAWER ─── */
function openDrawer(id) {
  const t = tasks.find(t => t.id === id);
  if (!t) return;
  currentTask = t;

  const pb = document.getElementById('drawer-priority-badge');
  pb.className = `dp-badge ${t.priority}`;
  pb.textContent = t.priority.toUpperCase();
  document.getElementById('drawer-title').textContent = t.title;
  document.getElementById('drawer-meta').textContent = `Assigned by ${t.assignedBy}  ·  ${t.deadlineLabel}`;
  document.getElementById('drawer-desc').textContent = t.description;
  document.getElementById('drawer-outcome').textContent = t.outcome;

  document.querySelectorAll('.drawer-status-row button').forEach(btn => {
    btn.classList.toggle('active-status', btn.dataset.status === t.status);
  });

  renderQAThread(t);

  document.getElementById('activity-log').innerHTML = t.activity.map(a => `
    <div class="activity-item">
      <div class="activity-text">${a.text}</div>
      <div class="activity-time">${a.time}</div>
    </div>`).join('');

  document.getElementById('task-drawer').classList.add('open');
  document.getElementById('drawer-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function renderQAThread(t) {
  const el = document.getElementById('qa-thread');
  if (!t.messages || !t.messages.length) {
    el.innerHTML = '<div style="text-align:center;color:#9CA3AF;font-size:12px;padding:12px 0">No messages yet.</div>';
    return;
  }
  el.innerHTML = t.messages.map(m => `
    <div class="qa-msg from-${m.from}">
      <div class="qa-av" style="background:${m.from==='alex'?'#6366F1':'#F59E0B'}">${m.from==='alex'?'A':'S'}</div>
      <div>
        <div class="qa-bubble">${m.text}</div>
        <div class="qa-time">${m.time} · ${m.date}</div>
      </div>
    </div>`).join('');
  el.scrollTop = el.scrollHeight;
}

function closeDrawer() {
  document.getElementById('task-drawer').classList.remove('open');
  document.getElementById('drawer-overlay').classList.remove('open');
  document.body.style.overflow = '';
  currentTask = null;
}

function updateStatus(status) {
  if (!currentTask) return;
  currentTask.status = status;
  if (status === 'done') currentTask.progress = 100;
  document.querySelectorAll('.drawer-status-row button').forEach(btn => {
    btn.classList.toggle('active-status', btn.dataset.status === status);
  });
  currentTask.activity.unshift({
    text: `Alex Chen changed status to ${fmtStatus(status)}`,
    time: new Date().toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'}) + ' · Today'
  });
  renderTasks('all');
}

function sendMessage() {
  const inp = document.getElementById('qa-input');
  const text = inp.value.trim();
  if (!text || !currentTask) return;
  currentTask.messages.push({
    from: 'alex', text,
    time: new Date().toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'}),
    date: 'Today'
  });
  inp.value = '';
  renderQAThread(currentTask);
  renderClarifications();
}

/* ─── NOTIFICATIONS ─── */
function renderNotifications() {
  const el = document.getElementById('np-list');
  if (!el) return;
  const unread = notifData.filter(n => !n.read).length;
  const badge = document.querySelector('.di-badge');
  if (badge) { badge.textContent = unread || ''; badge.style.display = unread ? '' : 'none'; }
  el.innerHTML = notifData.map(n => `
    <div class="np-item ${!n.read?'unread':''}" onclick="markRead('${n.id}')">
      <span class="np-icon">${n.icon}</span>
      <div class="np-body"><div class="np-text">${n.text}</div><div class="np-time">${n.time}</div></div>
      ${!n.read ? '<div class="np-dot"></div>' : ''}
    </div>`).join('');
}

function toggleNotifications(e) {
  if (e) e.preventDefault();
  document.getElementById('notif-panel').classList.toggle('open');
}

function markRead(id) {
  const n = notifData.find(n => n.id === id);
  if (n) { n.read = true; renderNotifications(); }
}

function markAllRead() {
  notifData.forEach(n => n.read = true);
  renderNotifications();
}

/* ─── MODAL ─── */
function openNewTask(e) {
  if (e) e.preventDefault();
  const ov = document.getElementById('modal-overlay');
  ov.style.display = 'flex';
}

function closemodalBtn() {
  document.getElementById('modal-overlay').style.display = 'none';
}

function createTask() {
  const title = document.getElementById('new-task-title').value.trim();
  if (!title) { document.getElementById('new-task-title').style.borderColor = '#EF4444'; return; }
  const priority = document.getElementById('new-task-priority').value;
  const deadline = document.getElementById('new-task-deadline').value;
  const desc = document.getElementById('new-task-desc').value.trim();
  tasks.unshift({
    id: 't' + Date.now(), title, priority, status: 'pending',
    deadlineLabel: deadline ? new Date(deadline).toLocaleDateString('en-US',{month:'short',day:'numeric'}) : 'No deadline',
    assignedBy: 'You', assignedByInitial: 'A', assignedByColor: '#6366F1',
    progress: 0, description: desc || 'No description.', outcome: '',
    messages: [],
    activity: [{ text: 'Task created by Alex Chen', time: new Date().toLocaleString() }]
  });
  renderTasks('all');
  closemodalBtn();
  document.getElementById('new-task-title').value = '';
  document.getElementById('new-task-desc').value = '';
  document.getElementById('new-task-deadline').value = '';
}

/* ─── INIT ─── */
document.addEventListener('DOMContentLoaded', () => {
  // Wire status buttons
  document.querySelectorAll('.drawer-status-row button').forEach(btn => {
    btn.addEventListener('click', () => updateStatus(btn.dataset.status));
  });

  // QA enter key
  const qi = document.getElementById('qa-input');
  if (qi) qi.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } });

  // Close notifications outside click
  document.addEventListener('click', e => {
    const panel = document.getElementById('notif-panel');
    const trigger = document.getElementById('notif-trigger');
    if (panel && panel.classList.contains('open') && trigger && !panel.contains(e.target) && !trigger.contains(e.target)) {
      panel.classList.remove('open');
    }
  });

  // Close modal outside click
  const mo = document.getElementById('modal-overlay');
  if (mo) mo.addEventListener('click', e => { if (e.target === mo) closemodalBtn(); });
});
