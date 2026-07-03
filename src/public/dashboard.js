const form = document.getElementById("student-form");
const formMessage = document.getElementById("form-message");
const studentIdInput = document.getElementById("student-id");
const studentNameInput = document.getElementById("student-name");
const studentGradesInput = document.getElementById("student-grades");
const formTitle = document.getElementById("form-title");
const submitBtn = document.getElementById("submit-btn");
const cancelEditBtn = document.getElementById("cancel-edit");
const scrollToFormBtn = document.getElementById("scroll-to-form");

const setMessage = (message, type = "info") => {
  formMessage.textContent = message;
  formMessage.dataset.state = type;
};

const clearForm = () => {
  form.reset();
  studentIdInput.value = "";
  formTitle.textContent = "Add student";
  submitBtn.textContent = "Create student";
  cancelEditBtn.hidden = true;
  setMessage("");
};

const parseGrades = (rawValue) => {
  const grades = rawValue
    .split(/[\s,]+/)
    .map((grade) => grade.trim())
    .filter(Boolean)
    .map((grade) => Number(grade));

  if (!grades.length || grades.some((grade) => Number.isNaN(grade))) {
    throw new Error("Grades must contain only numbers.");
  }

  return grades;
};

const refreshPage = () => {
  window.location.reload();
};

scrollToFormBtn?.addEventListener("click", () => {
  document.getElementById("student-form-panel")?.scrollIntoView({ behavior: "smooth", block: "start" });
});

cancelEditBtn?.addEventListener("click", () => {
  clearForm();
  studentNameInput.focus();
});

document.querySelectorAll("[data-action='edit']").forEach((button) => {
  button.addEventListener("click", () => {
    const row = button.closest("[data-student-row]");
    if (!row) return;

    studentIdInput.value = row.dataset.id || "";
    studentNameInput.value = row.dataset.name || "";
    studentGradesInput.value = (row.dataset.grades || "").replaceAll(",", ", ");
    formTitle.textContent = "Edit student";
    submitBtn.textContent = "Update student";
    cancelEditBtn.hidden = false;
    setMessage(`Editing ${row.dataset.name || "selected student"}.`, "info");
    document.getElementById("student-form-panel")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

document.querySelectorAll("[data-action='delete']").forEach((button) => {
  button.addEventListener("click", async () => {
    const id = button.dataset.id;
    if (!id) return;

    const confirmDelete = window.confirm("Delete this student record?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/students/${id}`, {
        method: "DELETE",
      });

      if (!response.ok && response.status !== 204) {
        throw new Error("Delete failed.");
      }

      refreshPage();
    } catch (error) {
      setMessage("Could not delete the student right now.", "error");
    }
  });
});

form?.addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    const payload = {
      name: studentNameInput.value.trim(),
      grades: parseGrades(studentGradesInput.value),
    };

    const studentId = studentIdInput.value.trim();
    const method = studentId ? "PUT" : "POST";
    const url = studentId ? `/students/${studentId}` : "/students";

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(data?.error || "Unable to save student.");
    }

    setMessage(studentId ? "Student updated successfully." : "Student created successfully.", "success");
    clearForm();
    refreshPage();
  } catch (error) {
    setMessage(error.message || "Validation failed. Check your inputs and try again.", "error");
  }
});
