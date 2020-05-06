class App {
  constructor () {
    this.html = {
      status: document.getElementById('status'),
      data: document.getElementById('data'),
      scanButton: document.getElementById('scan-button'),
    };
    
    this.html.scanButton.onclick = this.doScan.bind(this);
    this.action = 'idle';
    
    if (this.isNfcCompatible()) {
      this.updateStatus('Your device & browser supports NFC.', 'ok');
    } else {
      this.updateStatus('Your device & browser don\'t support NFC.', 'error');
    }
  }
  
  async doScan () {
    try {
      // Prevent multiple concurrent scan actions
      if (this.action !== 'idle') return;
      this.html.scanButton.disabled = true;
      
      const reader = new NDEFReader();
      
      reader.onreading = (event) => {
        const decoder = new TextDecoder();
        let data = ''
        for (const record of event.message.records) {
          data += `event.message: ${event.message} \r\n`
            + `Record Type: ${record.recordType} \r\n`
            + `MIME type: ${record.mediaType} \r\n`
            + `data: ${record.data} \r\n`;
        }
      
        this.updateData(`> ${(new Date())} \r\n${data}`);
        
        // WARNING: the device does not stop scanning!
      }
      
      this.action = 'scanning';
      this.updateStatus('Scanning... please tap this device on an NFC tag', 'ok')
      
      await reader.scan();
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

window.onload = function init () {
  window.app = new App();
}
