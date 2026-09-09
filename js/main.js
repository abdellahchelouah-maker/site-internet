/* ================================================================
   COMPRENDRE INTERNET — AC2026
   JavaScript minimal : réponses pédagogiques + navigation active.
   Le contenu reste lisible même sans JavaScript : les réponses sont
   masquées par l’attribut HTML "hidden" et le script les contrôle.
   ================================================================ */

document.addEventListener("DOMContentLoaded", () => {
  initAnswers();
  initImageToggles();
  initActiveNavigation();
});

/**
 * Affiche ou masque la réponse associée au bouton cliqué.
 *
 * Chaque bloc de question contient :
 *   - un bouton [data-answer-toggle]
 *   - un bloc .answer-item[hidden]
 *
 * On utilise la délégation d’événement : un seul écouteur suffit
 * pour toutes les questions présentes dans la page.
 */
function initAnswers() {
  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-answer-toggle]");

    if (!button) return;

    const card = button.closest("[data-answer-card]");
    const answer = card?.querySelector(".answer-item");

    if (!answer) return;

    const isHidden = answer.hasAttribute("hidden");

    if (isHidden) {
      answer.removeAttribute("hidden");
      button.setAttribute("aria-expanded", "true");
      button.textContent = "Masquer la réponse";
    } else {
      answer.setAttribute("hidden", "");
      button.setAttribute("aria-expanded", "false");
      button.textContent = "Afficher la réponse";
    }
  });
}

/**
 * Gère l'affichage/masquage des images marquées par `data-image-toggle`.
 * Les images sont initialement marquées `hidden` dans le HTML pour
 * garantir qu'elles restent invisibles sans JavaScript.
 */
function initImageToggles() {
  document.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-image-toggle]");

    if (!btn) return;

    const imgId = btn.getAttribute("aria-controls");
    const img = document.getElementById(imgId);

    if (!img) return;

    const isHidden = img.hasAttribute("hidden");

    if (isHidden) {
      img.removeAttribute("hidden");
      btn.setAttribute("aria-expanded", "true");
      btn.textContent = "Masquer l'image";
    } else {
      img.setAttribute("hidden", "");
      btn.setAttribute("aria-expanded", "false");
      btn.textContent = "Afficher l'image";
    }
  });
}

/**
 * Met en évidence l’activité actuellement consultée dans la barre
 * de navigation. La page d’accueil reçoit automatiquement "active".
 */
function initActiveNavigation() {
  const currentFile = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".navlinks a").forEach((link) => {
    const linkFile = link.pathname.split("/").pop();

    if (linkFile === currentFile) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });
}
