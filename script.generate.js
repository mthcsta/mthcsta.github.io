fetch('assets/json/works.json')
.then(response=>{
    return response.json()
})
.then(data=>{
    tags = data.reduce((sum,elem)=>!sum?[...elem.tags]:[...sum,...elem.tags],['Todos'])
    tags = tags.filter((v,i) => tags.indexOf(v) === i)
    html = tags.map(tag=>`<label class="btn btn-secondary m-1"><input type="radio" name="options" autocomplete="off"> ${tag}</label>`)
    document.querySelector('.workTags').innerHTML = html.join('')
    list = data.map(work=>
        `<div class="col-sm-4" tags="${work.tags}">
            <div class="card">
                <div style="background:url('${__dirs__.assetsImage+work.image}');" class="card-background">
                    <div>
                     <div>${work.tags.join(', ')}</div>
                     <div><a class="btn btn-link" target="_blank" href="${work.link}ref=mthcsta.github.io">Abrir ${work.type}</a></div>
                    </div>
                </div>
            </div>					
        </div>`						
    )
    document.querySelector('.workList').innerHTML = list.join('')
})
function createLanguageRow(name,exp){
    const icon = '<i class="fab fa-sketch"></i>'
    const p = document.createElement('p')
        p.innerHTML = icon.repeat(10)

    const pActive = [...p.querySelectorAll('i')] 
        pM = pActive.filter((i,n)=>n<exp ? i.style.color = 'gold' : i.style.color = 'lightgray')
        //p.innerHTML = 
    const b = newElement('b')
        b.append(name)
    const skillName = newElement('div','col-md-2 col-sm-4 col-4 py-2 skillName')
        skillName.append(b)
    const skillIcon = newElement('div','col-md-4 col-sm-8 col-8 py-2 skillIcon')
        skillIcon.append(p)
        document.querySelector('.skillList').append(skillName, skillIcon)
}
{
    createLanguageRow('PHP',8)
    createLanguageRow('Javascript',7)
    createLanguageRow('CSS3',9)
    createLanguageRow('Bootstrap',8)
    createLanguageRow('jQuery',9)
    createLanguageRow('Sql',6)
    createLanguageRow('Sass',10)
    createLanguageRow('Materialize',7)
    createLanguageRow('HTML5',9)
    createLanguageRow('Node.js',5)
}
