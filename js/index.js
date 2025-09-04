const Lessons = () => {
  fetch('https://openapi.programming-hero.com/api/levels/all')
    .then((res) => res.json())
    .then((button) => lesssonButtons(button.data));
};

const loader = (tOrf) => {
  if (tOrf === true) {
    document.getElementById('loading').classList.remove('hidden');
    document.getElementById('loading').classList.add('flex');
  } else {
    document.getElementById('loading').classList.add('hidden');
    document.getElementById('loading').classList.remove('flex');
  }
};

const buttonActive = (activeId) => {
  const removeClass = document.querySelectorAll('.lesson-button');
  removeClass.forEach((button) => button.classList.remove('active'));
  if (activeId) {
    const addClass = document.getElementById(`lesson-button-${activeId}`);
    addClass.classList.add('active');
  }
};

const synonymsFunc = (synonymItem) => {
  const synonymsContainer = document.getElementById('synonyms');
  if (synonymItem.length === 0) {
    const newDiv = document.createElement('div');

    newDiv.innerHTML = `
      <p class="bg-[#EDF7FF] px-5 py-2 rounded">পাওয়া যায়নি</p>
      `;
    synonymsContainer.appendChild(newDiv);
    return;
  }

  synonymItem.forEach((item) => {
    console.log(item);
    const newDiv = document.createElement('div');

    newDiv.innerHTML = `
      <p class="bg-[#EDF7FF] px-5 py-2 rounded">${item}</p>
      `;
    synonymsContainer.appendChild(newDiv);
  });
};

const info = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const dataFetch = await fetch(url);
  const dataJson = await dataFetch.json();
  const lessonsData = dataJson.data;
  const popup = document.getElementById('popup');
  popup.innerHTML = `
   <dialog id="my_modal" class="modal modal-bottom sm:modal-middle">
            <div class="modal-box">
              <div class="border border-gray-100 rounded p-5">
                <h3 class="text-xl font-bold"> ${
                  lessonsData.word ? lessonsData.word : 'পাওয়া যায়নি'
                } (<i class="fa-solid fa-microphone"></i> ${
    lessonsData.pronunciation ? lessonsData.pronunciation : 'পাওয়া যায়নি'
  })</h3>
                <h3 class="text-sm font-bold mt-5">Meaning</h3>
                <h3 class="text-sm font-semibold mt-2 bangla-font"> ${
                  lessonsData.meaning ? lessonsData.meaning : 'পাওয়া যায়নি'
                }</h3>
                <h3 class="text-sm font-bold mt-5">Example</h3>
                <h3 class="text-sm mt-2"> ${
                  lessonsData.sentence ? lessonsData.sentence : 'পাওয়া যায়নি'
                }</h3>
                <h3 class="text-sm font-bold mt-5">সমার্থক শব্দ গুলো</h3>
                <div id="synonyms" class="flex gap-2 mt-2">
               
                </div>
               
              </div>
              <div class="flex justify-between items-center mt-5">  
              <button class="btn btn-outline btn-primary lesson-button">
                <i class="fa-solid fa-book-open"></i>Complete Learning
            </button>
              <div class="modal-action m-0">
                <form method="dialog">
                  <!-- if there is a button in form, it will close the modal -->
                  <button class="btn">Close</button>
                </form>
              </div>
              </div>
            </div>
    </dialog>
  `;
  synonymsFunc(lessonsData.synonyms);
  document.getElementById('my_modal').showModal();
};

const lessonsItem = async (id) => {
  loader(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  const dataFetch = await fetch(url);
  const dataJson = await dataFetch.json();
  const lessonData = dataJson.data;
  lessonsItemShow(lessonData);
  buttonActive(id);
};

// search
const searchItem = async () => {
  loader(true);
  buttonActive();
  const url = 'https://openapi.programming-hero.com/api/words/all';
  const dataFetch = await fetch(url);
  const dataJson = await dataFetch.json();
  const allDataArray = dataJson.data;
  const searchInput = document.getElementById('search-input');
  const searchValue = searchInput.value.trim().toLowerCase();
  // console.log(allDataArray);
  const filter = allDataArray.filter((data) =>
    data.word.toLowerCase().includes(searchValue)
  );
  if (searchValue) {
    lessonsItemShow(filter);
    searchInput.parentNode.classList.remove('border-red-600', 'border-2');
  } else {
    searchInput.parentNode.classList.add('border-red-600', 'border-2');
    loader(false);
  }
};

const lessonsItemShow = (dataArray) => {
  const lessonItemDiv = document.getElementById('lesson-item-div');
  lessonItemDiv.innerHTML = '';
  if (dataArray.length === 0) {
    const newDiv = document.createElement('div');
    newDiv.classList.add('col-span-full', 'space-y-5', 'py-10');
    newDiv.innerHTML = `
            <img class="mx-auto" src="./assets/alert-error.png" alt="" />
            <p class="bangla-font text-gray-400 text-center">
                এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
            </p>
            <h2 class="bangla-font text-4xl font-bold text-center">
                নেক্সট Lesson এ যান
            </h2>
    `;
    lessonItemDiv.appendChild(newDiv);
    loader(false);
    return;
  }
  dataArray.map((data) => {
    const newDiv = document.createElement('div');
    newDiv.innerHTML = `
        <div class="bg-white p-5 rounded flex flex-col justify-between">
              <div class="space-y-5">
                <h4 class="text-center text-xl font-bold">${
                  data.word ? data.word : 'word পাওয়া যায়নি'
                }</h4>
                <p class="text-xl text-center">Meaning /Pronounciation</p>
                <h4 class="bangla-fonttext-xl text-center">"${
                  data.meaning ? data.meaning : 'আর্থ পাওয়া যায় নি'
                } / ${
      data.pronunciation ? data.pronunciation : 'উচ্চারণ পাওয়া যায়নি'
    }"</h4>
              </div>
              <div class="flex justify-between">
                <button onclick='info(${data.id})' class="btn">
                  <i class="fa-solid fa-circle-info"></i>
                </button>
                <button class="btn">
                  <i class="fa-solid fa-volume-high"></i>
                </button>
              </div>
        </div>
    `;

    lessonItemDiv.appendChild(newDiv);
    loader(false);
  });
};

const lesssonButtons = (data) => {
  const buttonSection = document.getElementById('lesson-btn-section');
  data.map((button) => {
    const newDiv = document.createElement('div');
    newDiv.innerHTML = `
      <button id='lesson-button-${button.level_no}' onclick=" lessonsItem(${button.level_no})" class="btn btn-outline btn-primary lesson-button">
        <i class="fa-solid fa-book-open"></i>Lesson - ${button.level_no}
      </button>
      `;
    buttonSection.appendChild(newDiv);
  });
};

Lessons();
