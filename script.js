const apiModal = document.getElementById("apiModal");
const apiKeyInput = document.getElementById("apiKeyInput");
const saveApiButton = document.getElementById("saveApiButton");
const removeApiButton = document.getElementById("removeApiButton");
const settingsButton = document.getElementById("settingsButton");
const userInput = document.getElementById("userInput");
const sendButton = document.getElementById("sendButton");
const chatMessages = document.getElementById("chatMessages");

// Function to determine which API to use based on the key
function determineApiType(apiKey) {
  return apiKey.startsWith("sk-") ? "gpt" : "gemini";
}

// Function to send a message to GPT
async function sendToGPT(message, apiKey) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }]
    })
  });

  const data = await response.json();
  if (!response.ok)
    throw new Error(data.error?.message || "Error processing GPT message");
  return data.choices[0].message.content;
}

// Function to send a message to Gemini
async function sendToGemini(message, apiKey) {
  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=" +
      apiKey,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: message
              }
            ]
          }
        ]
      })
    }
  );

  const data = await response.json();

  // Check for errors in the response
  if (!response.ok || data.error) {
    throw new Error(data.error?.message || "Error processing Gemini message");
  }

  // Ensure the response is in the expected format
  if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
    console.log("Unexpected Gemini response:", data);
    throw new Error("Invalid response format from Gemini");
  }

  return data.candidates[0].content.parts[0].text;
}

// Modal control functions
function showModal() {
  apiModal.classList.add("show");
  disableChat();
}

function hideModal() {
  apiModal.classList.remove("show");
}

// Chat control functions
function enableChat() {
  userInput.disabled = false;
  sendButton.disabled = false;
}

function disableChat() {
  userInput.disabled = true;
  sendButton.disabled = true;
}

// Function to check for an API key
function checkApiKey() {
  const apiKey = localStorage.getItem("api-key");
  if (apiKey) {
    hideModal();
    enableChat();
    removeApiButton.style.display = "block";
    apiKeyInput.value = apiKey;
  } else {
    showModal();
    removeApiButton.style.display = "none";
    apiKeyInput.value = "";
  }
}

// Function to add messages to the chat
function addMessage(content, isUser = false) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${isUser ? "user-message" : "ai-message"}`;
  messageDiv.textContent = content;
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Main function to send messages
async function sendMessage(message) {
  const apiKey = localStorage.getItem("api-key");
  const apiType = determineApiType(apiKey);

  try {
    sendButton.innerHTML = '<div class="loading"></div>';
    sendButton.disabled = true;
    userInput.disabled = true;

    let response;
    if (apiType === "gpt") {
      response = await sendToGPT(message, apiKey);
    } else {
      response = await sendToGemini(message, apiKey);
    }

    addMessage(response);
  } catch (error) {
    console.error("Error details:", error);
    addMessage("Error sending message: " + error.message);
  } finally {
    sendButton.innerHTML = "Send";
    sendButton.disabled = false;
    userInput.disabled = false;
  }
}

// Event Listeners
saveApiButton.addEventListener("click", () => {
  const apiKey = apiKeyInput.value.trim();
  if (apiKey) {
    localStorage.setItem("api-key", apiKey);
    checkApiKey();
  }
});

removeApiButton.addEventListener("click", () => {
  localStorage.removeItem("api-key");
  checkApiKey();
});

settingsButton.addEventListener("click", showModal);

sendButton.addEventListener("click", () => {
  const message = userInput.value.trim();
  if (message) {
    addMessage(message, true);
    sendMessage(message);
    userInput.value = "";
  }
});

userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendButton.click();
  }
});

// Close the modal when clicking outside
apiModal.addEventListener("click", (e) => {
  if (e.target === apiModal) {
    const apiKey = localStorage.getItem("api-key");
    if (apiKey) {
      hideModal();
    }
  }
});

// Prevent modal from closing when clicking inside it
apiModal.querySelector(".modal").addEventListener("click", (e) => {
  e.stopPropagation();
});

// Check the chat status when the page loads
window.addEventListener("load", () => {
  checkApiKey();
  userInput.focus();
});

// Initialization
checkApiKey();