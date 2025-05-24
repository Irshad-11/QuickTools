import * as el from './constant.js';

document.getElementById('NotesTab').className = `bg-gray-200 border-black border-b-[3.5px] px-2 py-1 rounded-t-sm`

function handleAddFolder() {
  el.btn_addFolder.addEventListener('click', () => {
    el.addFolderInputBox.classList.remove('hidden');
  });
  el.btn_closeFolderInputBox.addEventListener('click', () => {
    el.addFolderInputBox.classList.add('hidden');
  });

  el.folderNameInputField.focus()

  let folderInputTimeout = null;
  el.folderNameInputField.oninput = () => {
    if (folderInputTimeout) clearTimeout(folderInputTimeout);
    folderInputTimeout = setTimeout(() => {
      el.addFolderInputBox.classList.add('hidden');
      el.folderNameInputField.value = '';
    }, 3000);
  };

  el.btn_submitFolderName.addEventListener('click', () => {
    const name = el.folderNameInputField.value.trim();
    if (name == '') return;
    el.folderNameInputField.value = '';
    addFolder(name);
  });
}

handleAddFolder();

function nowTime() {
  return new Date().toISOString();
}

const state = {
  folders: [
    {
      id: 'all',
      name: 'All',
      isExpanded: true,
      notes: [],
    },
  ],
  activeNoteId: null,
  selectedFolderId: null,
};

initWelcomeNote()

function initWelcomeNote() {
  const welcomeNote = {
    id: UUID(),
    title: 'Welcome to QuickTools Notes!',
    content: `This is your first note. 
  - Create folders to organize your notes.
  - Click "Add Folder" or press Ctrl+F to create a new folder and also it will add a default note.
  - Click "Add Note" or press Ctrl+N to create a new note.
  - Click a folder to expand/collapse it and hover on the note you can find a delete icon.
  - Click a note to view or edit it.
  - If you delete all notes from a folder, the folder will be deleted automatically (except the "All" folder).
  - Your changes are saved automatically.

  Happy writing!`,
    wordCount: 0,
    charCount: 0,
    createdAt: nowTime(),
    lastEdited: nowTime(),
  };
  welcomeNote.wordCount = countWords(welcomeNote.content);
  welcomeNote.charCount = countChars(welcomeNote.content);
  state.folders[0].notes.push(welcomeNote);
}

function UUID() {
  return Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0');
}

function countWords(text) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  el.note_wordCount.textContent = `${words} w`;
  return words;
}

function countChars(text) {
  const chars = text.length;
  el.note_charCount.textContent = `${chars} c`;
  return chars;
}

function resetEditor(noteId = null) {
  console.log('resetEditor called with noteId:', noteId, 'activeNoteId:', state.activeNoteId);

  // Clear editor fields
  el.note_noteTitle.value = '';
  el.note_noteContent.value = '';
  el.note_lastEdit.textContent = 'Edit: —';
  el.note_wordCount.textContent = '0 words';
  el.note_charCount.textContent = '0 chars';
  el.note_folderID.textContent = 'Folder: None';
  el.note_noteID.textContent = 'Note ID: None';

  const idToUse = noteId || state.activeNoteId;
  if (!idToUse) {
    console.warn('No note ID provided for resetEditor');
    return;
  }

  let found = false;
  for (const folder of state.folders) {
    const note = folder.notes.find(n => n.id === idToUse);
    if (note) {
      el.note_folderID.textContent = `Folder: ${folder.name} (${folder.id})`;
      el.note_noteID.textContent = `Note ID: ${note.id}`;
      found = true;
      break;
    }
  }
  if (!found) {
    console.warn(`Note with ID ${idToUse} not found in any folder`);
  }

  el.noteContainer.classList.add('hidden')
  el.note_emptyWelcomePlace.classList.remove('hidden')

}

function saveNoteIndication() {
  if (!state.activeNoteId) return;
  el.note_saveIndicator.classList.remove('opacity-0');
  el.note_saveIndicator.classList.add('animate-spin');
  el.note_saveIndicatorCheckmark.classList.add('hidden');

  setTimeout(() => {
    el.note_saveIndicator.classList.remove('animate-spin');
    el.note_saveIndicatorCheckmark.classList.remove('hidden');
    setTimeout(() => el.note_saveIndicator.classList.add('opacity-0'), 20000);
  }, 1000);
}

function renderSidebar() {
  el.folderContainer.innerHTML = '';



  state.folders.forEach(folder => {
    const isSelected = state.selectedFolderId === folder.id;
    const isExpanded = folder.isExpanded;


    const folderDiv = document.createElement('div');
    folderDiv.className = 'mb-2 relative group';

    folderDiv.innerHTML = `
      <div 
        class="flex items-center justify-between px-3 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-100 text-gray-800 font-medium shadow-sm cursor-pointer transition-all duration-300 ${isSelected ? 'bg-blue-100 border-blue-300' : ''}"
        data-folder-id="${folder.id}"
      >
        <span class="flex items-center gap-2 truncate">
          <svg class="w-4 h-4 transform transition-transform duration-300 ${isExpanded ? 'rotate-90' : 'rotate-0'}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
          ${folder.name}
        </span>
        <span class="text-xs text-gray-500">Items ${folder.notes.length}</span>
      </div>
      <div class="ml-4 mt-1 max-h-[500px] overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? '' : 'hidden'}" data-folder-id="${folder.id}">
        ${folder.notes.length > 0
        ? folder.notes.map(note => {
          const isActive = state.activeNoteId === note.id;
          return `
        <div 
          class="group flex items-center justify-between text-sm text-gray-700 pl-4 border-l-2 ${isActive ? 'bg-blue-100 border-black' : 'border-black/100'} hover:bg-gray-100 px-2 py-1 rounded-r cursor-pointer transition-all duration-200"
          data-note-id="${note.id}"
        >
          <span class="truncate max-w-[200px]">${note.title || 'Untitled Note'}</span>
          <button data-note-id="${note.id}" class="delete-note text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200">&minus;</button>
        </div>
      `;
        }).join('')
        : '<div class="text-sm text-gray-400 italic px-2 py-1">No notes</div>'
      }

      </div>
    `;

    el.folderContainer.appendChild(folderDiv);
  });
}

function renderEditor() {
  console.log('renderEditor called with activeNoteId:', state.activeNoteId);

  if (!state.activeNoteId) {
    console.warn('No active note ID set, resetting editor');
    resetEditor();
    return;
  }

  const note = getActiveNote();
  if (!note) {
    console.warn(`Active note with ID ${state.activeNoteId} not found`);
    resetEditor(state.activeNoteId);
    return;
  }

  // Update editor fields with note data
  el.note_noteTitle.value = note.title || '';
  el.note_noteContent.value = note.content || '';
  el.note_lastEdit.textContent = `Edit: ${formatDateTime(note.lastEdited)}`;
  countWords(note.content || '');
  countChars(note.content || '');

  // Find and display folder and note IDs
  let found = false;
  for (const folder of state.folders) {
    const foundNote = folder.notes.find(n => n.id === note.id);
    if (foundNote) {
      el.note_folderID.textContent = `Folder: ${folder.name} (${folder.id})`;
      el.note_noteID.textContent = `Note ID: ${foundNote.id}`;
      found = true;
      break;
    }
  }
  if (!found) {
    console.warn(`Folder for note ID ${note.id} not found`);
    el.note_folderID.textContent = 'Folder: Not found';
    el.note_noteID.textContent = `Note ID: ${note.id}`;
  }
}

function getActiveNote() {

  el.noteContainer.classList.remove('hidden')
  el.note_emptyWelcomePlace.classList.add('hidden')

  for (const folder of state.folders) {
    const note = folder.notes.find(n => n.id === state.activeNoteId);
    if (note) return note;
  }
  return null;
}

function addNote() {

  el.noteContainer.classList.remove('hidden')
  el.note_emptyWelcomePlace.classList.add('hidden')

  let folder = state.folders.find(f => f.id === state.selectedFolderId);
  if (!folder) folder = state.folders.find(f => f.id === 'all');

  const now = nowTime();
  const note = {
    id: UUID(),
    title: 'Untitled Note',
    content: '',
    wordCount: 0,
    charCount: 0,
    createdAt: now,
    lastEdited: now,
  };

  folder.notes.unshift(note);
  state.activeNoteId = note.id;

  renderSidebar();
  renderEditor();

  setTimeout(() => {
    const newNoteEl = document.querySelector(`[data-note-id="${note.id}"]`);
    if (newNoteEl) newNoteEl.classList.add('animate-fadeIn');
  }, 100);
}

function addFolder(name) {
  if (name) {
    const newFolder = {
      id: UUID(),
      name,
      notes: [],
      isExpanded: true,
    };
    const now = nowTime();
    const initialNote = {
      id: UUID(),
      title: 'Untitled Note',
      content: '',
      wordCount: 0,
      charCount: 0,
      createdAt: now,
      lastEdited: now,
    };
    newFolder.notes.push(initialNote);
    state.folders.push(newFolder);
    renderSidebar();
  }
}

function toggleFolder(id) {
  const folder = state.folders.find(f => f.id === id);
  folder.isExpanded = !folder.isExpanded;
  renderSidebar();
}

function selectFolder(id) {
  const folder = state.folders.find(f => f.id === id);
  if (!folder) return;

  if (state.selectedFolderId === id) {
    toggleFolder(id);
  } else {
    state.selectedFolderId = id;
    folder.isExpanded = true;
    renderSidebar();
  }
}

function loadNote(id) {
  state.activeNoteId = id;
  renderEditor();
  renderSidebar();
}

function deleteNote(noteId) {
  for (let i = state.folders.length - 1; i >= 0; i--) {
    const folder = state.folders[i];
    const index = folder.notes.findIndex(n => n.id === noteId);
    if (index !== -1) {
      folder.notes.splice(index, 1);
      if (folder.notes.length === 0 && folder.id !== 'all') {
        state.folders.splice(i, 1);
        if (state.selectedFolderId === folder.id) {
          state.selectedFolderId = null;
        }
      }
      if (state.activeNoteId === noteId) {
        resetEditor(noteId);
        state.activeNoteId = null;
      }
      renderSidebar();
      return;
    }
  }
}

let saveTimeout = null;
function debouncedSave() {
  if (saveTimeout) clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => saveNoteIndication(), 200);
}

function formatDateTime(dateStr) {
  const date = new Date(dateStr);
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  const datePart = date.toLocaleDateString('en-US', options);
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12 || 12;
  return `${datePart} ${hours}:${minutes} ${ampm}`;
}

el.note_addNoteButton.addEventListener('click', addNote);
el.note_noteTitle.oninput = e => {
  const note = getActiveNote();
  if (note) {
    note.title = e.target.value;
    note.lastEdited = nowTime();
    el.note_lastEdit.textContent = `Edit: ${formatDateTime(note.lastEdited)}`;
    renderSidebar();
    debouncedSave();
  }
};
el.note_noteContent.oninput = e => {
  const note = getActiveNote();
  if (note) {
    note.content = e.target.value;
    note.wordCount = countWords(note.content);
    note.charCount = countChars(note.content);
    note.lastEdited = nowTime();
    el.note_lastEdit.textContent = `Edit: ${formatDateTime(note.lastEdited)}`;
    debouncedSave();
  }
};
el.folderContainer.addEventListener('click', e => {
  const toggleBtn = e.target.closest('[data-folder-id]:not([data-note-id])');
  const noteItem = e.target.closest('[data-note-id]');
  const deleteBtn = e.target.closest('.delete-note');

  if (deleteBtn) {
    e.stopPropagation();
    const noteId = deleteBtn.dataset.noteId;
    deleteNote(noteId);
    renderSidebar();
    renderEditor();
    return;
  }

  if (noteItem) {
    loadNote(noteItem.dataset.noteId);
  } else if (toggleBtn) {
    const folderId = toggleBtn.dataset.folderId;
    selectFolder(folderId);
  }
});
document.addEventListener('keydown', e => {
  if (e.ctrlKey && e.key.toLowerCase() === 'n') {
    e.preventDefault();
    addNote();
  }
  if (e.ctrlKey && e.key.toLowerCase() === 'f') {
    e.preventDefault();
    el.addFolderInputBox.classList.remove('hidden');
  }
});

renderSidebar();
renderEditor();
