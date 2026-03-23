const STORAGE_KEY = "notes-app";

const initialData = [
  {
    id: "notes-1",
    title: "Babel",
    body: "Babel merupakan tools open-source yang digunakan untuk mengubah sintaks ECMAScript 2015+ menjadi sintaks yang didukung oleh JavaScript engine versi lama. Babel sering dipakai ketika kita menggunakan sintaks terbaru termasuk sintaks JSX.",
    createdAt: "2022-04-14T04:27:34.572Z",
    archived: false,
  },
  {
    id: "notes-2",
    title: "Functional Component",
    body: "Functional component merupakan React component yang dibuat menggunakan fungsi JavaScript. Agar fungsi JavaScript dapat disebut component ia harus mengembalikan React element dan dipanggil layaknya React component.",
    createdAt: "2022-04-14T04:27:34.572Z",
    archived: false,
  },
  {
    id: "notes-3",
    title: "Modularization",
    body: "Dalam konteks pemrograman JavaScript, modularization merupakan teknik dalam memecah atau menggunakan kode dalam berkas JavaScript secara terpisah berdasarkan tanggung jawabnya masing-masing.",
    createdAt: "2022-04-14T04:27:34.572Z",
    archived: false,
  },
  {
    id: "notes-4",
    title: "Lifecycle",
    body: "Dalam konteks React component, lifecycle merupakan kumpulan method yang menjadi siklus hidup mulai dari component dibuat (constructor), dicetak (render), pasca-cetak (componentDidMount), dan sebagainya. ",
    createdAt: "2022-04-14T04:27:34.572Z",
    archived: false,
  },
  {
    id: "notes-5",
    title: "ESM",
    body: "ESM (ECMAScript Module) merupakan format modularisasi standar JavaScript.",
    createdAt: "2022-04-14T04:27:34.572Z",
    archived: false,
  },
  {
    id: "notes-6",
    title: "Module Bundler",
    body: "Dalam konteks pemrograman JavaScript, module bundler merupakan tools yang digunakan untuk menggabungkan seluruh modul JavaScript yang digunakan oleh aplikasi menjadi satu berkas.",
    createdAt: "2022-04-14T04:27:34.572Z",
    archived: false,
  },
];

function getNotesFromStorage() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveNotes(notes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

function mergeNotes(initial, local) {
  const map = new Map();

  // masukkan initial dulu
  initial.forEach((note) => {
    map.set(note.id, note);
  });

  // override dengan local (kalau ada id sama)
  local.forEach((note) => {
    map.set(note.id, note);
  });

  return Array.from(map.values());
}

function getAllNotes() {
  const local = getNotesFromStorage();
  return mergeNotes(initialData, local);
}

function getNote(id) {
  const notes = getNotesFromStorage();
  return notes.find((note) => note.id === id);
}

function getActiveNotes() {
  return getAllNotes().filter((note) => !note.archived);
}

function getArchivedNotes() {
  return getAllNotes().filter((note) => note.archived);
}

function addNote({ title, body }) {
  const notes = getAllNotes();

  const newNote = {
    id: `notes-${+new Date()}`,
    title: title || "(untitled)",
    body,
    createdAt: new Date().toISOString(),
    archived: false,
  };

  saveNotes([...notes, newNote]);
}

function deleteNote(id) {
  if (confirm("Yakin hapus catatan?")) {
    const notes = getAllNotes();
    const filtered = notes.filter((note) => note.id !== id);
    saveNotes(filtered);
  }
}

function archiveNote(id) {
  const notes = getAllNotes();

  const updated = notes.map((note) =>
    note.id === id ? { ...note, archived: true } : note,
  );

  saveNotes(updated);
}

function unarchiveNote(id) {
  const notes = getAllNotes();

  const updated = notes.map((note) =>
    note.id === id ? { ...note, archived: false } : note,
  );

  saveNotes(updated);
}

function editNote({ id, title, body }) {
  const notes = getAllNotes();

  const updated = notes.map((note) =>
    note.id === id ? { ...note, title, body } : note,
  );

  saveNotes(updated);
}

export {
  getAllNotes,
  getActiveNotes,
  getArchivedNotes,
  deleteNote,
  editNote,
  getNote,
  archiveNote,
  unarchiveNote,
  addNote,
};
