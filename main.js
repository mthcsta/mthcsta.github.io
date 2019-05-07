const __dirname__ = ''
const __dirs__={
    assets:__dirname__ + 'assets/',
       get assetsImage(){return __dirs__.assets + 'image/'},
       get assetsJs(){return __dirs__.assets + 'js/'},
       get assetsCss(){return __dirs__.assets + 'css/'},
    view: __dirname__ + 'view/'
}
function newElement(tagName,className=''){
    const elem = document.createElement(tagName)
    elem.className = className
    return elem
}
const link = newElement('link')
    link.type = 'text/css'
    link.rel = 'stylesheet'
    link.href = __dirs__.assetsCss + 'style.min.css'
document.head.appendChild(link)
const Loading = newElement('div','loading')
const LoadingImage = newElement('img')
    LoadingImage.src = __dirs__.assetsImage + 'ninja.gif'
const LoadingDiv = newElement('div')
    LoadingDiv.nodeValue = ': LOADING :'
Loading.append(LoadingImage,LoadingDiv)
window.onload=()=>{
    const script = newElement('script')
        script.type = 'text/javascript'
        script.src = __dirs__.assetsJs + 'script.min.js'
    document.body.appendChild(script)
}