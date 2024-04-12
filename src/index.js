
let div = document.getElementById('username')
//check if user already exists
async function Users(){
    let res = await fetch('http://localhost:3000/users')
    let allUsers = res.json()
    return allUsers
  
}
window.addEventListener('load',Users())
let  usernames = async ()=>{
    let res = await fetch("http://localhost:3000/users")
    let users = await res.json()
    
    console.log(users.length)
    let usernames = [] 
    for(i=0;i<users.length;i++){
        usernames.push(users[i].name)
        
    }
    console.log(usernames)
    return usernames
}
let allUsers = usernames()
console.log(allUsers)

//set the current user
function postUser(e) {
    //get form data 
    e.preventDefault()
    let formData = {
        name: e.target.name.value,
        password: e.target.password.value,
    }

    console.log(formData)
    e.target.reset()
    //get usernames from server
    //validate
                      //post user 
            fetch(`http://localhost:3000/users`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(formData)
            }).then(res => {
                if(res.ok) {
                    return res.json()
                } else {
                    throw new Error("Failed to create a resource!!")
                }
            })
            .catch(err => console.error({
                "Error": err
            }))

}
//hard get inputs
let notes = document.querySelector('#notes')
let title = document.querySelector('#title')
console.log(notes)
//post notes
function submitNotes() {
    let formData =  {
        title:title.value,
        notes:notes.value
    }
    fetch(`http://localhost:3000/notes`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(res => {
        if(res.ok) {
            return res.json()
        } else {
            throw new Error("Failed to create a resource!!")
        }
    })

    .catch(err => console.error({
        "Error": err
    }))


}
let userform = document.querySelector(".m-4")
// attach the event to the form 
userform.addEventListener('submit', postUser)
 
let noteform = document.querySelector(".m-5")
noteform.addEventListener('submit', submitNotes)
console.log(noteform)

//display notes
async function getNotes() {
    fetch(`http://localhost:3000/notes`)
    .then(res => {
        if(res.ok) {
            return res.json()
        } else {
            throw new Error("Failed to fetch resource")
        }
    })
    .then(data => {
        //array iteration 
        data.map((item) => {
            addCard(item)
            console.log(item)
        })
    })
}
getNotes()


async function addCard(notes) {
    //identify the element to attach the specific item form the database
    let track = document.querySelector(".studytrack")
    //create the card 
    let card = document.createElement('div')
    card.className = "card col-2 m-2"
    card.style.backgroundColor="#0466C8;"
    card.innerHTML = `
                
                    <h3>${notes.title}</h3>
                    <p>
                       ${notes.notes}
                    </p>
                    <button type="submit" id="delete"class="btn">Delete</button>
                
    `
    //append it to the actual html element 
    track.append(card)

    //select the delete button 
    let deleteBtn = card.querySelector('#delete')
    //attach an event 
    deleteBtn.addEventListener('click', (e) => {
        fetch(`http://localhost:3000/notes/${notes.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if(res.ok) {
                alert("deleted successfully!!")
            }
        })
        e.target.parentNode.parentNode.remove()
    })

}
    

