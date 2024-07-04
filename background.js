let allEvents = [];

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.event) {
    allEvents.push(request.event);
  } else if (request.action === 'downloadXML') {
    saveToXML();
  }
});

function saveToXML() {
  let xmlContent = '<?xml version="1.0" encoding="UTF-8"?>\n<events>\n';

  allEvents.forEach(event => {
    xmlContent += `  <event>\n`;
    xmlContent += `    <type>${event.eventType}</type>\n`;
    xmlContent += `    <details>${event.details}</details>\n`;
    xmlContent += `    <timestamp>${event.timestamp}</timestamp>\n`;
    xmlContent += `  </event>\n`;
  });

  xmlContent += '</events>';

  const blob = new Blob([xmlContent], { type: 'application/xml' });
  const reader = new FileReader();

  reader.onload = function(event) {
    const xmlString = event.target.result;
    chrome.downloads.download({
      url: 'data:application/xml;charset=UTF-8,' + encodeURIComponent(xmlString),
      filename: 'user_actions.xml'
    });
  };

  reader.readAsText(blob);
}
