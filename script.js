const myLibrary   =[];
const titleInput  = document.getElementById('title');
const authorInput = document.getElementById('author');
const pagesInput  = document.getElementById('pages');
const readInput   = document.getElementById('read');
const form        = document.getElementById('form');
const newBook     = document.getElementById('newbook')
const submitBook  = document.getElementById('submit');
const iconclose   = document.getElementById('iconclose');
const container   = document.getElementById('container');

const auth          = firebase.auth();
const db            = firebase.firestore();
const whenSignedIn  = document.getElementById('loggedin');
const whenSignedOut = document.getElementById('loggedout');

const signinBttn   = document.getElementById('loginbutton');
const logoutBttn  = document.getElementById('logoutbutton');
const userDetails = document.getElementById('userdetails');

const provider = new firebase.auth.GoogleAuthProvider();

let booksRef;
let unsubscribe;

signinBttn.addEventListener('click', function(){ 

    

    return auth.signInWithPopup(provider);
})

logoutBttn.addEventListener('click', function(){

    
    return auth.signOut();
})

auth.onAuthStateChanged(user => {
    if (user) {
        userDetails.innerHTML = `Welcome to your library ${user.displayName} !`
        let profilepic = document.createElement('img');
        profilepic.classList.add('profilepic')
        profilepic.setAttribute('src', user.photoURL);
        userDetails.appendChild(profilepic); 

        whenSignedOut.style.display = 'none';
        whenSignedIn.style.display = 'block';
        newBook.removeAttribute('disabled');
        container.style.pointerEvents = 'auto';

      booksRef = db.collection('books');
        forDisplay();




    newBook.addEventListener('click', function(){  //button that opens input form, and hiddes container elements

        let bookshow = document.querySelectorAll('.bookInfo');
        bookshow.forEach(element => element.hidden = true)

        form.style.display = 'inline';
        newBook.hidden= true;

        
    })

    iconclose.addEventListener('click', function(){   //closing form icon. shows hidden elements of container

    form.style.display = 'none';
    newBook.hidden = false;
    let bookshow = document.querySelectorAll('.bookInfo');
    bookshow.forEach(element => element.hidden = false);
    })



    submitBook.addEventListener('click',addBook);   //submits the book for showing and display on container




    function addBook(){                           //if title and author are there adds book to the library array and calls display func.

        if(titleInput.value == 0 || authorInput.value == 0){

           alert('Please, introduce at least Title and Author of the book')
        
        }else{
            
        let newObject = nuevo();


        form.style.display = 'none';
        newBook.hidden = false;
        alert('YOUR BOOK WAS ADDED TO YOUR LIBRARY !')


        myLibrary.push(newObject);

        booksRef.add(newObject)
        console.log(booksRef)

        return forDisplay();
        }
    

    
    }

    function nuevo(){        //object creator for books.

        const { serverTimestamp} = firebase.firestore.FieldValue;
    
            return {
                uid: user.uid,
                title: titleInput.value,
                author: authorInput.value,
                pages: pagesInput.value,
                read: readInput.value,
                createdAt: serverTimestamp()
            }
        
    };

        function forDisplay(){     //on every run, deletes displayed elements and generate the newones.

       
                
        let elements = document.querySelectorAll('.onDisplay');
        console.log(elements);
        elements.forEach(element => element.remove());


       window.unsubscribe = booksRef.where('uid', '==', user.uid)
        .get()
        .then((querySnapshot) => {

            querySnapshot.forEach((obj) => {

                let onDisplay = document.createElement('div');
                onDisplay.classList.add('onDisplay');
                onDisplay.setAttribute('data-id', obj.id);

                onDisplay.addEventListener('dblclick', function(){

                    this.remove();

                    return booksRef.doc(obj.id).delete();
                })

                let bookinfo = document.createElement('div');
                bookinfo.classList.add('bookInfo');
                let finished = document.createElement('div');
                    if(obj.data().read == 'YES'){
                        finished.classList.add('finishedyes');
                    }else{ finished.classList.add('finishedno')}

                    finished.setAttribute('data-id', obj.id)

                    finished.addEventListener('click', function(){

                        finished.classList.toggle('finishedyes');
                        finished.classList.toggle('finishedno');
                        if(obj.data().read == 'NO'){

                           return booksRef.doc(obj.id).update({

                            read: 'YES'

                           });
                        } else { return booksRef.doc(obj.id).update({

                            read: 'NO'
                        })}
                    })

                    bookinfo.innerHTML =`<p class= "ondisplaytext" ><strong>Title: </strong>${obj.data().title}<br>
                    <strong> Author: </strong>${obj.data().author}<br> <strong>Pages: </strong> ${obj.data().pages}<br></p>`

                bookinfo.appendChild(finished);
                onDisplay.appendChild(bookinfo);

                titleInput.value = "";
                author.value = "";
                pages.value = "";
                readInput.value = false;

                return container.appendChild(onDisplay);

                        })
                        
        })

       
}
      
} else { 

        unsubscribe && unsubscribe();
    
        whenSignedOut.style.display = 'block';
        whenSignedIn.style.display =  'none';
        newBook.setAttribute('disabled', "")
        container.style.pointerEvents = 'none';
    
        let hiddenbooks =document.querySelectorAll('.onDisplay');
        hiddenbooks.forEach(book => book.style.visibility = 'hidden');
    }
});

