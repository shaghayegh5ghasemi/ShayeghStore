function changetab(ds){
    if(ds=='receipts'){
        document.getElementById('title-rtab').style.display = 'block'
        document.getElementById('div-rtab').style.display = 'block'
        document.getElementById('title-etab').style.display = 'none'
        document.getElementById('div-etab').style.display = 'none'
        document.getElementById('btn-rtab').classList.remove('unselected')
        document.getElementById('btn-etab').classList.add('unselected')
    }
    else{
        document.getElementById('title-rtab').style.display = 'none'
        document.getElementById('div-rtab').style.display = 'none'
        document.getElementById('title-etab').style.display = 'grid'
        document.getElementById('div-etab').style.display = 'block'
        document.getElementById('btn-etab').classList.remove('unselected')
        document.getElementById('btn-rtab').classList.add('unselected')
    }
}

//validation: required input
function validateForm(){
    var empty = 0
    var inputs = document.getElementsByClassName("input_data")
    for(let i = 0; i<inputs.length;i++){
        if(inputs[i].value.length == 0){
            inputs[i].style.borderColor = "red";
            empty += 1
        }
        else{
            inputs[i].style.borderColor = "green" 
        }
    }
    if(empty != 0){
        return false
    }
    return true
}
//validation: min length and characters of password, max length of texts, remove whitespaces
function alphanumeric(inputtxt){ 
    var letters = /^[0-9a-zA-Z]+$/
    if(inputtxt.value.match(letters)){
        return true
    }
    return false
}

function validation(input){
    inputs = document.getElementsByClassName("input_data")
    element = document.getElementsByClassName("input_data")[0]
    for(let i = 0; i<inputs.length;i++){
        if(inputs.name == input){
            element = inputs[i]
            break
        }
    }
    if(input == "password"){
        if(value.length < 8 || alphanumeric(element.value) == false){
            element.style.borderColor = "red"
        }
        else {
            element.style.borderColor = "green"
        }
    }
    else if(input == "first_name" || input == "last_name" || input == "email"){
        if(element.value.length >= 255){
            element.style.borderColor = "red"
        }
        else {
            element.style.borderColor = "green"
        }
        let resultString = element.value
        element.value = resultString.trim()        
    }
    else if(input == "address"){
        if(element.value.length >= 1000){
            element.style.borderColor = "red"
        }
        else {
            element.style.borderColor = "green"  
        }
    }
}