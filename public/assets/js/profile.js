const e = require("express")

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


//validation: min length and characters of password, max length of texts, remove whitespaces
function alphanumeric(inputtxt){ 
    var letters = /^(?=.*[a-zA-Z])(?=.*[0-9])/
    if(inputtxt.value.match(letters)){
        return true
    }
    return false
}

//validation
function validateForm(name){
    element = document.getElementsByName(name)[0]
    console.log(element)
    element.style.border = "solid"
    element.style.borderWidsth = "15px"
    //address
    if(name == "address"){
        if (element.value.length > 1000 || element.value.length == 0){
            element.style.borderColor = "red"
        }
        else{
            element.style.borderColor = "#74cf74"   
        }
    }
    //email
    if(name == "email"){
        if(!element.value.includes('@') || element.value.length == 0 || element.value.length > 250){
            element.style.borderColor = "red"
        }
        else{
            element.style.borderColor = "#74cf74"
            temp = element.value
            element.value = temp.trim()
        }
    }
    //password
    if(name == "password"){
        if(element.value.length == 0 || element.value.length < 8 || element.value.length > 250 || !alphanumeric(element.value)){
            element.style.borderColor = "red"
        }
        else{
            element.style.borderColor = "#74cf74" 
        }
    }
    //first name and last name
    if(name == "first_name" || name == "last_name"){
        if(element.value.length == 0 || element.value.length > 250){
            element.style.borderColor = "red"
        }
        else{
            element.style.borderColor = "#74cf74"
            temp = element.value
            element.value = temp.trim()
        }
    }
}

function changetab_a(ds){
    if(ds=='receipts'){
        document.getElementById('div-rtab').style.display = 'block'
        document.getElementById('div-ctab').style.display = 'none'
        document.getElementById('div-ptab').style.display = 'none'
        document.getElementById('btn-rtab').classList.remove('unselected')
        document.getElementById('btn-ctab').classList.add('unselected')
        document.getElementById('btn-ptab').classList.add('unselected')
        document.getElementById('mid-rtab').style.display = 'block'
        document.getElementById('mid-ctab').style.display = 'none'
        document.getElementById('mid-ptab').style.display = 'none'
    }
    if(ds=="categories"){
        document.getElementById('div-rtab').style.display = 'none'
        document.getElementById('div-ctab').style.display = 'block'
        document.getElementById('div-ptab').style.display = 'none'
        document.getElementById('btn-rtab').classList.add('unselected')
        document.getElementById('btn-ctab').classList.remove('unselected')
        document.getElementById('btn-ptab').classList.add('unselected')
        document.getElementById('mid-rtab').style.display = 'none'
        document.getElementById('mid-ctab').style.display = 'block'
        document.getElementById('mid-ptab').style.display = 'none'
    }
    if(ds=="products"){
        document.getElementById('div-rtab').style.display = 'none'
        document.getElementById('div-ctab').style.display = 'none'
        document.getElementById('div-ptab').style.display = 'grid'
        document.getElementById('btn-rtab').classList.add('unselected')
        document.getElementById('btn-ctab').classList.add('unselected')
        document.getElementById('btn-ptab').classList.remove('unselected')
        document.getElementById('mid-rtab').style.display = 'none'
        document.getElementById('mid-ctab').style.display = 'none'
        document.getElementById('mid-ptab').style.display = 'block'

    }
}