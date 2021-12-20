let images = document.querySelectorAll(".gallery a");
let popup = document.querySelector(".popup");
let biggestImg = document.querySelector(".popup .inner img");
let closeIcon = document.querySelector(".close-icon");
let prevBtn = document.querySelector(".arrows .prev");
let nextBtn = document.querySelector(".arrows .next");
let uploadFile = document.querySelectorAll("form i")

images.forEach((image) => {
    image.addEventListener("click", function (e) {
      e.preventDefault();
      doOpen();
      changableImage(this);
      this.classList.add("showSlide");
      
      let interval = setInterval(() => {
      let showSlide = document.querySelector(".showSlide");
      nextElemSib(showSlide);
      }, 2000);
    });
});

uploadFile.forEach((item) => {
    item.addEventListener("click", function(e){
      this.nextElementSibling.click(); 
    });
    
    item.nextElementSibling.addEventListener("change", function(e) {
        const {files} = e.target;

        for (let file of files){
            const fileReader = new FileReader();

            fileReader.onloadend = function (e) {
                const {result} = e.target;
                 
                const img = document.createElement("img");
                img.setAttribute("src", result);
                document.querySelector(".gallery").appendChild(img);

            };
            fileReader.readAsDataURL(file);
        }
    })
  });





nextBtn.addEventListener("click", function () {
    let showSlide = document.querySelector(".showSlide");
    nextElemSib(showSlide);
  });
  
  prevBtn.addEventListener("click", function () {
    let showSlide = document.querySelector(".showSlide");
    prevElemSib(showSlide);
  });
  
  function doOpen() {
    popup.style.display = "flex";
  }
  
  function doClose() {
    popup.style.display = "none";
  }
  
  closeIcon.addEventListener("click", function () {
    doClose();
    clearInterval(interval);
  });
  
  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && popup.style.display === "flex") {
      doClose();
    }
    clearInterval(interval);
  });
  
  function changableImage(item) {
    let imgSrc = item.getAttribute("href");
    biggestImg.setAttribute("src", imgSrc);
  }
  
  function nextElemSib(item) {
  
    if (item.nextElementSibling !== null) {
      item.nextElementSibling.classList.add("showSlide");
      changableImage(item.nextElementSibling);
    } else {
      item.parentElement.children[0].classList.add("showSlide");
      changableImage(item.parentElement.children[0]);
    }
  
    item.classList.remove("showSlide");
  }
  
  function prevElemSib(item) {
    let length = item.parentElement.children.length;
    
    if (item.previousElementSibling !== null) {
      item.previousElementSibling.classList.add("showSlide");
      changableImage(item.previousElementSibling);
    } else {
      item.parentElement.children[length - 1].classList.add("showSlide");
      changableImage(item.parentElement.children[length - 1]);
    }
    item.classList.remove("showSlide");
  }
  
  popup.addEventListener("click", (e) => {
    if (e.target.classList.contains("popup")) {
      doClose();
    }
  });
  
  document.addEventListener("keydown",(e)=>{
      if (e.code==="ArrowRight") {
       let showSlide = document.querySelector(".showSlide")
       nextElemSib(showSlide);
      }
   })
  
   document.addEventListener("keydown",(e)=>{
    if (e.code==="ArrowLeft") {
     let showSlide = document.querySelector(".showSlide")
     prevElemSib(showSlide);
    }
  })