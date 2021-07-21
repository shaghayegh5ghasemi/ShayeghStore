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