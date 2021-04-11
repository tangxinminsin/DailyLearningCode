const Module = () => {
  const dom = document.getElementById('root')
  const module = document.createElement('div')
  module.innerText = 'This is module'
  dom.append(module)
}

export default Module