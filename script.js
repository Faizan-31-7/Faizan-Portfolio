// ===== Enlarged Image Modal Logic =====
const imgEnlargeModal = document.getElementById('img-enlarge-modal');
const imgEnlarge = imgEnlargeModal ? imgEnlargeModal.querySelector('img') : null;
const imgEnlargeClose = document.getElementById('img-enlarge-close');
if (imgEnlargeModal && imgEnlarge && imgEnlargeClose) {
    imgEnlargeClose.addEventListener('click', function() {
        imgEnlargeModal.style.display = 'none';
        document.body.style.overflow = '';
    });
    imgEnlargeModal.addEventListener('click', function(e) {
        if (e.target === imgEnlargeModal) {
            imgEnlargeModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
}

const canvas = document.getElementById('bg-particles');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    const numParticles = 36;
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    for (let i = 0; i < numParticles; i++) {
        particles.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            r: Math.random() * 2.5 + 1.5,
            dx: (Math.random() - 0.5) * 0.3,
            dy: (Math.random() - 0.5) * 0.3,
            alpha: Math.random() * 0.5 + 0.3
        });
    }
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let p of particles) {
            ctx.save();
            ctx.globalAlpha = p.alpha;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
            ctx.fillStyle = '#00aaff';
            ctx.shadowColor = '#0081cf';
            ctx.shadowBlur = 12;
            ctx.fill();
            ctx.restore();
            p.x += p.dx;
            p.y += p.dy;
            if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
        }
        requestAnimationFrame(animateParticles);
    }
    animateParticles();
}


const projectsData = [
    {
        title: "Complete SEO",
        desc: "A client came to me, with his website which had very low traffic and engagement. I conducted a thorough analysis and implemented a comprehensive SEO strategy, resulting in a significant increase in organic traffic and user engagement.",
        images: ["2.jpg"]
    },
    {
        title: "Article Writing",
        desc: "Here a client asked me to write a article on a specific niche. First I did the complete Keyword Research, extracted the most relevant keywords, studied the competition, and then created a detailed outline. After getting approval on the outline, I wrote the article, ensuring it was optimized for SEO and included all the necessary information.",
        images: ["article.png"],
        pdf: "Meta Quest 4_ The Ultimate Guide to Meta's Next VR Headset (2027).pdf"
    },
    {
        title: "On-Page SEO",
        desc: "Here I did a complete SEO audit of a website and found major issues in the site's structure, content, and backlinks, basically it's On-Page SEO was very poor. So I implemented a series of optimizations, including improving meta tags, keyword research, enhancing content quality, and building high-quality backlinks.",
        images: ["4.jpg"]
    }
];

const modal = document.getElementById('project-modal');
const modalImagesList = document.getElementById('modal-images-list');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalClose = document.querySelector('.modal-close');
const modalPrev = document.getElementById('modal-prev');
const modalNext = document.getElementById('modal-next');
let currentProject = 0;

function showProjectModal(index) {
  const data = projectsData[index];
  const modal = document.getElementById('project-modal');
  const imageArea = modal.querySelector('.project-modal-image-area');
  const title = modal.querySelector('#project-modal-title');
  const desc = modal.querySelector('#project-modal-desc');
  const extra = modal.querySelector('#project-modal-extra');
  imageArea.innerHTML = '';
  data.images.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = data.title;
    imageArea.appendChild(img);
  });
  title.textContent = data.title;
  desc.textContent = data.desc;
  extra.innerHTML = '';
  if (data.pdf) {
    const pdfBtn = document.createElement('a');
    pdfBtn.href = data.pdf;
    pdfBtn.download = '';
    pdfBtn.textContent = 'Download PDF';
    pdfBtn.className = 'project-modal-btn';
    pdfBtn.target = '_blank';
    extra.appendChild(pdfBtn);
  }
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

function showNextProject() {
    let next = (currentProject + 1) % projectsData.length;
    showProjectModal(next);
}

function showPrevProject() {
    let prev = (currentProject - 1 + projectsData.length) % projectsData.length;
    showProjectModal(prev);
}

document.querySelectorAll('.project-card .project-btn').forEach((btn, idx) => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        showProjectModal(idx);
    });
});

modalClose && modalClose.addEventListener('click', closeProjectModal);
modalNext && modalNext.addEventListener('click', showNextProject);
modalPrev && modalPrev.addEventListener('click', showPrevProject);


modal && modal.addEventListener('click', function(e) {
    if (e.target === modal) closeProjectModal();
});
document.querySelector('.project-modal-close').onclick = function() {
  document.getElementById('project-modal').style.display = 'none';
  document.body.style.overflow = '';
};

modal.addEventListener('click', function(e) {
  if (e.target.classList.contains('project-modal-close')) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
});

modal.querySelector('.project-modal-image-area').onclick = function(e) {
  if (e.target.tagName === 'IMG') {
    const overlay = document.createElement('div');
    overlay.className = 'modal-image-overlay';
    const bigImg = document.createElement('img');
    bigImg.src = e.target.src;
    bigImg.alt = e.target.alt;
    overlay.appendChild(bigImg);
    document.body.appendChild(overlay);
    overlay.onclick = function() {
      document.body.removeChild(overlay);
    };
  }
};


function createStars(containerId, numStars = 40) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.position = 'absolute';
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.background = '#fff';
        star.style.borderRadius = '50%';
        star.style.opacity = Math.random() * 0.7 + 0.3;
        star.style.filter = 'blur(0.5px)';
        star.style.animation = `starTwinkle ${Math.random() * 2 + 1.5}s infinite alternate`;
        container.appendChild(star);
    }
}

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `
@keyframes starTwinkle {
    from { opacity: 0.3; }
    to { opacity: 1; }
}
`;
document.head.appendChild(styleSheet);


document.addEventListener('DOMContentLoaded', () => {
    createStars('stars', 40);
});

document.querySelectorAll('.social-media a').forEach((icon, idx) => {
    const float = () => {
        const x = (Math.random() - 0.5) * 6;
        const y = (Math.random() - 0.5) * 6;
        icon.style.transform = `translate(${x}px, ${y}px) scale(1.0)`;
        setTimeout(float, 1200 + Math.random() * 800);
    };
    setTimeout(float, 500 + idx * 200);
    icon.addEventListener('mouseenter', () => {
        icon.style.transform = 'scale(1.3) rotate(8deg)';
    });
    icon.addEventListener('mouseleave', () => {
        icon.style.transform = '';
    });
});

const revealElements = document.querySelectorAll('.about, .services, .projects');
const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;
    revealElements.forEach(el => {
        const boxTop = el.getBoundingClientRect().top;
        if (boxTop < triggerBottom) {
            el.style.opacity = 1;
            el.style.transform = 'translateY(0)';
            el.style.transition = 'opacity 0.8s cubic-bezier(.4,2,.6,1), transform 0.8s cubic-bezier(.4,2,.6,1)';
        } else {
            el.style.opacity = 0;
            el.style.transform = 'translateY(60px)';
        }
    });
};
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('DOMContentLoaded', () => {

    revealElements.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(60px)';
    });
    revealOnScroll();
});

document.querySelectorAll('.certification-card img').forEach(img => {
    img.addEventListener('mouseenter', function() {
        let tooltip = document.createElement('div');
        tooltip.className = 'cert-tooltip';
        tooltip.textContent = img.alt;
        document.body.appendChild(tooltip);
        const rect = img.getBoundingClientRect();
        tooltip.style.left = rect.left + window.scrollX + rect.width/2 - tooltip.offsetWidth/2 + 'px';
        tooltip.style.top = rect.top + window.scrollY - 38 + 'px';
        img._certTooltip = tooltip;
    });
    img.addEventListener('mouseleave', function() {
        if (img._certTooltip) {
            document.body.removeChild(img._certTooltip);
            img._certTooltip = null;
        }
    });
    // Click to enlarge
    img.addEventListener('click', function() {
        let overlay = document.createElement('div');
        overlay.className = 'cert-enlarge-overlay';
        let bigImg = document.createElement('img');
        bigImg.src = img.src;
        bigImg.alt = img.alt;
        overlay.appendChild(bigImg);
        let closeBtn = document.createElement('span');
        closeBtn.className = 'cert-enlarge-close';
        closeBtn.innerHTML = '&times;';
        overlay.appendChild(closeBtn);
        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';
        closeBtn.onclick = function() {
            document.body.removeChild(overlay);
            document.body.style.overflow = '';
        };
        overlay.onclick = function(e) {
            if (e.target === overlay) {
                document.body.removeChild(overlay);
                document.body.style.overflow = '';
            }
        };
    });
});
// ===== Footer Social Icon Animation =====
document.querySelectorAll('.footer-alt-social a').forEach((icon, idx) => {
    icon.addEventListener('mouseenter', () => {
        icon.style.transform = 'scale(1.18) rotate(-6deg)';
    });
    icon.addEventListener('mouseleave', () => {
        icon.style.transform = '';
    });
});

// ===== Mobile Menu Icon Toggle =====
const menuIcon = document.getElementById('menu-icon');
const navbar = document.querySelector('.navbar');
if (menuIcon && navbar) {
    menuIcon.addEventListener('click', function() {
        navbar.classList.toggle('active');
    });
    // Optional: Hide navbar when clicking outside
    document.addEventListener('click', function(e) {
        if (!navbar.contains(e.target) && !menuIcon.contains(e.target)) {
            navbar.classList.remove('active');
        }
    });
}