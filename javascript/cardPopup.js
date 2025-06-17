let appointmentCards = document.querySelectorAll(".appointment-card");


function loadCard(index) {
  const container = document.querySelector(".container");

  const infoCard = document.createElement("div");
  infoCard.className = "info-card";
  infoCard.id = index;
  infoCard.style = "position: absolute";
  infoCard.innerHTML = `
            <p>${apptArray[index].apptTitle}</p>
            <p>${apptArray[index].apptDesc}</p>
            <p>${apptArray[index].apptStart}</p>
            <p>${apptArray[index].apptEnd}</p>`;

  container.append(infoCard);

  alert("test");
}

function addListeners() {
  appointmentCards.forEach((card) => {
    card.addEventListener("click", loadCard());
  });
}

addListeners();
