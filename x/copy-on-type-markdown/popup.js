document.addEventListener('DOMContentLoaded', function () {
  const titleInput = document.getElementById('titleInput');

  // Get the current tab's title and set it as the default input value
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const url = tabs[0].url;
    const title = tabs[0].title.trim();
    titleInput.value = title;
    const markdownLink = `[${title}](${url})`;
    copyToClipboard(markdownLink);
    setCursorToEnd(titleInput);
    titleInput.setSelectionRange(0, titleInput.value.length); // Select all text in the input
  });

  titleInput.addEventListener('input', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const url = tabs[0].url;
      const title = titleInput.value.trim();
      const markdownLink = `[${title}](${url})`;
      copyToClipboard(markdownLink);
      setCursorToEnd(titleInput);
    });
  });

  function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }

  function setCursorToEnd(input) {
    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);
  }
});
