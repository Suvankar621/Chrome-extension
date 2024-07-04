document.getElementById('startScanning').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: startScanning
      });
    });
  });
  
  document.getElementById('downloadXML').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'downloadXML' });
  });
  
  function startScanning() {
    document.dispatchEvent(new CustomEvent('startScanning'));
  }
  