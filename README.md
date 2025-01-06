# Chat AI in Glassmorphism Style

Welcome to the **Glassmorphism Chat AI** repository!

![Glassmorphism Interface](https://s7.gifyu.com/images/SXQP8.png)

This project provides a minimalistic yet elegant chat interface designed to connect users with two different language models: **ChatGPT (OpenAI)** and **Gemini (Google)**.

The layout uses a **Glassmorphism** style, complete with smooth animations and sleek UI elements to create a unique visual experience.

This project brings together the following functionalities:

- **Chat**: Send messages to GPT or Gemini using your own API keys.  
- **Glassmorphism Theme**: A translucent (frosted glass) look with a modern blur effect.  
- **Settings Modal**: Easily enter, save, or remove your API key.  
- **Local Storage**: Your API key is stored in the browser’s `localStorage`, preserving your session between page reloads.  

## Demo

![Live Demo](https://s13.gifyu.com/images/SXQ6D.gif)

[https://codepen.io/FredSRocha/pen/pvzpoKz](https://codepen.io/FredSRocha/pen/pvzpoKz)

## Features

- **Responsive UI**: Adapts to various screen sizes.
- **Modern Design**: Subtle transitions, shadows, and glass blur effects.
- **Dual Model Support**: GPT (OpenAI) and Gemini (Google).
- **Compatible with Modern Browsers**: Chrome, Firefox, Edge, etc.
- **Easy Customization**: Simple to modify colors, fonts, and the glass effect.

### Tips

The code automatically detects whether the API key is GPT or Gemini based on the prefix.

- **GPT**: Typically, your OpenAI key starts with `sk-`.  
- **Gemini**: Generally, Google Gemini keys don’t start with `sk-`.  

## Prerequisites

1. **Modern Browser**  
   - This code is primarily tested on Chrome, Firefox, and Edge.  
2. **Internet Connection**  
   - Required for making API requests to OpenAI and Google.  
3. **API Keys**  
   - **GPT**: Obtain at [OpenAI Platform](https://platform.openai.com/account/api-keys)  
   - **Gemini**: Obtain at [Google AI Studio](https://makersuite.google.com/app/apikey)  

You’ll need a valid API key to receive responses from the language models.

## Customization

If you want to adapt the style to your needs:

- **Colors & Fonts**: All color and font variables are defined in the `:root { ... }` section of the inline CSS.
- **Glassmorphism**:
  - Adjust the **blur** effect by modifying `--glass-blur`.
  - Control the translucent background color with `--glass-bg` and the border color with `--glass-border`.
- **DOM Elements**: You can rearrange HTML structure, changing the order of components (header, footer, etc.).

Enjoy the **Glassmorphism Chat AI** and have fun exploring!

MIT License.

> **Note**: This project is intended as a simple interface template for consuming AI APIs. Make sure to review the usage terms and any associated costs for OpenAI and Google Gemini APIs.
