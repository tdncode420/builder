# JS TTS API

```js
// the controller interface for web speech synthesis API
window.speechSynthesis; // Returns a `SpeechSynthesis` object

// get available voices as `SpeechSynthesisVoice` objects
SpeechSynthesis.getVoices();
/*
  SpeechSynthesisVoice {}
    .name 
        - the name of the voice
    .lang 
        - the language of the voice
    .default 
        - returns `true` if the voice is the default voice for the synthesis engine
*/

// create an instance of `SpeechSynthesisUtterance` and pass in the text to speak
new SpeechSynthesisUtterance(/* ...text */);

// set the voice
SpeechSynthesisUtterance.voice = /* ...voice */;

// set the voice's pitch
SpeechSynthesisUtterance.pitch = /* ...pitch */;

// set the voice's speed rate
SpeechSynthesisUtterance.rate = /* ...rate */;

// speak
SpeechSynthesis.speak(SpeechSynthesisUtterance);
```
