// --- DATABASE MATERI & QUIZ ---
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
            answer: 1 
        }
    },
    {
        id: "m2",
        title: "2. Cara Install & Run Lua 💻",
        level: "Basic",
        content: `
            <h2>Setup Environment</h2>
            <p>Buat mainan Lua di PC lokal, kamu bisa download dari <i>lua.org</i> atau install via package manager. Tapi santai aja, kalau tujuan utamamu Roblox, kamu nggak perlu install apa-apa! Langsung buka <strong>Roblox Studio</strong>, bikin script, dan gas ngoding.</p>
        `,
        quiz: {
            question: "Apakah kita wajib install Lua di PC lokal kalau mau bikin game Roblox?",
            options: ["Wajib banget", "Nggak perlu, langsung di Roblox Studio", "Harus bayar dulu"],
            answer: 1
        }
    },
    {
        id: "m3",
        title: "3. Variabel & Tipe Data: Si Wadah 📦",
        level: "Basic",
        content: `
            <h2>Simpan Datamu di Sini</h2>
            <p>Variabel itu ibarat kotak Tupperware. Kamu bisa isi angka (number), teks (string), atau boolean (true/false). Di Lua, paling aman pakai <code>local</code> biar datanya nggak bocor kemana-mana.</p><br>
            <p><strong>Contoh:</strong><br>
            <code>local namaPlayer = "Zilong"</code><br>
            <code>local hp = 100</code></p>
        `,
        quiz: {
            question: "Kata kunci apa yang paling direkomendasikan untuk membuat variabel di Lua?",
            options: ["var", "let", "local"],
            answer: 2
        }
    },
    {
        id: "m4",
        title: "4. Operator: Plus Minus Kali Bagi ➕",
        level: "Basic",
        content: `
            <h2>Matematika & Logika Dasar</h2>
            <p>Lua punya operator mtk standar: <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>. Buat gabungin teks (string concatenation) jangan pakai <code>+</code> ya, tapi pakai titik dua kali <code>..</code>.</p><br>
            <p>Contoh: <code>"Halo " .. "Dunia"</code> hasilnya "Halo Dunia".</p>
        `,
        quiz: {
            question: "Operator apa yang dipakai buat menggabungkan dua teks (string) di Lua?",
            options: ["+", "..", "&&"],
            answer: 1
        }
    },
    {
        id: "m5",
        title: "5. Percabangan (If-Else) 🔀",
        level: "Basic",
        content: `
            <h2>Bikin Keputusan (Logic)</h2>
            <p>Kalau HP player nol, ya mati. Logic kayak gini pakai <strong>if-else</strong>. Jangan lupa ditutup pakai kata <code>end</code> ya!</p><br>
            <code>
            if hp <= 0 then<br>
            &nbsp;&nbsp;print("You Died!")<br>
            elseif hp < 20 then<br>
            &nbsp;&nbsp;print("Darah sekarat bro")<br>
            else<br>
            &nbsp;&nbsp;print("Aman jaya")<br>
            end
            </code>
        `,
        quiz: {
            question: "Kata apa yang WAJIB ada untuk menutup blok if-else di Lua?",
            options: ["stop", "finish", "end"],
            answer: 2
        }
    },
    {
        id: "m6",
        title: "6. Perulangan (For, While) 🔄",
        level: "Intermediate",
        content: `
            <h2>Ngapain Ngetik Capek-capek?</h2>
            <p>Biar nggak ngetik kode berulang kali, kita pakai looping. Ada <code>while</code> (selama kondisinya true, jalan terus) dan <code>for</code> (buat ngulang sejumlah angka tertentu).</p><br>
            <p>Contoh ngetik angka 1 sampai 5:<br>
            <code>for i = 1, 5 do<br>
            &nbsp;&nbsp;print(i)<br>
            end</code></p>
        `,
        quiz: {
            question: "Looping apa yang berjalan terus-menerus selama kondisinya masih 'true'?",
            options: ["for loop", "while loop", "repeat until"],
            answer: 1
        }
    },
    {
        id: "m7",
        title: "7. Function: Pabrik Mini 🏭",
        level: "Intermediate",
        content: `
            <h2>Bungkus Kodemu Biar Rapi</h2>
            <p>Function itu ibarat resep masakan. Kamu tulis sekali resepnya, lalu bisa kamu panggil (masak) kapan aja tanpa nulis ulang dari awal.</p><br>
            <code>
            local function heal(playerHp)<br>
            &nbsp;&nbsp;return playerHp + 50<br>
            end<br>
            print(heal(10)) -- Hasilnya 60
            </code>
        `,
        quiz: {
            question: "Keyword apa yang dipakai untuk mengembalikan nilai dari sebuah function?",
            options: ["return", "give", "output"],
            answer: 0
        }
    },
    {
        id: "m8",
        title: "8. Table: Senjata Rahasia Lua ⚔️",
        level: "Intermediate",
        content: `
            <h2>Table = Array + Dictionary</h2>
            <p>Di bahasa lain ada Array atau Dictionary... di Lua cuma ada <strong>Table</strong>. Pakai kurung kurawal <code>{}</code>. Kamu bisa simpan daftar item atau bikin struktur data yang kompleks.</p><br>
            <p><code>local inventory = {"Pedang", "Potion", "Tameng"}</code><br>
            *Fun fact: Index table di Lua itu mulainya dari 1, bukan 0 kayak bahasa lain!</p>
        `,
        quiz: {
            question: "Index pertama dari sebuah Table list di Lua dimulai dari angka berapa?",
            options: ["0", "1", "-1"],
            answer: 1
        }
    },
    {
        id: "m9",
        title: "9. OOP di Lua (Metatable) 🧩",
        level: "Advanced",
        content: `
            <h2>Object Oriented Programming</h2>
            <p>Lua aslinya nggak punya Class kayak Java atau C++. Tapi kita bisa ngakalin (simulasi) OOP pakai yang namanya <strong>Metatable</strong> dan <code>__index</code>. Ini agak pusing, tapi kepake banget buat bikin sistem game yang rapi dan terstruktur.</p>
        `,
        quiz: {
            question: "Fitur apa di Lua yang sering dimanfaatkan untuk membuat sistem OOP (Object Oriented)?",
            options: ["Table dan Metatable", "If-Else", "Function Biasa"],
            answer: 0
        }
    },
    {
        id: "m10",
        title: "10. Module & Require 📁",
        level: "Advanced",
        content: `
            <h2>Pisahin File Biar Nggak Mumet</h2>
            <p>Kalau kodemu udah ribuan baris, waktunya dipecah jadi beberapa file. Kamu bisa bikin Module Script lalu manggil script tersebut dari file lain pakai fungsi <code>require()</code>.</p>
        `,
        quiz: {
            question: "Fungsi apa yang dipanggil untuk mengambil atau memuat kode dari file Module lain?",
            options: ["import()", "include()", "require()"],
            answer: 2
        }
    },
    {
        id: "m11",
        title: "11. Error Handling & Best Practice 🛠️",
        level: "Advanced",
        content: `
            <h2>Jangan Biarkan Game-mu Crash!</h2>
            <p>Pakai fungsi <code>pcall()</code> (protected call) untuk ngetes kode yang berisiko error (misal nge-save data). Kalau ada error, <code>pcall</code> bakal nangkep errornya dan script utamamu nggak akan berhenti secara tiba-tiba.</p>
        `,
        quiz: {
            question: "Fungsi apa yang dipakai untuk mencegah script berhenti tiba-tiba jika terjadi error (try-catch ala Lua)?",
            options: ["pcall()", "catch()", "stop_error()"],
            answer: 0
        }
    },
    {
        id: "m12",
        title: "12. Studi Kasus: Scripting Roblox 🎮",
        level: "Advanced",
        content: `
            <h2>Saatnya Eksekusi!</h2>
            <p>Coba buka Roblox Studio, bikin satu Part/Block. Masukkan script ini ke dalam part tersebut:</p><br>
            <code>
            script.Parent.Touched:Connect(function(hit)<br>
            &nbsp;&nbsp;print("Ada yang nyentuh block ini!")<br>
            &nbsp;&nbsp;script.Parent.BrickColor = BrickColor.Random()<br>
            end)
            </code>
            <br><p>Script ini bakal ganti warna blok secara acak tiap kali kesentuh player. Keren kan?</p>
        `,
        quiz: {
            question: "Event apa di Roblox yang sering dipakai untuk mendeteksi saat sebuah objek saling bersentuhan?",
            options: ["OnClick", "Touched", "OnHover"],
            answer: 1
        }
    }
];
