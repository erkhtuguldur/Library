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