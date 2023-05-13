document.addEventListener('DOMContentLoaded', function () {
    const toggleSwitch = document.getElementById('toggleSwitch');
  
    // Retrieve the current toggle state from the storage
    chrome.storage.sync.get('enabled', function (data) {
      toggleSwitch.checked = data.enabled;
    });
  
    // Handle toggle switch state changes
    toggleSwitch.addEventListener('change', function () {
      const enabled = toggleSwitch.checked;
  
      // Save the updated toggle state to the storage
      chrome.storage.sync.set({ enabled: enabled }, function () {
        // Send a message to the content script to enable/disable the extension
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          const tabId = tabs[0].id;
          chrome.tabs.sendMessage(tabId, { enabled: enabled });
        });
      });
    });
  });
  