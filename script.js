// --- STATE MANAGEMENT (Local Storage) ---
let userData = JSON.parse(localStorage.getItem('luaMasterData')) || {
    xp: 0,
    completedModules: [],
    badge: 'Newbie Lua'
};

// Update Badge based on XP
function updateBadge() {
    if (userData.xp > 500) userData.badge = 'Lua Master 🐉';
    else if (userData.xp > 200) userData.badge = 'Intermediate Coder 🧙‍♂️';
    else if (userData.xp > 50) userData.badge = 'Lua Explorer 🕵️';
    
    document.getElementById('badge-text').innerText = userData.badge;
    document.getElementById('xp-display').innerText = userData.xp;
    localStorage.setItem('luaMasterData', JSON.stringify(userData));
}

// --- DATABASE MATERI & QUIZ ---
// Mudah di-scale. Tinggal tambah object baru ke array ini.
const materiList = [
    {
        id: "m1",
        title: "1. Kenalan Sama Lua 👋",
        level: "Basic",
        content: `
            <h2>Apa itu Lua?</h2>
            <p>Bro, bayangin Lua itu kayak bahasa gaul di dunia programming: ringan, cepet tanggap, dan gampang nyambung sama siapa aja. Lua sering banget dipake buat bikin script game gede kayak <strong>Roblox</strong>, World of Warcraft, sampe Angry Birds!</p><br>
            <p>Sintaksnya tuh *clean* banget, nggak butuh titik koma (;) di akhir baris kek bahasa sebelah yang bikin overthinking.</p>
        `,
        quiz: {
            question: "Game apa di bawah ini yang terkenal pakai Lua buat scriptingnya?",
            options: ["Minecraft", "Roblox", "Valorant"],
            answer: 1 // index dari array options
        }
    },
    {
        id: "m2",
        title: "2. Variabel: Si Wadah Tupperware 📦",
        level: "Basic",
        content: `
            <h2>Variabel & Tipe Data</h2>
            <p>Variabel itu ibarat kotak Tupperware punya emak. Kamu bisa isi apa aja: angka, teks, atau boolean (True/False). Di Lua, kamu cukup nulis <code>local namaWadah = isinya</code>.</p><br>
            <p><strong>Contoh:</strong><br>
            <code>local namaPlayer = "Zilong"</code><br>
            <code>local hp = 100</code></p>
            <br>
            <div class="editor-container">
                <div class="editor-header">Simulasi Code Editor <button class="btn-run" onclick="runCode('code1', 'out1')">Run ▶</button></div>
                <textarea id="code1" class="code-editor">local namaku = "Budi"&#10;print("Halo, namaku adalah " .. namaku)</textarea>
                <div id="out1" class="console-output">Output akan muncul di sini...</div>
            </div>
        `,
        quiz: {
            question: "Cara yang bener buat bikin variabel lokal di Lua adalah?",
            options: ["var nama = 'x'", "local nama = 'x'", "let nama = 'x'"],
            answer: 1
        }
    },
    {
        id: "m3",
        title: "3. Table: Senjata Rahasia Lua ⚔️",
        level: "Intermediate",
        content: `
            <h2>Table = Array + Dictionary</h2>
            <p>Kalo di bahasa lain ada Array, List, Dictionary... di Lua cuma ada <strong>Table</strong>. Ini fitur paling OP (Overpowered) di Lua. Kamu bisa simpan data berjejer, atau pakai kunci (key-value).</p><br>
            <p><strong>Contoh Inventory Game:</strong></p>
            <div class="editor-container">
                <div class="editor-header">Coba Sendiri <button class="btn-run" onclick="runCode('code2', 'out2')">Run ▶</button></div>
                <textarea id="code2" class="code-editor">local inventory = {"Pedang", "Potion", "Tameng"}&#10;print("Item pertamaku: " .. inventory[1])</textarea>
                <div id="out2" class="console-output"></div>
            </div>
            <p><small>*Fun fact: Index table di Lua itu mulainya dari 1, bukan 0 kayak bahasa lain! Gen Z banget, nggak suka mulai dari nol hehe.</small></p>
        `,
        quiz: {
            question: "Index pertama dari sebuah Table di Lua dimulai dari angka berapa?",
            options: ["0", "1", "-1"],
            answer: 1
        }
    }
    // Tambahkan m4, m5, dst di sini sesuai silabus
];

const miniProjects = [
    {
        title: "Kalkulator Mini",
        desc: "Buat fungsi tambah, kurang, kali, bagi menggunakan function di Lua.",
        icon: "fa-calculator"
    },
    {
        title: "Roblox Part Color Script",
        desc: "Simulasi script ganti warna part di Roblox Studio ketika diinjak.",
        icon: "fa-cube"
    }
];

// --- CORE ROUTING & RENDERER ---
const appContainer = document.getElementById('app-container');

function navigate(page, params = null) {
    // Update active nav
    document.querySelectorAll('.nav-links li').forEach(li => li.classList.remove('active'));
    if(document.getElementById(`nav-${page}`)) {
        document.getElementById(`nav-${page}`).classList.add('active');
    }

    if (page === 'home') renderHome();
    else if (page === 'materi') renderMateriList();
    else if (page === 'materi-detail') renderMateriDetail(params);
    else if (page === 'project') renderProjects();
    else if (page === 'progress') renderProgress();
    
    updateBadge();
}

// --- VIEWS ---

function renderHome() {
    appContainer.innerHTML = `
        <div class="hero">
            <h1>Welcome to LuaMaster! 🚀</h1>
            <p>Belajar bahasa Lua dari noob sampai jago bikin script Roblox & Game Logic.</p>
            <button class="btn-primary" onclick="navigate('materi')">Mulai Belajar Sekarang</button>
        </div>
        <h3>Materi Terbaru</h3>
        <div class="card-grid" style="margin-top:20px;">
            ${materiList.slice(0,3).map((m, i) => `
                <div class="card ${i > 0 && !userData.completedModules.includes(materiList[i-1].id) ? 'locked' : ''}" 
                     onclick="navigate('materi-detail', '${m.id}')">
                    <div class="card-title">${m.title}</div>
                    <p>Level: ${m.level}</p>
                    ${userData.completedModules.includes(m.id) ? '<p style="color:var(--success)">✅ Selesai</p>' : ''}
                </div>
            `).join('')}
        </div>
    `;
}

function renderMateriList() {
    appContainer.innerHTML = `
        <h2>📚 Daftar Materi</h2>
        <div class="card-grid" style="margin-top:20px;" id="materi-grid">
            ${materiList.map((m, i) => {
                let isLocked = i > 0 && !userData.completedModules.includes(materiList[i-1].id);
                return `
                <div class="card ${isLocked ? 'locked' : ''}" onclick="!${isLocked} && navigate('materi-detail', '${m.id}')">
                    <div class="card-title">${m.title} ${isLocked ? '🔒' : ''}</div>
                    <p>Level: ${m.level}</p>
                    ${userData.completedModules.includes(m.id) ? '<p style="color:var(--success)">✅ Selesai</p>' : ''}
                </div>
            `}).join('')}
        </div>
    `;
}

function renderMateriDetail(id) {
    const materi = materiList.find(m => m.id === id);
    appContainer.innerHTML = `
        <button class="btn-primary" style="margin-bottom: 20px;" onclick="navigate('materi')">⬅ Kembali</button>
        <div class="materi-content">
            ${materi.content}
            
            <div class="quiz-container" id="quiz-section">
                <h3>🎯 Mini Quiz</h3>
                <p>${materi.quiz.question}</p>
                ${materi.quiz.options.map((opt, i) => `
                    <button class="option-btn" onclick="checkAnswer(${i}, ${materi.quiz.answer}, '${materi.id}')">${opt}</button>
                `).join('')}
            </div>
        </div>
    `;
}

function renderProjects() {
    appContainer.innerHTML = `
        <h2>🎮 Mini Projects (Tugas Mandiri)</h2>
        <p style="margin-bottom:20px;">Praktekkan logikamu di sini! Buka simulasi editor atau Roblox Studio aslimu.</p>
        <div class="card-grid">
            ${miniProjects.map(p => `
                <div class="card">
                    <div class="card-title"><i class="fas ${p.icon}"></i> ${p.title}</div>
                    <p>${p.desc}</p>
                    <button class="btn-primary" style="font-size:12px">Lihat Clue</button>
                </div>
            `).join('')}
        </div>
    `;
}

function renderProgress() {
    const total = materiList.length;
    const completed = userData.completedModules.length;
    const percentage = Math.round((completed / total) * 100) || 0;

    appContainer.innerHTML = `
        <h2>📈 Progress Belajarmu</h2>
        <div class="card" style="margin-top:20px; text-align:center;">
            <h3>${percentage}% Selesai</h3>
            <div class="progress-bar-bg">
                <div class="progress-bar-fill" style="width: ${percentage}%"></div>
            </div>
            <p>XP saat ini: <strong>${userData.xp}</strong></p>
            <p>Gelar: <strong>${userData.badge}</strong></p>
        </div>
    `;
}

// --- LOGIC FUNCTIONS ---

// Simulasi Code Editor (Pseudo-Lua Runner)
function runCode(inputId, outputId) {
    const code = document.getElementById(inputId).value;
    const out = document.getElementById(outputId);
    
    // Simulasi sederhana eksekusi perintah "print" di Lua
    try {
        let outputText = "";
        const lines = code.split('\n');
        
        lines.forEach(line => {
            if(line.includes('print(')) {
                // Ekstrak teks di dalam print("")
                const match = line.match(/print\((["'])(.*?)\1\)/);
                if(match) {
                    outputText += match[2] + "<br>";
                } else if(line.includes("..")) {
                    // Cek simulasi concat
                    outputText += "Simulasi output berhasil di-generate!<br>";
                }
            }
        });

        if(!outputText) outputText = "Script dijalankan tanpa ada print output.";
        out.innerHTML = `<span style="color:#0f0">> ${outputText}</span>`;
        showToast("Code dieksekusi! 🚀");
    } catch (e) {
        out.innerHTML = `<span style="color:red">Error: Syntax tidak valid</span>`;
    }
}

// Logika Quiz
function checkAnswer(selectedIdx, correctIdx, materiId) {
    if (selectedIdx === correctIdx) {
        showToast("Jawaban Benar! +50 XP 🎉");
        if (!userData.completedModules.includes(materiId)) {
            userData.completedModules.push(materiId);
            userData.xp += 50;
            updateBadge();
        }
        document.getElementById('quiz-section').innerHTML = `<h3 style="color:var(--success)">✅ Kamu sudah menyelesaikan modul ini! Lanjut ke materi berikutnya.</h3>`;
    } else {
        showToast("Yah salah, coba lagi bro! 🥲");
    }
}

// Fitur Cari
function searchMateri() {
    let input = document.getElementById('searchInput').value.toLowerCase();
    if(input === "") { navigate('home'); return; }
    
    const filtered = materiList.filter(m => m.title.toLowerCase().includes(input));
    appContainer.innerHTML = `<h2>Hasil Pencarian:</h2>
        <div class="card-grid">
            ${filtered.map(m => `
                <div class="card" onclick="navigate('materi-detail', '${m.id}')">
                    <div class="card-title">${m.title}</div>
                    <p>Level: ${m.level}</p>
                </div>
            `).join('')}
        </div>`;
}

// Toast Notification System
function showToast(msg) {
    const toast = document.getElementById("toast");
    toast.innerText = msg;
    toast.className = "toast show";
    setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 3000);
}

// --- INIT ---
updateBadge();
navigate('home');
