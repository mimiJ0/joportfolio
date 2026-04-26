//panels:
const panel = document.querySelectorAll(".panel");
const panel2 = document.getElementById("sidePanel2");

const nextBtn = document.querySelector(".nextBtn");
const backBtn = document.querySelector(".backBtn");
const buttons = document.querySelectorAll(".btn");

const aboutMeMaxIndex = document.querySelectorAll('[data-about]');
const archiveMaxIndex = document.querySelectorAll('[data-archive]');
const linksMaxIndex = document.querySelectorAll('[data-links]');
const creditsMaxIndex = document.querySelectorAll('[data-credits]');

const scrollableContents = document.querySelectorAll('.scrollableView');

let currentPage = 0;
let currentAttr = "";


buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.getAttribute("data-target");
    const targetPanel = document.getElementById(targetId);
   
    if(targetId === "aboutMe") 
      currentAttr = "data-about";

    if(targetId === "Archive") 
      currentAttr = "data-archive";

    if(targetId === "Links") 
      currentAttr = "data-links";

    if(targetId === "Credits") 
      currentAttr = "data-credits";

    //check if a panel is already open
    const isOpen = targetPanel.classList.contains('open');
    panel.forEach(
      p => p.classList.remove("open")
      ,panel2.classList.remove("open")
      ,nextBtn.classList.remove("active")
      ,backBtn.classList.remove("active")
    );

    scrollableContents.forEach(view => {
      view.scrollTop = 0;
    });

    //if not open
    if (!isOpen) {
      currentPage = 0;
      targetPanel.classList.add("open");
      panel2.classList.add("open");
    updatePages();
    }
  });
});

nextBtn.addEventListener('click', ()=> {
  const activePages = document.querySelectorAll(`[${currentAttr}]`);

  if(currentPage < activePages.length - 1) {
    currentPage++;
    updatePages();
  }
});

backBtn.addEventListener('click', ()=> {
  currentPage--;

  if(currentPage >= aboutMeMaxIndex.length)
    currentPage = 0;

  updatePages();
});

function updatePages() {
  const activePages = document.querySelectorAll(`[${currentAttr}]`);
  let currentMaxLength = 0;

  if (currentAttr === "data-about") currentMaxLength = aboutMeMaxIndex.length;
  if (currentAttr === "data-archive") currentMaxLength = archiveMaxIndex.length;
  
  activePages.forEach((div) => {
    if (parseInt(div.getAttribute(currentAttr)) === currentPage) {
      div.style.display = 'grid';
    } else {
      div.style.display = 'none';
    }
  });

  if (currentPage > 0) {
    backBtn.classList.add("active");
  } else {
    backBtn.classList.remove("active");
  }

  //show next button until the last page (-1 because array stuff)
  if (currentPage >= 0 && currentPage < currentMaxLength-1) {
    nextBtn.classList.add("active");
  }
  else
  {
    nextBtn.classList.remove("active");
  }
}

//for the image zoom in:
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeLightboxBtn = document.querySelector('.lightboxCloseBtn');
const allImages = document.querySelectorAll('.panel img');

allImages.forEach(img => {
    img.addEventListener('click', () => {
        lightbox.classList.add('active');
        lightboxImg.src = img.src;
    });
});

closeLightboxBtn.addEventListener('click', (e) => {
    if (e.target !== lightboxImg) {
        lightbox.classList.remove('active');
        lightbox.classList.add('closeAnim');
    }
});
lightbox.addEventListener('animationend', () => {
    lightbox.classList.remove('closeAnim');
});