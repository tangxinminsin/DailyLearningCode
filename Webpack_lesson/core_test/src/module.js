const Module = (content) => {
  const dom = document.getElementById('app')
  const module = document.createElement('div')
  module.innerText = 'hello ' + content
  dom.append(module)
}

export default Module