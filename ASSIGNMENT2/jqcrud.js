function getNotes() {
  $("#loading").show();
  $("#notesList").empty();

  $.get("https://usmanlive.com/wp-json/api/stories", function (data) {
    $("#loading").hide();

    data.forEach(note => {
      $("#notesList").append(`
        <div class="col-md-4">
          <div class="card note-card p-3 h-100">
            <div class="card-body">
              <div class="note-title font-weight-bold">${note.title}</div>
              <div class="note-content">${note.content}</div>
              <div class="mt-3 d-flex justify-content-between">
                <button class="btn btn-sm btn-warning editBtn" 
                  data-id="${note.id}" 
                  data-title="${note.title}" 
                  data-content="${note.content}">Edit</button>

                <button class="btn btn-sm btn-danger deleteBtn" 
                  data-id="${note.id}">Delete</button>
              </div>
            </div>
          </div>
        </div>
      `);
    });
  }).fail(() => {
    $("#loading").hide();
    alert("Error loading notes!");
  });
}

$("#noteForm").submit(function (e) {
  e.preventDefault();
  const id = $("#noteId").val(); 
  const title = $("#title").val();
  const content = $("#body").val();

  if (id) {
    $.ajax({
      url: "https://usmanlive.com/wp-json/api/stories/" + id,
      method: "PUT",
      data: { title, content },
      success: function () {
        alert("Note updated successfully!");
        resetForm();
        getNotes();
      },
      error: () => alert("Error updating note!"),
    });
  } else {
    $.ajax({
      url: "https://usmanlive.com/wp-json/api/stories",
      method: "POST",
      data: { title, content },
      success: function () {
        alert("Note added successfully!");
        resetForm();
        getNotes();
      },
      error: (err) => console.error("Error creating note:", err),
    });
  }
});

function resetForm() {
  $("#noteForm")[0].reset();
  $("#noteId").val("");
  $("#saveBtn").text("Add Note");
  $("#cancelEdit").hide();
}

$(document).on("click", ".editBtn", function () {
  $("#noteId").val($(this).data("id"));
  $("#title").val($(this).data("title"));
  $("#body").val($(this).data("content"));
  $("#saveBtn").text("Update Note");
  $("#cancelBtn").show();
});

$("#cancelBtn").click(resetForm);

$(document).on("click", ".deleteBtn", function () {
  const id = $(this).data("id");
  if (confirm("Are you sure you want to delete this note?")) {
    $.ajax({
      url: "https://usmanlive.com/wp-json/api/stories/" + id,
      type: "DELETE",
      success: function () {
        alert("Note deleted successfully!");
        getNotes();
      },
      error: function () {
        alert("Error deleting note!");
      },
    });
  }
});

$(document).ready(() => {
  getNotes();
});
