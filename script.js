// Initialize Lucide Icons
lucide.createIcons();

// Custom Cursor Following Effect
const cursorDot = document.getElementById('cursor-dot');
const cursorGlow = document.getElementById('cursor-glow');

window.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    
    if (cursorDot && cursorGlow) {
        cursorDot.style.left = `${clientX}px`;
        cursorDot.style.top = `${clientY}px`;
        
        cursorGlow.style.left = `${clientX}px`;
        cursorGlow.style.top = `${clientY}px`;
    }
});

// Typing Text Animation Effect
const roles = [
    "Web Developer",
    "Mahasiswa Pendidikan Teknologi Informasi",
    "DBMS Specialist",
    "Python Engineer"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingText = document.getElementById('typing-text');

function typeEffect() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
}

document.addEventListener('DOMContentLoaded', typeEffect);

// Stats Animated Counter
const counters = document.querySelectorAll('[data-target]');
let animated = false;

window.addEventListener('scroll', () => {
    const aboutSection = document.getElementById('about');
    if (!aboutSection) return;

    const sectionPos = aboutSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight;

    if (sectionPos < screenPos && !animated) {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            if (isNaN(target)) return;
            
            let count = 0;
            const speed = target / 30;

            const updateCount = () => {
                count += speed;
                if (count < target) {
                    counter.innerText = Math.ceil(count);
                    setTimeout(updateCount, 40);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
        animated = true;
    }
});

// Project Filtering Feature
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Interactive Mini Terminal
const terminalInput = document.getElementById('terminal-input');
const terminalBody = document.getElementById('terminal-body');

if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = terminalInput.value.trim().toLowerCase();
            if (!command) return;

            // Output command user
            const userLine = document.createElement('p');
            userLine.className = "text-slate-300 mt-2";
            userLine.innerHTML = `<span class="text-cyan-400 font-bold">&gt; ${command}</span>`;
            terminalBody.appendChild(userLine);

            // Response logic
            let response = '';
            switch (command) {
                case 'help':
                    response = "Perintah yang tersedia:<br>- <span class='text-cyan-400'>about</span>: Profil singkat<br>- <span class='text-cyan-400'>skills</span>: Daftar keahlian<br>- <span class='text-cyan-400'>projects</span>: Daftar proyek<br>- <span class='text-cyan-400'>clear</span>: Bersihkan layar terminal";
                    break;
                case 'about':
                    response = "Nauraffa Rayyano — Mahasiswa Teknik & Web Developer yang fokus pada modern JS framework dan RDBMS.";
                    break;
                case 'skills':
                    response = "Frontend: Next.js, React, Tailwind CSS<br>Backend & DB: MySQL, MariaDB, Python<br>Tools: VS Code, Git";
                    break;
                case 'projects':
                    response = "1. Interactive Cyber Portfolio (Next.js & Tailwind)<br>2. Hospital Management RDBMS (10 Tabel MySQL)";
                    break;
                case 'clear':
                    terminalBody.innerHTML = '';
                    terminalInput.value = '';
                    return;
                default:
                    response = `Perintah '${command}' tidak dikenali. Ketik <span class='text-cyan-400'>'help'</span> untuk bantuan.`;
            }

            const responseLine = document.createElement('p');
            responseLine.className = "text-slate-400 mt-1";
            responseLine.innerHTML = response;
            terminalBody.appendChild(responseLine);

            terminalInput.value = '';
            terminalBody.scrollTop = terminalBody.scrollHeight;
        }
    });
}

// Project Modal Popup Logic
const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const closeModalBtns = [document.getElementById('close-modal'), document.getElementById('close-modal-btn')];

document.querySelectorAll('.open-modal-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        modalTitle.innerText = btn.getAttribute('data-title');
        modalDesc.innerText = btn.getAttribute('data-desc');
        modal.classList.remove('opacity-0', 'pointer-events-none');
    });
});

closeModalBtns.forEach(btn => {
    if (btn) {
        btn.addEventListener('click', () => {
            modal.classList.add('opacity-0', 'pointer-events-none');
        });
    }
});

// Contact Form Handler
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Terima kasih! Pesan Anda telah berhasil terkirim.');
        contactForm.reset();
    });
}