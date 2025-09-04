const Lessons = () => {
  fetch('https://openapi.programming-hero.com/api/levels/all')
    .then((res) => res.json())
    .then((button) => lesssonButtons(button.data));
};

const lesssonButtons = (data) => {
  const buttonSection = document.getElementById('lesson-btn-section');
  data.map((button) => {
    console.log(data);
    const newDiv = document.createElement('div');
    newDiv.innerHTML = `
      <button class="btn btn-outline btn-primary">
        <i class="fa-solid fa-book-open"></i>Lesson - ${button.level_no}
      </button>
      `;
    buttonSection.appendChild(newDiv);
  });
};

Lessons();
