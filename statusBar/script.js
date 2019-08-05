/** 
 * Check if VueJS exists
 */
let sBcreateVue;
let sBfontFamily;
let sBcreatedVue;

function checkFontFamily(font){return Boolean(Object.values(document.styleSheets).filter(s=>s.href ? s.href.includes(font) : false).length)}

if(typeof Vue !== 'function'){
    sBcreateVue = document.createElement('script')
    sBcreateVue.src = 'https://unpkg.com/vue/dist/vue.min.js'
    document.head.appendChild(sBcreateVue)
    sBcreatedVue = true
}
if(!checkFontFamily('Roboto')){
    sBfontFamily = document.createElement('link')
    sBfontFamily.rel = 'stylesheet'
    sBfontFamily.href = 'https://fonts.googleapis.com/css?family=Roboto&display=swap'
    document.head.appendChild(sBfontFamily)
    console.log('Inserido Roboto')
}

const sBdata = {
    site_url: 'https://mthcsta.github.io/',
    loads:{
        json: 'statusBar/projects.json',
        css: {dark:'statusBar/css/dark.css',light:'statusBar/css/light.css'}
    },
    limitList: 3
}

let sBcontent = document.getElementById("statusBar")
sBcontent.innerHTML = `
<div class="body">
<div class="logo noselect"  unselectable="on" onclick="top.location = '${sBdata.site_url}'">
    <div class="name">MthCsta</div>
    <div class="dot">.</div>
    <div class="server">Github.io</div>
</div>
<div class="menu">
    <nav>
        <template v-if="projects.length != 0">
            <a class="titles" v-for="project of projects" :href="project.link" :title="project.desc">{{project.title}}</a>
        </template>
        <template v-else>
            <a v-for="number of ${sBdata.limitList}" class="animates">••••••••••</a>
        </template>
        &nbsp; <a href='${sBdata.site_url}'>Ver Mais</a>
    </nav>
</div>
</div>`

console.log(sBcontent.getAttribute('theme') || 'dark')
let sBloadCss = document.createElement("link")
sBloadCss.rel = "stylesheet"
sBloadCss.href = sBdata.site_url + sBdata.loads.css[sBcontent.getAttribute('theme') || 'dark'] //sBdata.site_url + sBdata.assets + "statusBar.css"
document.head.appendChild(sBloadCss)

function getVue(){
    const sBVue = new Vue({
        data:{
            projects:[]
        },
        methods:{
            getProjects(){
                fetch(sBdata.site_url + sBdata.loads.json).then(r=>r.json())
                    .then(data=>{
                        console.log(data)
                        let listProjects = data.projects
                        let dataList = []
                        for(i=0; i<sBdata.limitList; i++){
                            const rand = Math.floor( Math.random() * listProjects.length)
                            let dataInsert = listProjects[rand]
                            dataInsert.link = dataInsert.link.includes('http') ? dataInsert.link : sBdata.site_url + dataInsert.link
                            dataList.push(dataInsert)
                            listProjects = listProjects.filter(p=>p.title !== listProjects[rand].title)
                        }
                        this.projects = dataList
                    })
            }
        },
        mounted(){
            this.getProjects()
        }
    }).$mount('#statusBar')
}

if(Boolean(typeof sBcreatedVue !== "undefined"))
    sBcreateVue.addEventListener("load",()=>{
        getVue()
    })
else
    getVue()
