class App {
  constructor () {
    this.html = {
      status: document.getElementById('status'),
      data: document.getElementById('data'),
      scanButton: document.getElementById('scan-button'),
    };
    
    this.html.scanButton.onclick = this.doScan.bind(this);
    
    if (this.isNfcCompatible()) {
      this.updateStatus('Your device & browser supports NFC.', 'ok');
    } else {
      this.updateStatus('Your device & browser don\'t support NFC.', 'error');
    }
  }
  
  render () {
    
  }
  
  async doScan () {
    try {
      const reader = new NDEFReader()
      
      await reader.scan();
      
      reader.onreading = (event) => {
        const decoder = new TextDecoder();
        let data = ''
        for (const record of event.message.records) {
          data += `Record Type: ${record.recordType} \r\n`
            + `MIME type: ${record.mediaType} \r\n`
            + `data: ${record.data} \r\n`;
        }
        
        this.updateData(`> ${(new Date())} \r\n${data}`);
      }
    } catch (err) {
      this.updateStatus(err, 'error');
    }
  }
  
  updateStatus (text, type) {
    this.html.status.textContent = text;
    this.html.status.className = `status-${type}`;
  }
  
  updateData (text) {
    this.html.data.textContent = text;
  }
  
  isNfcCompatible () {
    return !!(window.NDEFReader);
  }
}

/*function debugObject (obj, depth = 0) {
  let output = '';
  Object.keys(obj).forEach((key) => {
    
    
    output += '.'.repeat(depth)
      + key + ':' + obj
  })

}*/


window.onload = function init () {
  window.app = new App();
}
