module.exports =
class qrimage  
  constructor: (qrstr,contentstr) ->   
    # Create root element    
    @element = document.createElement('div')   
    @element.classList.add('qrimage')
    @element.style.backgroundColor = 'white';
    @element.style.setProperty('border-radius', '10px')

    title = document.createElement('div')
    title.textContent = '真机同步调试'    
    title.style.setProperty('color', 'black')
    title.style.setProperty('font-weight', 'bold')
    title.style.setProperty('margin-left', '20px')
    title.style.setProperty('padding-top', '20px')
    title.style.setProperty('height', '50px')
    title.style.setProperty('font-size', '18px')

    content = document.createElement('div')

    text = document.createElement('p')
    text.textContent = contentstr    
    text.classList.add('text')
    text.style.setProperty('color', '#9a9a9a')
    text.style.setProperty('margin', '0 50px')
    text.style.setProperty('font-size', '15px')

    text1 = document.createElement('p')
    text1.textContent = '提示:请下载并打开AppRunner 或 自定义AppRunner, 点击小圆球, 选择输入方式输入 IP 和端口连接,或者选择扫码连接方法扫码以进行 WiFi 调试.'    
    text1.style.setProperty('color', '#9a9a9a')
    text1.style.setProperty('margin', '0 50px')

    content.style.setProperty('margin', '10 auto')
    content.appendChild(text)
    content.appendChild(text1)
    
    # Create message element    
    message = document.createElement('div')
    message.style.setProperty('width', '160px')
    message.style.setProperty('height', '160px')
    message.style.setProperty('margin', '0 auto')
    message.innerHTML = qrstr    
    message.classList.add('message')

    @button = document.createElement('button')   
    @button.classList.add('button')
    @button.textContent = '关闭'
    @button.style.setProperty('color', 'black')
    @button.style.setProperty('font-size', '18px')
    @button.style.setProperty('font-weight', 'bold')
    @button.style.setProperty('border-radius', '2px')
    @button.style.setProperty('width', '94px')
    @button.style.setProperty('height', '45px')
    @button.style.backgroundColor ='#3dd18f'

    @button.style.setProperty('padding', '10px 28px')
    @button.style.setProperty('color', 'white')
    @button.style.setProperty('text-align', 'center')
    @button.style.setProperty('border', 'none')
    @button.style.setProperty('margin-top', '15px')
    @button.style.setProperty('margin-bottom', '15px')
    @button.style.setProperty('margin-left', 'calc((100% - 94px)/2)')


    @element.appendChild(title)
    @element.appendChild(content)
    @element.appendChild(message)
    @element.appendChild(@button)

    # Returns an object that can be retrieved when package is activated  
  serialize: ->  
  
   # Tear down any state and detach  
  destroy: ->  
    @element.remove()

  hide: -> @panel?.destroy()

  getElement: ->   
    @element

  getButton: ->   
    @button

  



