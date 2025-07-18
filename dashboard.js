const table = document.getElementById("tableBody");
const form = document.getElementById("form");
const tanggal = document.getElementById("tanggal");
const ruang = document.getElementById("ruang");
const operan = document.getElementById("operan");
const search = document.getElementById("search");
const status = document.getElementById("status");

let editingId = null;

// Saat dokumen dimuat
document.addEventListener("DOMContentLoaded", () => {
  loadData();

  // Set tanggal ke hari ini
  tanggal.valueAsDate = new Date();

  // Ambil ruang dari localStorage
  const ruangLogin = localStorage.getItem("userRuang") || "";
  ruang.value = ruangLogin;

  // Sembunyikan form saat awal
  form.style.display = "none";
});

// Event saat form disubmit
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  await submitData();
});

// Toggle form tampil/sembunyi
function toggleForm(show = null) {
  if (show === true) {
    form.style.display = "block";
  } else if (show === false) {
    form.style.display = "none";
  } else {
    form.style.display = form.style.display === "none" ? "block" : "none";
  }
}

// Fungsi submit data ke Supabase
async function submitData() {
  const data = {
    tanggal: tanggal.value,
    ruang: ruang.value,
    operan: operan.value,
    status: status.value || "Aktif"
  };

  if (editingId) {
    await supabase.from("operan").update(data).eq("id", editingId);
    editingId = null;
  } else {
    await supabase.from("operan").insert(data);
  }

  // Reset form
  form.reset();
  tanggal.valueAsDate = new Date();
  ruang.value = localStorage.getItem("userRuang") || "";

  await loadData();
  toggleForm(false);
}

// Load dan tampilkan data ke tabel
async function loadData() {
  const { data, error } = await supabase
    .from("operan")
    .select("*")
    .order("tanggal", { ascending: false });

  table.innerHTML = "";
    data.forEach(item => {
    const row = document.createElement("tr");
    const tdOperan = document.createElement("td");
    const tdAction = document.createElement("td");

    tdOperan.innerHTML = `
        <div class="operan-meta">
        <small>${item.tanggal} | ${item.ruang} | ${item.status || "Belum"}</small>
        </div>
        <div>${item.operan}</div>
    `;

    // Ganti onclick dengan addEventListener
    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.addEventListener("click", () => editItem(item.id));

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";
    deleteBtn.classList.add("delete");
    deleteBtn.addEventListener("click", () => deleteItem(item.id));

    tdAction.className = "action-col";
    tdAction.appendChild(editBtn);
    tdAction.appendChild(deleteBtn);

    row.appendChild(tdOperan);
    row.appendChild(tdAction);
    table.appendChild(row);
    });
}

// Edit item (tampilkan data di form)
async function editItem(id) {
  const { data, error } = await supabase
    .from("operan")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    alert("Gagal mengambil data untuk diedit");
    console.error(error);
    return;
  }

  tanggal.value = data.tanggal;
  ruang.value = data.ruang;
  operan.value = data.operan;
  status.value = data.status;

  editingId = id; // tandai bahwa kita sedang dalam mode edit
  toggleForm(true); // buka form
}


// Hapus item
async function deleteItem(id) {
  if (confirm("Yakin ingin menghapus data ini?")) {
    await supabase.from("operan").delete().eq("id", id);
    loadData();
  }
}

// Filter pencarian
function filterTable() {
  const value = search.value.toLowerCase();
  const rows = table.getElementsByTagName("tr");
  for (let row of rows) {
    row.style.display = row.textContent.toLowerCase().includes(value) ? "" : "none";
  }
}

// Logout
function logout() {
  window.location.href = "index.html";
}
