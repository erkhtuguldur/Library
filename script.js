const myLibrary=[];
function Book(title,author,pagenum,id,haveRead){
    this.title=title;
    this.author=author;
    this.pagenum=pagenum;
    this.id=id;
    this.haveRead=haveRead;
}

function addBookToLibrary(title,author,pagenum,haveRead){
    let uniqueId=crypto.randomUUID();
    let book=new Book(title,author,pagenum,uniqueId,haveRead);
    myLibrary.push(book);
}

Book.prototype.toggleRead=function (){
    this.haveRead=!this.haveRead;
}


const showButton = document.getElementById("showDialog");
const addScreen = document.getElementById("addScreen");
const confirmBtn = addScreen.querySelector("#confirmBtn");
const bookTitle = document.getElementById("bookTitle");
const bookAuthor = document.getElementById("bookAuthor");
const bookPageCt=document.getElementById("bookPageCt");
const bookRead=document.getElementById("bookRead");
const cardsContainer=document.getElementById("cardsContainer");
const toggleButtons=document.querySelectorAll(".toggleRead");
const cancelBtn=document.querySelector("#cancel")
const form=document.querySelector("form");

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("toggleRead")) {
    const current = e.target.textContent.trim().toLowerCase();
     if(current === "have read"){
      e.target.textContent ="haven't read";
      e.target.style.backgroundColor="#f88484"
    }  
      else{
        e.target.textContent ="have read";
        e.target.style.backgroundColor="#9aff86"

      } 


    const parentId=e.target.parentElement.parentElement.id;
    for (let book of myLibrary){
      if(book.id==parentId){
        book.toggleRead();
      }
    }
  }
  else if(e.target.classList.contains("delete")){
    const parent =e.target.parentElement.parentElement;
    const parentId=parent.id;
      for(let i=0;i<myLibrary.length;i++){
        if(myLibrary[i].id==parentId){
          parent.remove();
          myLibrary.splice(i,1);
        }
      }
  }
});


showButton.addEventListener("click", () => {
  addScreen.showModal();
});


confirmBtn.addEventListener("click", (event) => {
  event.preventDefault(); 
  if(form.checkValidity()){
    addScreen.close(); 
  let read=bookRead.checked ? true : false;
  addBookToLibrary(bookTitle.value,bookAuthor.value,bookPageCt.value,read);
  bookAuthor.value='';
  bookTitle.value='';
  bookPageCt.value='';
  bookRead.checked=false;
  cardsContainer.replaceChildren();
  display();
  }
  else{
    form.reportValidity();
  }
});

cancelBtn.addEventListener("click",(event) => {
  event.preventDefault(); 
  addScreen.close(); 
  bookAuthor.value='';
  bookTitle.value='';
  bookPageCt.value='';
  bookRead.checked=false;
}




);

function display(){
  myLibrary.forEach(createCard);
}

function createCard(book){
  let container=document.createElement("div");
  container.setAttribute("id",book.id);
  container.setAttribute("class","card");

  let titleCont=document.createElement("p");
  titleCont.setAttribute("class","titleCont");
  titleCont.textContent="'"+book.title+"'";

  let authorCont=document.createElement("p");
  authorCont.setAttribute("class","authorCont");
  authorCont.textContent=book.author;

  let pageNumCont=document.createElement("p");
  pageNumCont.setAttribute("class","pageNumCont");
  pageNumCont.textContent=book.pagenum+"pg";


  let buttonsContainer=document.createElement("div");
  buttonsContainer.setAttribute("class","buttonsContainer");

  let readButton=document.createElement("button");
  if(book.haveRead){
    readButton.textContent="have read";
    readButton.style.backgroundColor="#9aff86"
  }
  else{
    readButton.textContent="haven't read";
    readButton.style.backgroundColor="#f88484"
  }


  readButton.classList.add("toggleRead");
  readButton.classList.add("cardBtns");

  let deleteButton=document.createElement("button");
  deleteButton.textContent="delete";
  deleteButton.classList.add("delete");
   deleteButton.classList.add("cardBtns");


  buttonsContainer.appendChild(readButton);
  buttonsContainer.appendChild(deleteButton);
  container.appendChild(titleCont);
  container.appendChild(authorCont);
  container.appendChild(pageNumCont);
  container.appendChild(buttonsContainer);
  cardsContainer.appendChild(container);
}


function init(){
   addBookToLibrary("The Hunger Games","Suzanne Collins",384,true);
    addBookToLibrary("The Great Gatsby","F. Scott Fitzgerald",200,false);
     addBookToLibrary("Secret History of the Mongols","Unknown",218,true);
   display();
}
init();