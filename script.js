document.querySelectorAll('.copy-card').forEach(function (card) {
card.addEventListener('click', async function () {
    var value = card.getAttribute('data-copy');
    var status = card.querySelector('.copy-status');
    try {
    await navigator.clipboard.writeText(value);
    status.textContent = '> copied';
    } catch (e) {
    status.textContent = value;
    }
    setTimeout(function () { status.textContent = ''; }, 1500);
});
});

(function () {
var TOTAL_CANDIDATES = 12;
var candidates = [];
for (var i = 1; i <= TOTAL_CANDIDATES; i++) {
    candidates.push('images/xiaohu/' + i + '.jpg');
}

var track = document.getElementById('cat-track');
var dots = document.getElementById('cat-dots');
var prevBtn = document.getElementById('cat-prev');
var nextBtn = document.getElementById('cat-next');

if (!track || !dots || !prevBtn || !nextBtn) return;

var index = 0;

function renderSlides() {
    track.innerHTML = candidates.map(function (src) {
    return '<div class="w-full shrink-0"><img src="' + src + '" alt="Xiao Hu" class="h-80 w-full object-cover sm:h-96" /></div>';
    }).join('');

    dots.innerHTML = candidates.map(function (_, i) {
    return '<button type="button" data-index="' + i + '" class="h-2.5 w-2.5 rounded-full bg-ink/20 transition-all duration-200 hover:bg-ink/40" aria-label="Go to slide ' + (i + 1) + '"></button>';
    }).join('');
}

function updateDots() {
    Array.from(dots.children).forEach(function (dot, i) {
    dot.classList.toggle('bg-ink', i === index);
    dot.classList.toggle('w-6', i === index);
    dot.classList.toggle('bg-ink/20', i !== index);
    });
}

function show(nextIndex) {
    index = (nextIndex + candidates.length) % candidates.length;
    track.style.transform = 'translateX(-' + (index * 100) + '%)';
    updateDots();
}

renderSlides();
show(0);

prevBtn.addEventListener('click', function () {
    show(index - 1);
});

nextBtn.addEventListener('click', function () {
    show(index + 1);
});

dots.addEventListener('click', function (event) {
    var button = event.target.closest('[data-index]');
    if (!button) return;
    show(Number(button.dataset.index));
});
})();