document.addEventListener("DOMContentLoaded", () => {
    const contacts = [];
    const searchInput = document.getElementById("search");
    const contactList = document.getElementById("contact-list");
    const addContactBtn = document.getElementById("add-contact-btn");
    const modal = document.getElementById("modal");
    const addContactForm = document.getElementById("add-contact-form");
    const nameInput = document.getElementById("name");
    const phoneInput = document.getElementById("phone");
    const favoriteCheckbox = document.getElementById("favorite");
    const closeModal = document.getElementById("close-modal");
  
    phoneInput.addEventListener("input", () => {
      phoneInput.value = phoneInput.value
        .replace(/[^\d]/g, "")
        .replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
    });
  

    addContactBtn.addEventListener("click", () => {
      modal.classList.remove("hidden");
    });
  

    closeModal.addEventListener("click", () => {
      modal.classList.add("hidden");
    });
  
    addContactForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const newContact = {
        name: nameInput.value,
        phone: phoneInput.value,
        favorite: favoriteCheckbox.checked,
      };
  
      contacts.push(newContact);
      renderContacts();
      addContactForm.reset();
      modal.classList.add("hidden");
    });
  
    const renderContacts = (filteredContacts = contacts) => {
      contactList.innerHTML = "";

      const favorites = filteredContacts.filter((c) => c.favorite);
      const others = filteredContacts.filter((c) => !c.favorite);
      const sortedContacts = [...favorites, ...others];
  
      sortedContacts.forEach((contact, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <div class="contact-info">
            <i class="fas fa-user"></i> <!-- Добавим иконку пользователя -->
            <span>${contact.name} - ${contact.phone}</span>
          </div>
          <div class="actions">
            <button onclick="toggleFavorite(${index})">${contact.favorite ? "★" : "☆"}</button>
            <button onclick="deleteContact(${index})">Удалить</button>
          </div>
        `;
        contactList.appendChild(li);
      });
    };
  

    window.deleteContact = (index) => {
      contacts.splice(index, 1);
      renderContacts();
    };
  
    window.toggleFavorite = (index) => {
      contacts[index].favorite = !contacts[index].favorite;
      renderContacts();
    };
  
    searchInput.addEventListener("input", (e) => {
      const searchTerm = e.target.value.toLowerCase();
      const filteredContacts = contacts.filter(
        (c) =>
          c.name.toLowerCase().includes(searchTerm) || c.phone.includes(searchTerm)
      );
      renderContacts(filteredContacts);
    });
  });
  