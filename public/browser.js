document.addEventListener("click", function(e){
    if(e.target.classList.contains("edit-me")){
        let userInput = prompt("Enter the new text",   _default = e.target.parentElement.parentElement.querySelector(".item-text").innerHTML)
        
        if(userInput){
            axios.post('/update', {text: userInput, id: e.target.getAttribute('data-id')}).then(function(){
                e.target.parentElement.parentElement.querySelector(".item-text").innerHTML = userInput
            }).catch( function(){
                // Update did not succeed
            })
        }
    }
})

document.addEventListener("click", function(e){

    if(e.target.classList.contains("delete-me")){
        if(confirm(`Confirm delete : ${ e.target.parentElement.parentElement.querySelector(".item-text").innerHTML } ` )){
            axios.post('/delete', {id: e.target.getAttribute('data-id')}).then(function(){
                e.target.parentElement.parentElement.remove() 
            }).catch( function(){
                // Update did not succeed
            })
        }
        else{
            console.log('Fine')
        }
    }
})