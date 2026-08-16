// ----- enhanced student database with new fields -----
const studentDB = {
  'S1001': {
    id: 'S1001',
    name: 'Alex Rivera',
    password: '1234',
    email: 'alex@email.com',
    phone: '+1 555-123-4567',
    attendance: { present: 17, absent: 3, total: 20 },
    fees: { total: 1200, paid: 900 },
    pendingLectures: [
      { topic: 'Module 4: Advanced OOP' },
      { topic: 'Module 5: Database Design' }
    ],
    syllabus: [
      { topic: '1. Intro to Programming', status: '✅ Completed' },
      { topic: '2. Data Structures', status: '✅ Completed' },
      { topic: '3. Algorithms', status: '⏳ In progress' },
      { topic: '4. OOP Concepts', status: '⏳ In progress' },
      { topic: '5. Database Systems', status: '📅 Upcoming' },
      { topic: '6. Web Frameworks', status: '📅 Upcoming' },
      { topic: '7. Cloud Basics', status: '📅 Upcoming' },
      { topic: '8. Capstone Project', status: '📅 Upcoming' }
    ],
    skills: [
      { name: 'JavaScript', level: '⭐⭐⭐⭐⭐' },
      { name: 'Python', level: '⭐⭐⭐⭐' },
      { name: 'React', level: '⭐⭐⭐' },
      { name: 'Node.js', level: '⭐⭐⭐' }
    ],
    teaching: {
      course: 'Full Stack Web Dev',
      instructor: 'Dr. Sarah Chen',
      schedule: 'Mon/Wed 2-4 PM',
      room: 'Online - Zoom'
    }
  },

  'S1002': {
    id: 'S1002',
    name: 'Jordan Lee',
    password: '1234',
    email: 'jordan@email.com',
    phone: '+1 555-987-6543',
    attendance: { present: 14, absent: 6, total: 20 },
    fees: { total: 1200, paid: 500 },
    pendingLectures: [
      { topic: 'Module 2: Data Structures' },
      { topic: 'Module 3: Algorithms' },
      { topic: 'Module 6: Web Frameworks' }
    ],
    syllabus: [
      { topic: '1. Intro to Programming', status: '✅ Completed' },
      { topic: '2. Data Structures', status: '⏳ In progress' },
      { topic: '3. Algorithms', status: '⏳ In progress' },
      { topic: '4. OOP Concepts', status: '📅 Upcoming' },
      { topic: '5. Database Systems', status: '📅 Upcoming' },
      { topic: '6. Web Frameworks', status: '📅 Upcoming' },
      { topic: '7. Cloud Basics', status: '📅 Upcoming' },
      { topic: '8. Capstone Project', status: '📅 Upcoming' }
    ],
    skills: [
      { name: 'JavaScript', level: '⭐⭐⭐⭐' },
      { name: 'Python', level: '⭐⭐⭐' },
      { name: 'React', level: '⭐⭐⭐⭐' },
      { name: 'Node.js', level: '⭐⭐' }
    ],
    teaching: {
      course: 'Frontend Development',
      instructor: 'Prof. Mike Johnson',
      schedule: 'Tue/Thu 10-12 PM',
      room: 'Room 203'
    }
  }
};


// ----- course data -----
const courseData = {
  1: { id: 1, name: 'Web Development Bootcamp', price: 2499 },
  2: { id: 2, name: 'Data Science Masterclass', price: 2999 },
  3: { id: 3, name: 'UI/UX Design Pro', price: 1999 },
  4: { id: 4, name: 'Mobile App Development', price: 3499 }
};


// ----- cart -----
let cart = [];
let currentStudentId = null;


// ----- DOM refs -----
const loginScreen = document.getElementById('loginScreen');
const dashboardScreen = document.getElementById('dashboardScreen');
const studentIdInput = document.getElementById('studentIdInput');
const studentPassInput = document.getElementById('studentPassInput');
const loginBtn = document.getElementById('loginBtn');
const loginError = document.getElementById('loginError');
const logoutBtn = document.getElementById('logoutBtn');


// dashboard elements
const displayStudentName = document.getElementById('displayStudentName');
const displayStudentId = document.getElementById('displayStudentId');
const displayStudentEmail = document.getElementById('displayStudentEmail');
const attPresent = document.getElementById('attPresent');
const attAbsent = document.getElementById('attAbsent');
const attTotal = document.getElementById('attTotal');
const attendancePercent = document.getElementById('attendancePercent');
const attProgressFill = document.getElementById('attProgressFill');
const attPercentLabel = document.getElementById('attPercentLabel');
const feeTotal = document.getElementById('feeTotal');
const feePaid = document.getElementById('feePaid');
const feeRemaining = document.getElementById('feeRemaining');
const feeStatusBadge = document.getElementById('feeStatusBadge');
const feeDetailText = document.getElementById('feeDetailText');
const payFeeBtn = document.getElementById('payFeeBtn');
const customPayBtn = document.getElementById('customPayBtn');
const customAmountInput = document.getElementById('customAmountInput');
const pendingCount = document.getElementById('pendingCount');
const pendingLectureList = document.getElementById('pendingLectureList');
const syllabusContainer = document.getElementById('syllabusContainer');
const viewFullSyllabusBtn = document.getElementById('viewFullSyllabusBtn');
const skillsContainer = document.getElementById('skillsContainer');
const teachingContainer = document.getElementById('teachingContainer');


// user detail
const userNameDisplay = document.getElementById('userNameDisplay');
const userIdDisplay = document.getElementById('userIdDisplay');
const userEmailDisplay = document.getElementById('userEmailDisplay');
const userPhoneDisplay = document.getElementById('userPhoneDisplay');
const editUserBtn = document.getElementById('editUserBtn');
const editUserForm = document.getElementById('editUserForm');
const editNameInput = document.getElementById('editNameInput');
const editEmailInput = document.getElementById('editEmailInput');
const editPhoneInput = document.getElementById('editPhoneInput');
const saveUserBtn = document.getElementById('saveUserBtn');
const cancelEditBtn = document.getElementById('cancelEditBtn');


// feedback
const feedbackText = document.getElementById('feedbackText');
const submitFeedbackBtn = document.getElementById('submitFeedbackBtn');
const feedbackStatus = document.getElementById('feedbackStatus');


// cart
const cartContainer = document.getElementById('cartContainer');
const cartTotal = document.getElementById('cartTotal');
const cartTotalAmount = document.getElementById('cartTotalAmount');
const checkoutBtn = document.getElementById('checkoutBtn');
const cartCount = document.getElementById('cartCount');
const cartItemCount = document.getElementById('cartItemCount');


// Toast
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');
let toastTimeout = null;


function showToast(message, icon = 'fa-check-circle') {
  toastMessage.textContent = message;
  toast.querySelector('i').className = `fas ${icon}`;
  toast.classList.add('show');

  clearTimeout(toastTimeout);

  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}


// ----- cart functions -----
function toggleCart(courseId) {
  const idx = cart.indexOf(courseId);

  if (idx > -1) {
    cart.splice(idx, 1);
    showToast('Removed from cart', 'fa-minus-circle');
  } else {
    cart.push(courseId);
    showToast('Added to cart!', 'fa-plus-circle');
  }

  updateCartUI();
}


function updateCartUI() {

  // Update cart count badge
  cartCount.textContent = cart.length;
  cartItemCount.textContent = cart.length + ' items';


  // Update course buttons
  document.querySelectorAll('.course-item').forEach(item => {

    const id = parseInt(item.dataset.id);
    const btn = item.querySelector('.add-cart-btn');

    if (cart.includes(id)) {
      btn.textContent = 'Remove from Cart';
      btn.classList.add('in-cart');
    } else {
      btn.textContent = 'Add to Cart';
      btn.classList.remove('in-cart');
    }

  });


  // Render cart
  if (cart.length === 0) {

    cartContainer.innerHTML =
      '<div style="color: #6f8ba8; text-align: center; padding: 10px 0;">Your cart is empty</div>';

    cartTotal.style.display = 'none';
    checkoutBtn.disabled = true;

    return;
  }


  let total = 0;
  let html = '';

  cart.forEach(id => {

    const course = courseData[id];

    if (!course) return;

    total += course.price;

    html += `
      <div class="cart-item">
        <span>${course.name}</span>
        <span>₹${course.price.toLocaleString('en-IN')}</span>
        <button class="remove-cart-btn" onclick="toggleCart(${id})">✕</button>
      </div>
    `;

  });


  cartContainer.innerHTML = html;
  cartTotal.style.display = 'block';

  cartTotalAmount.textContent =
    '₹' + total.toLocaleString('en-IN');

  checkoutBtn.disabled = false;
}


// ----- checkout -----
function handleCheckout() {

  if (cart.length === 0) {
    showToast('Cart is empty!', 'fa-exclamation-circle');
    return;
  }


  const total = cart.reduce(
    (sum, id) => sum + (courseData[id]?.price || 0),
    0
  );

  const student = studentDB[currentStudentId];

  if (!student) return;


  // Simulate payment
  const confirmMsg = `💰 Order Summary:\n\n${cart.map(id => {

    const c = courseData[id];

    return `• ${c.name} - ₹${c.price.toLocaleString('en-IN')}`;

  }).join('\n')}\n\nTotal: ₹${total.toLocaleString('en-IN')}\n\nProceed with payment?`;


  if (confirm(confirmMsg)) {

    // Add purchased courses to student's syllabus or pending lectures
    cart.forEach(id => {

      const course = courseData[id];

      if (course) {

        student.syllabus.push({
          topic: `${course.name} (Purchased)`,
          status: '📅 Upcoming'
        });

      }

    });


    // Clear cart
    cart = [];

    updateCartUI();
    renderDashboard(student);

    showToast(
      `✅ Payment successful! ₹${total.toLocaleString('en-IN')} paid. Courses added to your syllabus.`,
      'fa-check-circle'
    );
  }
}


// ----- render full dashboard -----
function renderDashboard(student) {

  // name + id + email
  displayStudentName.textContent = student.name;
  displayStudentId.textContent = student.id;
  displayStudentEmail.innerHTML =
    `<i class="fas fa-envelope"></i> ${student.email}`;


  // attendance
  const { present, absent, total } = student.attendance;

  attPresent.textContent = present;
  attAbsent.textContent = absent;
  attTotal.textContent = total;

  const percent =
    total ? Math.round((present / total) * 100) : 0;

  attendancePercent.textContent = percent + '%';
  attProgressFill.style.width = percent + '%';
  attPercentLabel.textContent = percent + '%';


  // fees
  const { total: totalFee, paid } = student.fees;
  const remaining = totalFee - paid;

  feeTotal.textContent =
    '₹' + totalFee.toLocaleString('en-IN');

  feePaid.textContent =
    '₹' + paid.toLocaleString('en-IN');

  feeRemaining.textContent =
    '₹' + remaining.toLocaleString('en-IN');


  if (remaining <= 0) {

    feeStatusBadge.textContent = '✅ Paid';
    feeStatusBadge.style.background = '#dff0e6';
    feeStatusBadge.style.color = '#1b6b3f';

    feeDetailText.textContent = 'Fully paid';

    payFeeBtn.innerHTML =
      '<i class="fas fa-check-circle"></i> Paid';

    payFeeBtn.className = 'pay-btn paid';
    payFeeBtn.disabled = true;
    customPayBtn.disabled = true;

  } else {

    feeStatusBadge.textContent = 'Due';
    feeStatusBadge.style.background = '#ffeee5';
    feeStatusBadge.style.color = '#b5532b';

    feeDetailText.textContent =
      '₹' + remaining.toLocaleString('en-IN') + ' due';

    payFeeBtn.innerHTML =
      '<i class="fas fa-circle-check"></i> Pay now';

    payFeeBtn.className = 'pay-btn';
    payFeeBtn.disabled = false;
    customPayBtn.disabled = false;
  }


  // pending lectures
  const pending = student.pendingLectures || [];

  pendingCount.textContent = pending.length;
  pendingLectureList.innerHTML = '';


  if (pending.length === 0) {

    pendingLectureList.innerHTML =
      '<li style="color: #3f698b; justify-content: center;">🎉 No pending lectures</li>';

  } else {

    pending.forEach(item => {

      const li = document.createElement('li');

      li.innerHTML =
        `<span class="lecture-topic">${item.topic}</span><span class="pending-badge">Pending</span>`;

      pendingLectureList.appendChild(li);

    });
  }


  // syllabus
  const syllabus = student.syllabus || [];

  syllabusContainer.innerHTML = '';

  syllabus.forEach(item => {

    const div = document.createElement('div');

    div.className = 'syllabus-item';

    div.innerHTML =
      `<span class="syllabus-topic">${item.topic}</span><span class="syllabus-status">${item.status}</span>`;

    syllabusContainer.appendChild(div);

  });


  // skills
  const skills = student.skills || [];

  skillsContainer.innerHTML = '';

  skills.forEach(skill => {

    const div = document.createElement('div');

    div.className = 'syllabus-item';

    div.innerHTML =
      `<span class="syllabus-topic">${skill.name}</span><span class="syllabus-status">${skill.level}</span>`;

    skillsContainer.appendChild(div);

  });


  // teaching info
  const teaching = student.teaching || {};

  teachingContainer.innerHTML = `
    <div class="detail-row">
      <span class="detail-label">Course</span>
      <span class="detail-value">${teaching.course || 'N/A'}</span>
    </div>

    <div class="detail-row">
      <span class="detail-label">Instructor</span>
      <span class="detail-value">${teaching.instructor || 'N/A'}</span>
    </div>

    <div class="detail-row">
      <span class="detail-label">Schedule</span>
      <span class="detail-value">${teaching.schedule || 'N/A'}</span>
    </div>

    <div class="detail-row">
      <span class="detail-label">Room</span>
      <span class="detail-value">${teaching.room || 'N/A'}</span>
    </div>
  `;


  // user details
  userNameDisplay.textContent = student.name;
  userIdDisplay.textContent = student.id;
  userEmailDisplay.textContent = student.email;
  userPhoneDisplay.textContent =
    student.phone || '+91 555-123-4567';


  // update edit form values
  editNameInput.value = student.name;
  editEmailInput.value = student.email;
  editPhoneInput.value =
    student.phone || '+91 555-123-4567';


  // update cart UI
  updateCartUI();
}


// ----- login -----
function handleLogin() {

  const id = studentIdInput.value.trim();
  const pass = studentPassInput.value.trim();
  const student = studentDB[id];


  if (student && student.password === pass) {

    loginError.style.display = 'none';

    currentStudentId = id;

    // Reset cart on login
    cart = [];

    renderDashboard(student);

    loginScreen.classList.add('hidden');
    dashboardScreen.classList.remove('hidden');

    showToast(
      `Welcome back, ${student.name}!`,
      'fa-graduation-cap'
    );

  } else {

    loginError.style.display = 'block';

    showToast(
      'Invalid ID or password',
      'fa-circle-exclamation'
    );

  }
}


// ----- pay full fee -----
function handlePayFee() {

  if (!currentStudentId) {
    showToast(
      'Please log in first',
      'fa-exclamation-triangle'
    );
    return;
  }

  const student = studentDB[currentStudentId];

  if (!student) return;

  const { total, paid } = student.fees;


  if (paid >= total) {

    showToast(
      'Fees already fully paid! ✅',
      'fa-check-circle'
    );

    return;
  }


  const remaining = total - paid;

  student.fees.paid = total;

  renderDashboard(student);

  showToast(
    `✅ Payment successful! Paid ₹${remaining.toLocaleString('en-IN')}.`,
    'fa-circle-check'
  );
}


// ----- custom payment -----
function handleCustomPay() {

  if (!currentStudentId) {
    showToast(
      'Please log in first',
      'fa-exclamation-triangle'
    );
    return;
  }

  const student = studentDB[currentStudentId];

  if (!student) return;

  const { total, paid } = student.fees;


  if (paid >= total) {

    showToast(
      'Fees already fully paid! ✅',
      'fa-check-circle'
    );

    return;
  }


  const amount = parseFloat(customAmountInput.value);


  if (!amount || amount <= 0) {

    showToast(
      'Please enter a valid amount',
      'fa-exclamation-circle'
    );

    return;
  }


  const remaining = total - paid;
  const payAmount = Math.min(amount, remaining);


  if (payAmount <= 0) {

    showToast(
      'No amount due',
      'fa-info-circle'
    );

    return;
  }


  student.fees.paid += payAmount;

  renderDashboard(student);

  showToast(
    `✅ Paid ₹${payAmount.toFixed(2)}. Remaining: ₹${(remaining - payAmount).toFixed(2)}`,
    'fa-circle-check'
  );
}


// ----- view full syllabus -----
function handleViewFullSyllabus() {

  if (!currentStudentId) {
    showToast(
      'Please log in first',
      'fa-exclamation-triangle'
    );
    return;
  }

  const student = studentDB[currentStudentId];

  if (!student) return;

  const topics =
    student.syllabus
      .map(s => `• ${s.topic}  ${s.status}`)
      .join('\n');

  alert(
    `📚 Full syllabus for ${student.name}:\n\n${topics}`
  );

  showToast(
    'Syllabus displayed in alert',
    'fa-book-open'
  );
}


// ----- logout -----
function handleLogout() {

  dashboardScreen.classList.add('hidden');
  loginScreen.classList.remove('hidden');

  studentIdInput.value = 'S1001';
  studentPassInput.value = '1234';

  loginError.style.display = 'none';

  currentStudentId = null;
  cart = [];

  editUserForm.classList.add('hidden');

  showToast(
    'Logged out successfully',
    'fa-sign-out-alt'
  );
}


// ----- user detail update -----
function toggleEditForm() {

  editUserForm.classList.toggle('hidden');

  if (!editUserForm.classList.contains('hidden')) {

    const student = studentDB[currentStudentId];

    if (student) {

      editNameInput.value = student.name;
      editEmailInput.value = student.email;
      editPhoneInput.value =
        student.phone || '+91 555-123-4567';

    }
  }
}


function saveUserDetails() {

  if (!currentStudentId) {
    showToast(
      'Please log in first',
      'fa-exclamation-triangle'
    );
    return;
  }

  const student = studentDB[currentStudentId];

  if (!student) return;


  const newName = editNameInput.value.trim();
  const newEmail = editEmailInput.value.trim();
  const newPhone = editPhoneInput.value.trim();


  if (!newName || !newEmail) {

    showToast(
      'Name and Email are required',
      'fa-exclamation-circle'
    );

    return;
  }


  student.name = newName;
  student.email = newEmail;
  student.phone = newPhone;


  renderDashboard(student);

  editUserForm.classList.add('hidden');

  showToast(
    '✅ Profile updated successfully!',
    'fa-check-circle'
  );
}


// ----- feedback -----
function submitFeedback() {

  if (!currentStudentId) {
    showToast(
      'Please log in first',
      'fa-exclamation-triangle'
    );
    return;
  }

  const student = studentDB[currentStudentId];

  if (!student) return;


  const feedback = feedbackText.value.trim();


  if (!feedback) {

    feedbackStatus.textContent =
      '⚠️ Please write your feedback before submitting.';

    feedbackStatus.style.color = '#b5532b';

    return;
  }


  feedbackStatus.textContent =
    '✅ Thank you for your feedback, ' + student.name + '!';

  feedbackStatus.style.color = '#1b6b3f';

  feedbackText.value = '';

  showToast(
    'Feedback submitted successfully!',
    'fa-paper-plane'
  );


  setTimeout(() => {

    feedbackStatus.textContent = '';

  }, 5000);
}


// ----- event listeners -----
loginBtn.addEventListener('click', handleLogin);

document.addEventListener('keydown', (e) => {

  if (
    e.key === 'Enter' &&
    !loginScreen.classList.contains('hidden')
  ) {
    handleLogin();
  }

});

logoutBtn.addEventListener('click', handleLogout);

payFeeBtn.addEventListener('click', handlePayFee);

customPayBtn.addEventListener('click', handleCustomPay);

viewFullSyllabusBtn.addEventListener(
  'click',
  handleViewFullSyllabus
);

editUserBtn.addEventListener(
  'click',
  toggleEditForm
);

saveUserBtn.addEventListener(
  'click',
  saveUserDetails
);

cancelEditBtn.addEventListener('click', () => {
  editUserForm.classList.add('hidden');
});

submitFeedbackBtn.addEventListener(
  'click',
  submitFeedback
);

checkoutBtn.addEventListener(
  'click',
  handleCheckout
);


// pre-fill demo on load
window.addEventListener('load', () => {

  studentIdInput.value = 'S1001';
  studentPassInput.value = '1234';

});