class App {
  constructor () {
    this.html = {
      generalStatus: document.getElementById('general-status'),
    };
    
    this.render();
  }
  
  render () {
    if (this.isNfcCompatible()) {
      this.html.generalStatus.textContent = 'Your device is NFC compatible!';
      this.html.generalStatus.className = 'status-ok';
    } else {
      this.html.generalStatus.textContent = 'Your device & browser don\'t support NFC.';
      this.html.generalStatus.className = 'status-error';
    }
  }
  
  isNfcCompatible () {
    return !!('NDEFReader' in window)
  }
}


window.onload = function init () {
  window.app = new App();
}
