(function(){
	const effects = document.querySelector("header")
	const transparecy = [1,2,3]
	const bubbleColor = ((h=new Date().getHours()) && h>18 || h<6) ? '000' : 'FFF'
	const duration = 5000
	const interval = 1500
	const numCreate = Math.floor(duration / interval) + 1
	for(let i=0; i<numCreate; i++){
		const div = document.createElement('div')
			div.className = 'e'
			div.opacity = 0
			div.setAttribute('opacity',0)
		effects.append(div)
	}
	function createEffect(){
		const div = document.querySelector('div.e[opacity="0"]')
			div.style.background = '#'+bubbleColor+transparecy[Math.floor((Math.random()*transparecy.length))]
			div.style.width = div.style.height = (Math.floor((Math.random() * (window.innerWidth/3)) + (window.innerWidth/10))) + 'px'
			div.style.left = ((Math.floor(Math.random()*2)==0)?-(parseInt(div.style.width)/3):window.innerWidth-(parseInt(div.style.width)/3)) + 'px'
			div.style.bottom = (((x=Math.floor((Math.random()*500)+1)) && x<parseInt(div.style.height) && Math.floor(Math.random()*2)==0) ? -x : x) + 'px'
		setTimeout(()=>{div.style.opacity=1,  div.setAttribute('opacity',1) },100)
		setTimeout(()=>{div.style.opacity=0, div.setAttribute('opacity',0) },duration)
	}
	createEffect()
	setInterval(()=>{ createEffect() },interval)
})()
const buttonTag = [...document.querySelectorAll('label.btn')]
buttonTag.map(btn=>{
	btn.onclick=(obj)=>{
		obj.preventDefault()
		if(document.querySelector('label.btn.active')) document.querySelector('label.btn.active').classList.remove('active')
		btn.classList.add('active')
		const workSelected = document.querySelector('.workSelected')
		workSelected.firstElementChild.innerHTML = `Exibindo Projetos ${btn.textContent}`
		
		const workList = document.querySelector('.workList')
		workList.style.width = workList.offsetWidth
		const workListParentElement = workList.parentElement
		workListParentElement.style.width = workList.style.width
		workListParentElement.style.overflow = 'hidden'
		workListParentElement.style.transition = 'all 0.5s linear'
		setTimeout(()=>{workListParentElement.style.width = 0},100)
		setTimeout(()=>{
			workSelected.style.display = 'block'
			const list = [...document.querySelectorAll('.workList>div')]
			const listWithComponent = list.filter(work=>work.getAttribute('tags').indexOf(btn.textContent.trim())!==-1)
			list.map(work=>work.setAttribute('style','display:none!important'))
			if(btn.textContent.indexOf('Todos')!==-1)
				list.map(work=>work.removeAttribute('style'))
			else
				listWithComponent.map(work=>work.removeAttribute('style'))
			setTimeout(()=>{workSelected.style.opacity = 1},100)
			setTimeout(()=>{
				workSelected.style.opacity = 0
				setTimeout(()=>{
					workSelected.style.display = 'none' 
					workListParentElement.style.width=workList.style.width
				},100)
			},1500)
		},600)
	}
})
window.onscroll = e => {
	let scroll = window.scrollY > 500
	let navbar = document.querySelector(".fixed-top") == null
	let status = scroll && navbar ? 1 : (!scroll && !navbar ? 2 : 0) 
	let navBar = document.querySelector('.navbar')
	let Section = document.querySelector('section.container')
	if(status === 1){
		navBar.classList.add('fixed-top')
		Section.style.paddingTop = navBar.offsetHeight + 'px'
	}else if(status === 2 ){
		navBar.classList.remove('fixed-top')
		Section.removeAttribute('style')
	}
}
window.onhashchange = e => {
	document.querySelector('.nav-item.active') == null ? false : document.querySelector('.nav-item.active').classList.remove('active')
	if(document.querySelector('[href="'+location.hash+'"]'))
	document.querySelector('[href="'+location.hash+'"]').parentNode.classList.add('active')			
	if(e) document.querySelector('.navbar-toggler').onclick()
}
document.querySelector('header').onmousedown = function(x){
	this.onmousemove = function(e){
		const div = document.createElement('div')
			div.className = 'ex'
			div.style.top = e.pageY + 'px'
			div.style.left = e.pageX + 'px'	
			this.append(div)
		setTimeout(()=>{ div.style.opacity=0 },500)
		setTimeout(()=>{ div.remove() },1500)
	}
	this.onmouseup = function(){this.onmousemove=null}
}
document.querySelector('header').onmouseup=function(){ this.onmousemove = null }
document.querySelector('head>style').remove()
document.querySelector('.__l').remove()
document.querySelector('.navbar-toggler').onclick = e => {
	document.querySelector('.navbar-topmenu').classList.toggle('hidden-xs-down')
}
window.onscroll()
window.onhashchange()
