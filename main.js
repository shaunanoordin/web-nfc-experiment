class App {
  constructor () {
    this.html = {
      status: document.getElementById('status'),
      
    };
    
    if (this.isNfcCompatible()) {
      this.updateStatus('Your device & browser supports NFC.', 'ok');
    } else {
      this.updateStatus('Your device & browser don\'t support NFC.', 'error');
    }
  }
  
  render () {
    
  }
  
  updateStatus (text, type) {
    this.html.status.textContent = text;
    this.html.status.className = `status-${type}`;
  }
  
  isNfcCompatible () {
    return !!('NDEFReader' in window)
  }
}


window.onload = function init () {
  window.app = new App();
}
