const panels = document.querySelectorAll(".panel");

const removeActiveClasses = () =>
  panels.forEach((panel) => {
    panel.classList.remove("active");
  });

panels.forEach((panel) => {
  panel.addEventListener("click", () => {
    if (panel.classList.contains("active")) {
      panel.classList.remove("active");
    } else {
      removeActiveClasses();

      panel.classList.add("active");
    }
  });
});
