function addEventListenersToInputs() {
    

    let inputFields = document.querySelectorAll("input");

    inputFields.forEach(input => {
        try {
            input.addEventListener("focus", function(e) {
                try {
                    e.target.previousElementSibling.style.transform = "translateY(-2.35em)"
     
                }
                catch (e) {
                    
                }
            })
        }
        catch {
            console.log(`${e.target} is not correct`)
        }
    })
    
    inputFields.forEach(input => {
        input.addEventListener("blur", function(e) {
            try {
                if(e.target.value == "") {
                    e.target.previousElementSibling.style.transform = "translateY(0) translateX(0.5em)"
                }
            }
            catch {
                
            }
        })
    })

    return console.log("add event listeners");
}


