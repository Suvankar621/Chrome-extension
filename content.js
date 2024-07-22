let inputTimeout;

function createEventObject(eventType, details) {
    return {
      eventType: eventType,
      details: details,
      timestamp: new Date().toISOString()
    };
  }
  
  function startScanning() {
    document.addEventListener('click', trackClick);
    document.addEventListener('input', trackInput);
  }
  
  function trackClick(e) {
    let element = e.target;
    console.log(element)
    let eventDetails = `Clicked on element: ${element.tagName}, id: ${element.id}, class: ${element.className} value:${element.innerText}`;
    let eventObject = createEventObject('click', eventDetails);
    // console.log(eventObject);
    saveEvent(eventObject);
  }

//   function trackInput(e) {
//     let element = e.target;
//     let eventDetails = `Input in element: ${element.tagName}, id: ${element.id}, class: ${element.className}, value: ${element.value}`;
//     let eventObject = createEventObject('input', eventDetails);
//     console.log(eventObject);
//     saveEvent(eventObject);
//   }
function trackInput(e) {
    let element = e.target;
    let eventDetails = `Input in element: ${element.tagName}, id: ${element.id}, class: ${element.className}, value: ${element.value}`;
  
    // Clear previous timeout to ensure only final input value is captured
    clearTimeout(inputTimeout);
  
    // Set timeout to capture input value after user has finished typing
    inputTimeout = setTimeout(() => {
      let eventObject = createEventObject('input', eventDetails);
      console.log(eventObject); // Optionally log the eventObject
      saveEvent(eventObject);
    }, 1000); // Adjust delay as needed (e.g., 500 milliseconds)
  }

  function trackScroll() {
    // Clear previous timeout to ensure only final scroll position is captured
    clearTimeout(scrollTimeout);
    
    // Set timeout to capture scroll position after user has finished scrolling
    scrollTimeout = setTimeout(() => {
      let scrollPosition = window.scrollY;
      let eventDetails = `Scrolled to position: ${scrollPosition}`;
      let eventObject = createEventObject('scroll', eventDetails);
      console.log(eventObject); // Optionally log the eventObject
      saveEvent(eventObject);
    }, 500); // Adjust delay as needed (e.g., 500 milliseconds)
  }
  
  
  function saveEvent(event) {
    if (chrome && chrome.runtime && chrome.runtime.sendMessage) {
      chrome.runtime.sendMessage({ event: event });
    } else {
      console.error('chrome.runtime.sendMessage is not available');
    }
  }
  
  document.addEventListener('startScanning', startScanning);
  