async function getNotes(page = 1) {
    const search = document.getElementById("search").value;
    const container = document.getElementById("notes-container");
    const paginationContainer = document.getElementById("pagination");

    const endpoint = `/notes?page=${page}&limit=10&search=${encodeURIComponent(search)}`;
    const data = await apiRequest(endpoint);

    if (!data || !data.notes) return;

    container.innerHTML = "";

    data.notes.forEach(note => {
        const div = document.createElement("div");
        div.className = "note-card";
        div.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.content}</p>
            <div class="note-actions">
                <button class="delete-btn" onclick="deleteNote('${note._id}')">Delete</button>
            </div>
        `;
        container.appendChild(div);
    });

    // Render Pagination
    paginationContainer.innerHTML = "";
    if (data.totalPages > 1) {
        for (let i = 1; i <= data.totalPages; i++) {
            const btn = document.createElement("button");
            btn.innerText = i;
            btn.style.width = "auto";
            btn.style.padding = "0.5rem 1rem";
            if (i === data.currentPage) {
                btn.style.background = "var(--primary)";
            } else {
                btn.style.background = "var(--glass)";
            }
            btn.onclick = () => getNotes(i);
            paginationContainer.appendChild(btn);
        }
    }
}

async function createNote() {
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    if (!title || !content) {
        alert("Please enter title and content");
        return;
    }

    await apiRequest("/notes", "POST", { title, content });

    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
    getNotes();
}

async function deleteNote(id) {
    if (confirm("Are you sure you want to delete this note?")) {
        await apiRequest(`/notes/${id}`, "DELETE");
        getNotes();
    }
}