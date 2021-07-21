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