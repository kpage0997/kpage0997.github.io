/*
  Name: Kennedy Page
  Date: 09.25.2024
  CSC 372-01

  Description: This script provides interactive functionality for the main page of
  the SpartanEats website, such as enlarging dish images and displaying dish descriptions.
*/

document.addEventListener("DOMContentLoaded", () => {
  const dishImages = document.querySelectorAll(".dish-image");

  dishImages.forEach((img) => {
    img.addEventListener("click", () => {
      // Remove active class from all dish images
      dishImages.forEach((image) => {
        image.classList.remove("active-dish");
      });

      // Remove active class from all dish descriptions
      const allDescriptions = document.querySelectorAll(".dish-description");
      allDescriptions.forEach((desc) => {
        desc.classList.remove("active");
        desc.innerHTML = "";
      });

      img.classList.add("active-dish");

      const dishDiv = img.closest(".dish");

      const dishDescriptionDiv = dishDiv.querySelector(".dish-description");

      // Display dish description
      const description = img.getAttribute("data-description");
      const dishName = img.alt;

      dishDescriptionDiv.innerHTML = `
                <h4>${dishName}</h4>
                <p>${description}</p>
            `;
      dishDescriptionDiv.classList.add("active");

      dishDiv.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });
});
