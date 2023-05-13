// Modify the appearance of the web page
function modifyPageAppearance() {
    // Function to recursively traverse and modify text nodes
    function modifyTextNode(node) {
      const words = node.textContent.split(/\s+/);
  
      const modifiedWords = words.map((word) => {
        if (word.length >= 2) {
          const halfIndex = Math.floor(word.length / 2);
          const firstHalf = word.slice(0, halfIndex);
          const secondHalf = word.slice(halfIndex);
          return `<span style="font-weight: bold;">${firstHalf}</span>${secondHalf}`;
        }
        return word;
      });
      
    // const modifiedWords = words.map((word) => {
    //     if (word.length >= 3) {
    //       return highlightText(word);
    //     }
    //     return word;
    //   });
      
    //   function highlightText(sentenceText) {
    //     const BR_WORD_STEM_PERCENTAGE = 0.5;
    //     const MAX_FIXATION_PARTS = 6;
    //     const FIXATION_LOWER_BOUND = 1;
      
    //     return sentenceText.replace(/\p{L}+/gu, (word) => {
    //       const { length } = word;
      
    //       const brWordStemWidth = length > 3 ? Math.round(length * BR_WORD_STEM_PERCENTAGE) : length;
      
    //       const firstHalf = word.slice(0, brWordStemWidth);
    //       const secondHalf = word.slice(brWordStemWidth);
    //       const htmlWord = `<span style="font-weight: bold;">${makeFixations(firstHalf)}</span>${secondHalf.length ? `${secondHalf}` : ''}`;
    //       return htmlWord;
    //     });
    //   }
      
    //   function makeFixations(textContent) {
    //     const COMPUTED_MAX_FIXATION_PARTS =
    //       textContent.length >= MAX_FIXATION_PARTS ? MAX_FIXATION_PARTS : textContent.length;
      
    //     const fixationWidth = Math.ceil(textContent.length * (1 / COMPUTED_MAX_FIXATION_PARTS));
      
    //     if (fixationWidth === FIXATION_LOWER_BOUND) {
    //       return `<br-fixation fixation-strength="1">${textContent}</br-fixation>`;
    //     }

    //     const fixationsSplits = new Array(COMPUTED_MAX_FIXATION_PARTS)
    //       .fill(null)
    //       .map((item, index) => {
    //         const wordStartBoundary = index * fixationWidth;
    //         const wordEndBoundary =
    //           wordStartBoundary + fixationWidth > textContent.length
    //             ? textContent.length
    //             : wordStartBoundary + fixationWidth;
      
    //         return `<br-fixation fixation-strength="${index + 1}">${textContent.slice(
    //           wordStartBoundary,
    //           wordEndBoundary
    //         )}</br-fixation>`;
    //       });
      
    //     return fixationsSplits.join('');
    //   }

    function resetText() {
        // Remove any modified elements and restore the original text
      
        // Remove all <span> elements added for modifications
        const modifiedElements = document.querySelectorAll('span[bionic-reading-extension]');
        for (const element of modifiedElements) {
          element.outerHTML = element.innerText;
        }
      
        // Remove any custom CSS styles added
        const customStyles = document.querySelectorAll('style[bionic-reading-extension]');
        for (const style of customStyles) {
          style.remove();
        }
      }
      
      chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        if (request.enabled !== undefined) {
          // Apply the extension changes based on the toggle state
          if (request.enabled) {
            // Enable the extension modifications
            modifyText();
          } else {
            // Disable the extension modifications
            resetText();
          }
        }
      });
      
      
      
      
  
      const modifiedContent = modifiedWords.join(' ');
  
      const tempContainer = document.createElement('div');
      tempContainer.innerHTML = modifiedContent;
  
      while (tempContainer.firstChild) {
        node.parentNode.insertBefore(tempContainer.firstChild, node);
      }
  
      node.remove();
    }
  
    // Function to traverse all text nodes in the body
    function traverseTextNodes(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        modifyTextNode(node);
      } else {
        node.childNodes.forEach(traverseTextNodes);
      }
    }
  
    // Start traversing text nodes from the body
    traverseTextNodes(document.body);
  }
  
  // Execute the modification function
  modifyPageAppearance();
  

// Execute the modification function
modifyPageAppearance();
