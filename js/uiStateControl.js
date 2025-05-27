import * as el from './constant.js';


document.addEventListener('DOMContentLoaded', () => {
  const btn = el.btn_getIntoWelcomePage();
  const page = el.welcomePage();

  // Get the load count from localStorage, or initialize it to 0
  let loadCount = parseInt(localStorage.getItem('loadCount')) || 0;

  // Increment the count and update localStorage
  loadCount++;
  if (loadCount > 50) {
    loadCount = 1; // Reset after 50 refreshes
  }
  localStorage.setItem('loadCount', loadCount);

  const shouldShowWelcome = loadCount === 1;

  if (btn && page) {
    // Show welcome screen only on first load of the cycle
    if (shouldShowWelcome) {
      page.classList.remove('hidden', '-translate-y-full', 'opacity-0');
      page.classList.add('translate-y-0');
    } else {
      page.classList.add('hidden');
    }

    // Dismiss button logic
    btn.addEventListener('click', () => {
      page.classList.remove('translate-y-0');
      requestAnimationFrame(() => {
        page.classList.add('-translate-y-full', 'opacity-0');
      });
      setTimeout(() => {
        page.classList.add('hidden');
      }, 1500);
    });
  } else {
    console.warn('Welcome page button or container not found in DOM');
  }
});



let leftOpen = true;
let rightOpen = false;

function updateMainContentMargin() {
  el.mainContent.classList.remove('md:ml-0', 'md:ml-64', 'md:mr-0', 'md:mr-64');


}

// Desktop toggles
el.desktopLeftToggle.addEventListener('click', () => {
  leftOpen = !leftOpen;
  el.leftSidebar.classList.toggle('w-64', leftOpen);
  el.leftSidebar.classList.toggle('w-0', !leftOpen);
  updateMainContentMargin();
});

el.desktopRightToggle.addEventListener('click', () => {
  rightOpen = !rightOpen;
  el.rightSidebar.classList.toggle('md:w-0', !rightOpen);
  el.rightSidebar.classList.toggle('md:w-80', rightOpen);
  updateMainContentMargin();
});

// Mobile toggles
el.mobileLeftToggle.addEventListener('click', () => {
  el.leftSidebar.classList.remove('-translate-x-full');
  el.rightSidebar.classList.add('translate-x-full');
  el.overlay.classList.remove('hidden');
});

el.mobileRightToggle.addEventListener('click', () => {
  el.rightSidebar.classList.remove('translate-x-full');
  el.rightSidebar.classList.toggle('w-70', rightOpen);
  el.leftSidebar.classList.add('-translate-x-full');
  el.overlay.classList.remove('hidden');
});

el.overlay.addEventListener('click', () => {
  el.leftSidebar.classList.add('-translate-x-full');
  el.rightSidebar.classList.add('translate-x-full');
  el.overlay.classList.add('hidden');
});

// Initial layout state
updateMainContentMargin();

function showCustomToast({
  message = "Welcome To Quick Tools",
  emoji = "🎉",
  bgColor = "bg-green-100",
  barColor = "bg-green-600",
  duration = 2000
} = {}) {
  const toast = document.getElementById("customToast");
  const content = document.getElementById("toastContent");
  const icon = document.getElementById("toastIcon");
  const text = document.getElementById("toastMessage");
  const timer = document.getElementById("toastTimer");

  if (window.innerWidth < 1024) return;

  // Update content
  icon.textContent = emoji;
  text.textContent = message;
  el.toastContainer.classList.add(`${bgColor}`)
  content.className = `flex items-center gap-3 px-3 text-black`;
  timer.className = `absolute bottom-0 left-0 h-1 w-full ${barColor} transition-[width] duration-[${duration}ms] ease-linear`;

  // Make visible & animate in
  toast.classList.remove("hidden");
  requestAnimationFrame(() => {
    toast.classList.remove("-translate-y-full", "opacity-0");
    toast.classList.add("translate-y-0", "opacity-100");
    timer.style.width = "0%";
  });

  // Hide after duration
  const hideTimeout = setTimeout(() => {
    toast.classList.remove("translate-y-0", "opacity-100");
    toast.classList.add("-translate-y-full", "opacity-0");

    setTimeout(() => {
      toast.classList.add("hidden");
      timer.style.width = "100%"; // reset for next time
    }, 300); // Must match transition duration
  }, duration);

  return () => clearTimeout(hideTimeout);
}

showCustomToast()



// Clock and Calender 
let visible = true

function UpdateClock() {


  const now = new Date();

  let hr = now.getHours()
  let min = now.getMinutes()
  let ampm = hr > 12 ? 'AM' : 'PM   '

  hr = hr % 12 || 12
  hr = hr.toString().padStart(2, '0')
  min = min.toString().padStart(2, '0')

  el.digitalClock.innerHTML = `
  <span class="lg:text-6xl text-4xl font-inria">${hr}</span>
  <span class="lg:text-6xl text-4xl font-inria ${visible ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500">:</span>
  <span class="lg:text-6xl text-4xl font-inria">${min}</span>
  <span> ${ampm}</span>
`;


  visible = !visible

}

setInterval(UpdateClock, 1000)
UpdateClock()


let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  return (new Date(year, month, 1).getDay() + 1) % 7 // 0 = Sunday
}

function renderCalendar(year, month) {
  const today = new Date();
  const isThisMonth = today.getFullYear() === year && today.getMonth() === month;

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  el.monthYear.innerText = `${monthNames[month]} ${year}`;

  el.days.innerHTML = ''; // Clear old days

  // Add animation class
  el.days.classList.remove('animate-fadeIn');
  void el.days.offsetWidth; // Trigger reflow
  el.days.classList.add('animate-fadeIn');

  // Empty placeholders before the 1st
  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement("span");
    empty.innerText = "";
    el.days.appendChild(empty);
  }

  // Add each day
  for (let i = 1; i <= daysInMonth; i++) {
    const day = document.createElement("span");
    day.innerText = i;

    // Base style
    day.className = "p-2 rounded cursor-pointer transition duration-200 ease-in-out hover:bg-blue-100";

    // Highlight today
    if (isThisMonth && i === today.getDate()) {
      day.classList.add("bg-blue-200", "font-semibold", "text-blue-800");
    }

    const dayOfWeek = new Date(year, month, i).getDay(); // Get the day of the week
    if (dayOfWeek === 5) { // 5 = Friday
      day.classList.add("text-red-700", "font-medium");
    }

    el.days.appendChild(day);
  }
}

function updateCalendar(delta) {
  currentMonth += delta;

  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  } else if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }

  renderCalendar(currentYear, currentMonth);
}

el.prev.addEventListener('click', () => updateCalendar(-1));
el.next.addEventListener('click', () => updateCalendar(1));

renderCalendar(currentYear, currentMonth);





