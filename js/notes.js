import * as el from './constant.js';

document.getElementById('NotesTab').className = `bg-gray-200 border-black border-b-[3.5px] px-2 py-1 rounded-t-sm`

function handleAddFolder() {
  el.btn_addFolder.addEventListener('click', () => {
    el.addFolderInputBox.classList.remove('hidden');
  });
  el.btn_closeFolderInputBox.addEventListener('click', () => {
    el.addFolderInputBox.classList.add('hidden');
  });

  el.folderNameInputField.focus

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


const state = JSON.parse(localStorage.getItem('state')) || {
  folders: [
    {
      id: 'all',
      name: 'All',
      isExpanded: true,
      notes: [
        {
          id: UUID(),
          title: 'Welcome to QuickTools Notes!',
          content: `Read the Manual 𝘪𝘧 𝘺𝘰𝘶 𝘢𝘳𝘦 𝘴𝘦𝘳𝘪𝘰𝘶𝘴 𝘢𝘣𝘰𝘶𝘵 𝘶𝘴𝘪𝘯𝘨 𝘘𝘶𝘪𝘤𝘬𝘛𝘰𝘰𝘭𝘴
          
- Create folders to categorize your notes for better organization.
- Click "Add Folder" or press Ctrl+F to create a new folder. Each new folder includes a default note.
- Click "Add Note" or press Ctrl+N to quickly create a new note within the selected folder.
- Click on a folder to expand or collapse its contents. Hover over a note to reveal the delete option.
- Select a note to view or edit its content.
- Deleting all notes within a folder (except the "All" folder) will automatically remove the folder.
- All changes are saved automatically in your browser's local storage.
- Please note: Data is stored locally and will not sync across different browsers or devices.
- You can export all your notes as a PDF file for backup or sharing purposes.
- Warning: Exporting to PDF will erase all data and this action cannot be undone. (This option will be relocated to the settings panel in a future update.)
- A demo folder is provided to help you explore the export functionality.

For the best experience, we recommend using QuickTools in full-screen mode.

          Happy writing!`,
          wordCount: 0,
          charCount: 0,
          createdAt: nowTime(),
          lastEdited: nowTime(),
        }
      ],
    },
    {
      id: UUID(),
      name: 'Demo Mawlānā Jalāl ud-Dīn Rūmī',
      isExpanded: !true,
      notes: [
        {
          id: UUID(),
          title: '1. Origins of a Mystic: Birth in Balkh and Spiritual Lineage (1207)',
          content: `Rūmī was born in the city of Balkh, in present-day Afghanistan, into a time of great political turbulence and spiritual richness. His father, Bahaʾ al-Dīn Walad, was a well-known Islamic jurist, preacher, and mystic who openly criticized the prevailing corruption among rulers and scholars of the time. These spiritual leanings had a deep impact on young Jalāl. Their lineage traced back to the Prophet Muḥammad ﷺ, which gave them significant religious respect.

When Rūmī was five, the Mongol invasions under Genghis Khan forced the family to flee. Their migration became a defining experience, carrying the seeds of spiritual detachment and divine trust. They passed through Nishapur—where Rūmī possibly met the famous poet Farīd al-Dīn ʿAṭṭār, who gifted him his book Asrār Nāma—then continued through Mecca, Baghdad, and Damascus, before finally settling in Konya, under the protection of the Seljuk Sultanate.`,
          wordCount: 0,
          charCount: 0,
          createdAt: nowTime(),
          lastEdited: nowTime(),
        },
        {
          id: UUID(),
          title: '2. The Scholar of Konya: Rūmī’s Early Education and Teaching',
          content: `In Konya, Bahaʾ al-Dīn became a prominent teacher, and Rūmī was immersed in classical Islamic sciences—fiqh (law), tafsīr (Qur'anic exegesis), ḥadīth, kalām (theology), and Arabic grammar. After his father’s death in 1231, Rūmī inherited his teaching position. Seeking deeper understanding, he studied under Burhān al-Dīn Muḥaqqiq Tirmidhī, his father’s disciple, who taught him the path of Sufism. This mentorship was critical in refining his inner discipline (riyāḍah), remembrance (dhikr), and spiritual contemplation.

In these years, Rūmī was primarily a scholar and jurist—a teacher of Islamic law, widely respected for his knowledge. But the true flame of spiritual transformation had yet to be lit.`,
          wordCount: 0,
          charCount: 0,
          createdAt: nowTime(),
          lastEdited: nowTime(),
        },
        {
          id: UUID(),
          title: '3. The Flame of Friendship: Encounter with Shams al-Dīn Tabrīzī (1244)',
          content: `At the age of 37, Rūmī met Shams al-Dīn of Tabrīz, a wandering, fierce, and spiritually intoxicated dervish whose presence shattered Rūmī’s scholarly identity. Their meeting was electrifying. Shams asked a question that pierced Rūmī’s heart: "Who is greater—Bāyazīd or the Prophet?"

What followed was not a typical teacher-student relationship, but a union of hearts—a mirror of Divine Love (ʿishq ilāhī). Rūmī gradually turned inward, ceasing his public teaching, and became enraptured in mystical conversations with Shams. This provoked jealousy among Rūmī’s followers and family.

Their bond was not simply emotional; it was spiritual annihilation (fanāʾ) in the presence of a guide who could reflect the Real.`,
          wordCount: 0,
          charCount: 0,
          createdAt: nowTime(),
          lastEdited: nowTime(),
        },
        {
          id: UUID(),
          title: '4. Loss and Longing: The Disappearance of Shams',
          content: `Shams’ sudden disappearance—possibly murdered by envious followers—left Rūmī devastated. His cries turned inward, and his longing took the form of poetry. “Shams,” once a man, now became a symbol of the Divine Beloved, and Rūmī began to whirl in spiritual ecstasy, initiating what would become the Sema tradition.

Rūmī traveled even to Damascus in search of Shams, but realized finally that Shams was within him. The pain of separation transformed into poetry. These verses poured into what became the Divān-e Shams-e Tabrīzī, filled with themes of union, longing, intoxication, and surrender.`,
          wordCount: 0,
          charCount: 0,
          createdAt: nowTime(),
          lastEdited: nowTime(),
        },
        {
          id: UUID(),
          title: '5. The Birth of a Masterpiece: The Mathnawī Begins',
          content: `Rūmī’s student Husām al-Dīn Chalabī urged him to record his teachings. Thus began the Mathnawī Maʿnawī, dictated over years while walking, teaching, and meditating. Known as the “Qur'an in Persian”, this six-volume poetic work covers everything from Sufi metaphysics to human psychology.

Each story within the Mathnawī illustrates a point: the illusion of the self, the tricks of the ego (nafs), the role of suffering, and the ecstasy of divine love. It is not a cold book of doctrine but a living ocean of spiritual wisdom.`,
          wordCount: 0,
          charCount: 0,
          createdAt: nowTime(),
          lastEdited: nowTime(),
        },
        {
          id: UUID(),
          title: '6. The Circle Expands: Spiritual Leadership and the Mawlawīya Order',
          content: `Rūmī’s disciples formed a tight-knit circle. After his passing, they formalized into the Mawlawīya or Mevlevī order, under the leadership of his son Sultan Walad. Known for their whirling dervish ceremonies, this order symbolizes the soul’s rotation around the Divine center.

They practiced music (samāʿ), poetry, dance, and dhikr to experience divine annihilation and subsistence (fanāʾ and baqāʾ). Rūmī never formally founded this order—it was a legacy born of love, preserved by his community.`,
          wordCount: 0,
          charCount: 0,
          createdAt: nowTime(),
          lastEdited: nowTime(),
        },
        {
          id: UUID(),
          title: '7. Marriage, Family, and Earthly Responsibilities',
          content: `Though consumed by spiritual passion, Rūmī fulfilled his worldly duties with dignity. He married twice, had several children, and remained a respected scholar of the city. His home was a place of hospitality, and his love for his students was paternal and deeply human.

Unlike many ascetics, Rūmī taught balance between the inner and outer life. For him, love for God did not mean fleeing the world, but transforming it through beauty and presence.`,
          wordCount: 0,
          charCount: 0,
          createdAt: nowTime(),
          lastEdited: nowTime(),
        },
        {
          id: UUID(),
          title: '8. Themes of His Teachings: Love, Unity, and the Inner Path',
          content: `Central to Rūmī’s message is Divine Love (ʿIshq-e Ḥaqīqī)—a burning desire for union with the Creator. He spoke of the one ocean, seen through many rivers; the lamp, seen through many colors. His worldview was not about tolerance, but radical unity (tawḥīd).

Some of his key teachings include:

  - "You were born with wings—why prefer to crawl?"
  - "Don’t grieve. Anything you lose comes round in another form."
  - "Your task is not to seek for love, but merely to seek and find all the barriers within yourself that you have built against it."
  - "Be like a tree and let the dead leaves drop."
  - "The wound is the place where the Light enters you."`,
          wordCount: 0,
          charCount: 0,
          createdAt: nowTime(),
          lastEdited: nowTime(),
        },
        {
          id: UUID(),
          title: '9. The Depth of Spiritual Ecstasy: Whirling and Music',
          content: `Rūmī believed music and motion were tools for remembrance. He introduced the samāʿ, the musical ceremony where dervishes whirl in meditative trance. This was not just art—it was prayer in movement.

Each whirl is a turning away from the self and a movement toward the center: the Divine. The right hand raised to receive divine grace, the left turned to give it to the earth.`,
          wordCount: 0,
          charCount: 0,
          createdAt: nowTime(),
          lastEdited: nowTime(),
        },
        {
          id: UUID(),
          title: '10. Final Years and Departure from the World (1273)',
          content: `In his final years, Rūmī was seen not just as a scholar or mystic, but a living saint. Muslims, Christians, Jews, and Hindus—all came to Konya seeking his blessings. His last years were marked by deep silence, broken only by flashes of divine insight.

He passed away on 17 December 1273, an event his followers called Shab-e Arūs (The Wedding Night)—the night of union with the Divine Beloved.`,
          wordCount: 0,
          charCount: 0,
          createdAt: nowTime(),
          lastEdited: nowTime(),
        },
        {
          id: UUID(),
          title: '11. Tomb and Shrine: Mevlana Museum in Konya',
          content: `His resting place in Konya became a pilgrimage site, known today as the Mevlana Museum. The epitaph reads:

        "Come, come, whoever you are. Wanderer, worshiper, lover of leaving—it doesn't matter. Ours is not a caravan of despair."

His shrine remains one of the most visited spiritual destinations in the Islamic world and beyond.`,
          wordCount: 0,
          charCount: 0,
          createdAt: nowTime(),
          lastEdited: nowTime(),
        },
        {
          id: UUID(),
          title: '12. Universal Appeal and Legacy Today',
          content: `Centuries later, Rūmī remains one of the best-selling poets in the West. His works are translated in over 40 languages. Beyond religion, he is seen as a voice of inner truth, unity, and divine beauty. Figures from Iqbal to Goethe, from Deepak Chopra to Coleman Barks have drawn inspiration from him.

Rūmī teaches that no matter how broken, unworthy, or distant we feel, the Beloved is always near. His legacy lives on in the music of whirling dervishes, in libraries across continents, and in the beating hearts of seekers everywhere.`,
          wordCount: 0,
          charCount: 0,
          createdAt: nowTime(),
          lastEdited: nowTime(),
        }
      ],
    },
  ],
  activeNoteId: null,
  selectedFolderId: null,
};



localStorage.setItem('state', JSON.stringify(state))




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
  <span class="flex items-center gap-2 min-w-0">
    <svg class="h-4 transform transition-transform duration-300 ${isExpanded ? 'rotate-90' : 'rotate-0'}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
    </svg>
    <p class="truncate " style="max-width: 120px;">${folder.name}</p>
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
    showMobileToInfo()
    localStorage.setItem('state', JSON.stringify(state));
  });
}

function showMobileToInfo() {
  if (!el.note_folderAndNoteInfo) {
    console.warn('note_folderAndNoteInfo element is missing!');
    return;
  }

  const folder = state.folders.find(f => f.id === state.selectedFolderId);
  const note = folder?.notes.find(n => n.id === state.activeNoteId);
  el.note_folderAndNoteInfo.textContent = `${folder?.name || 'Unknown Folder'} > ${note?.title || 'Unknown Note'}`;
}


function renderEditor() {
  console.log('renderEditor called with activeNoteId:', state.activeNoteId);
  

  if (!state.activeNoteId) {
    console.warn('No active note ID set, resetting editor');
    resetEditor();
    showMobileToInfo()
    return;
  }

  const note = getActiveNote();
  if (!note) {
    console.warn(`Active note with ID ${state.activeNoteId} not found`);
    resetEditor(state.activeNoteId);
    showMobileToInfo()
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
  localStorage.setItem('state', JSON.stringify(state));

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
      localStorage.setItem('state', JSON.stringify(state));
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
    localStorage.setItem('state', JSON.stringify(state));

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
    localStorage.setItem('state', JSON.stringify(state));

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
    showMobileToInfo()
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
showMobileToInfo()







// Export to PDF 


el.note_exportPDF.addEventListener('click', () => {
  console.log('Clicked');
  localStorage.clear();
  // renderEditor()
  // renderSidebar()

  generatePDF()
})




function generatePDF() {
  console.log('Enter to the pdf');
  const content = [];

  // === 1. Cover Page ===
  content.push({
    stack: [
      {
        text: 'QuickTools',
        fontSize: 64,
        bold: true,
        alignment: 'center',
        color: '#14532d',
        margin: [0, 250, 0, 0]
      },
      {
        stack: [
          { text: `+ Info`, margin: [0, 140, 0, 8] },
          { text: `- Folder item(s): ${state.folders.length}`, margin: [10, 0, 0, 8] },
          {
            text: `- Note item(s): ${state.folders.reduce((sum, f) => sum + f.notes.length, 0)}`,
            margin: [10, 0, 0, 8]
          },
          {
            text: `- Exported at: ${new Date().toLocaleString()}`,
            margin: [10, 0, 0, 8]
          },
          {
            text: 'Developed by Irshad Hossain',
            link: 'https://www.linkedin.com/in/irshad-hossain-785548323/',
            bold: true,
            color: '#14532d',
            decoration: 'underline',
            margin: [0, 10, 0, 0]
          }
        ],
        alignment: 'left',
        margin: [40, 100, 0, 0]
      }
    ],
    pageBreak: 'after'
  });

  // === 2. TOC ===
  const tocTableBody = [
    [
      { text: 'Sl.', bold: true, fontSize: 13, color: '#a17308', margin: [0, 4], border: [false, false, false, true] },
      { text: 'Folder', bold: true, fontSize: 13, color: '#a17308', margin: [0, 4], border: [false, false, false, true] },
      { text: 'Note', bold: true, fontSize: 13, color: '#a17308', margin: [0, 4], border: [false, false, false, true] },
      { text: 'Page', bold: true, fontSize: 13, color: '#a17308', alignment: 'right', margin: [0, 4], border: [false, false, false, true] }
    ]
  ];

  const notePageMap = [];
  let currentPage = 3;
  let sl = 1;

  state.folders.forEach(folder => {
    let isFirst = true;
    folder.notes.forEach(note => {
      notePageMap.push({ folder: folder.name, title: note.title, page: currentPage });
      tocTableBody.push([
        isFirst ? { text: `${sl}.`, margin: [0, 2] } : { text: '', margin: [0, 2] },
        isFirst ? { text: folder.name, margin: [0, 2] } : { text: '', margin: [0, 2] },
        { text: note.title, margin: [isFirst ? 0 : 2, 2], linkToPage: currentPage, noWrap: true },
        { text: `${currentPage.toString().padStart(2, '0')}`, alignment: 'right', margin: [0, 2] }
      ]);
      isFirst = false;
      currentPage++;
    });
    sl++;
  });

  content.push({
    text: 'Table of Content : Quick Notes', // Table title
    alignment: 'center',
    fontSize: 20,
    bold: true,
    style: 'tableHeader',
    margin: [0, 0, 0, 5] // Margin below the title
  }, {
    table: {
      widths: ['auto', 'auto', '*', 'auto'],
      body: tocTableBody
    },
    layout: {
      hLineWidth: function (i, node) {
        return 0; // Thin horizontal lines between all rows
      },
      vLineWidth: function (i, node) {
        return 0; // No vertical lines
      },
      hLineColor: function (i, node) {
        return '#2b2b2b'; // Horizontal line color
      },
      fillColor: function (rowIndex, node, columnIndex) {
        return (rowIndex % 2 === 0) ? '#eef2e9' : null; // Slight yellow for even rows
      }
    },
    margin: [0, 10, 0, 20],
    pageBreak: 'after'
  });

  // === 3. Content Pages ===
  state.folders.forEach(folder => {
    content.push({
      text: folder.name,
      fontSize: 22,
      bold: true,
      color: '#0a4b8e',
      margin: [0, 10, 0, 15]
    });

    folder.notes.forEach(note => {
      content.push(
        {
          table: {
            widths: ['*', 'auto'],
            body: [[
              { text: note.title, fontSize: 16, bold: true, margin: [0, 0, 0, 5] },
              { text: `Date: ${note.lastEdit}`, fontSize: 10, italics: true, color: '#0a4b8e', alignment: 'right' }
            ]]
          },
          layout: 'noBorders'
        },
        {
          text: note.content,
          fontSize: 12,
          margin: [20, 0, 0, 15]
        }
      );
    });

    content.push({ text: '', pageBreak: 'after' });
  });


  // === 4. Developer Info Page ===
  content.push({
    stack: [
      { text: '', margin: [0, 0, 0, 620] }, // Push to bottom
      {
        stack: [
          { text: 'Developed by Irshad Hossain', fontSize: 10, alignment: 'left' },
          { text: 'Dept. of Software Engineering, Bangladesh Digital University', fontSize: 10, alignment: 'left' },
          { text: 'Contact: +880 1609 758233', fontSize: 10, alignment: 'left' },
          {
            text: 'Any Suggestions: Mail me',
            fontSize: 10,
            alignment: 'left',
            link: 'mailto:irshadrisad@gmail.com',
            decoration: 'underline',
            color: '#0a4b8e'
          },
          { text: 'Thank you for choosing Quick Notes! The app is still in development. Your feedback is valuable and helps shape the future of Quick Notes.', fontSize: 8, alignment: 'left' },
        ],
        margin: [40, 0, 0, 0]
      }
    ],
    pageBreak: 'before'
  });


  // === 4. PDF Definition ===
  const docDef = {
    pageSize: 'A4',
    pageMargins: [25, 55, 25, 25],
    content: content,

    header: function (currentPage) {
      if (currentPage <= 2) return '';

      const currentNote = notePageMap.find(n => n.page === currentPage);
      return {
        stack: [
          {
            table: {
              widths: ['20%', '*', '20%'],
              body: [[
                { text: 'Quick Notes', fontSize: 9, bold: true },
                {
                  text: currentNote ? `${currentNote.folder} > ${currentNote.title}` : '',
                  alignment: 'center',
                  fontSize: 9
                },
                { text: `Page ${currentPage}`, alignment: 'right', fontSize: 9 }
              ]]
            },
            layout: 'noBorders'
          },
          {
            canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1, lineColor: 'gray' }],
            margin: [0, 4, 0, 6]
          }
        ],
        margin: [40, 10, 40, 0]
      };
    },

  };

  pdfMake.createPdf(docDef).download('QuickNotes.pdf');
}



// Send Message


el.revealBtn.addEventListener('click', () => {
  el.contactForm.classList.remove('opacity-0', 'translate-y-4');
  el.contactForm.classList.add('opacity-100', 'translate-y-0');

  el.initialView.classList.add('opacity-0');
  el.contactImage.classList.add('w-0', 'h-0', 'opacity-0');
  el.successMsg.classList.add('hidden');
  
  el.revealBtn.textContent = "Why not connect directly on social media?";

});

el.backBtn.addEventListener('click', () => {
  el.contactForm.classList.add('opacity-0', 'translate-y-4');
  el.contactForm.classList.remove('opacity-100', 'translate-y-0');

  el.initialView.classList.remove('opacity-0');
  el.contactImage.classList.remove('w-0', 'h-0', 'opacity-0');
  el.successMsg.classList.add('hidden');

  el.revealBtn.textContent = "Reach Out"

});


el.contactForm.addEventListener('submit', async function (e) {
  e.preventDefault();
  

  
  el.contactForm.reset();
  el.successMsg.classList.remove('hidden');
 
});