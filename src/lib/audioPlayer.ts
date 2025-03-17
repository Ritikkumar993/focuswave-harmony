
// A simple utility to manage binaural beat generation

class BinauralBeatGenerator {
  private audioContext: AudioContext | null = null;
  private leftOscillator: OscillatorNode | null = null;
  private rightOscillator: OscillatorNode | null = null;
  private gainNode: GainNode | null = null;
  private isPlaying = false;
  private baseFrequency = 200; // Base carrier frequency

  constructor() {
    // AudioContext is created on first play to avoid autoplay restrictions
  }

  private setupAudioContext() {
    if (!this.audioContext) {
      this.audioContext = new AudioContext();
      this.gainNode = this.audioContext.createGain();
      this.gainNode.gain.value = 0.2; // Lower volume by default
      this.gainNode.connect(this.audioContext.destination);
    }
  }

  public play(frequency: number, backgroundSound: string | undefined = undefined) {
    this.setupAudioContext();
    
    if (this.isPlaying) {
      this.stop();
    }

    if (!this.audioContext) return;

    // Create oscillators for left and right ears
    this.leftOscillator = this.audioContext.createOscillator();
    this.rightOscillator = this.audioContext.createOscillator();

    // Set frequencies - the difference between ears creates the binaural beat
    this.leftOscillator.frequency.value = this.baseFrequency;
    this.rightOscillator.frequency.value = this.baseFrequency + frequency;

    // Create a merger to send left oscillator to left ear, right to right ear
    const merger = this.audioContext.createChannelMerger(2);
    
    // Connect left oscillator to left channel
    const leftGain = this.audioContext.createGain();
    this.leftOscillator.connect(leftGain);
    leftGain.connect(merger, 0, 0);
    
    // Connect right oscillator to right channel
    const rightGain = this.audioContext.createGain();
    this.rightOscillator.connect(rightGain);
    rightGain.connect(merger, 0, 1);
    
    // Connect merger to main gain node
    merger.connect(this.gainNode!);
    
    // Start the oscillators
    this.leftOscillator.start();
    this.rightOscillator.start();
    
    this.isPlaying = true;
    
    // If there's a background sound specified, we would play it here
    // For now we'll just log it
    if (backgroundSound) {
      console.log(`Playing background sound: ${backgroundSound}`);
      // In a real implementation, you would:
      // 1. Load the audio file
      // 2. Create an audio buffer source
      // 3. Connect it to the gain node
      // 4. Start it
    }
  }

  public stop() {
    if (!this.isPlaying) return;
    
    // Stop and disconnect oscillators
    if (this.leftOscillator) {
      this.leftOscillator.stop();
      this.leftOscillator.disconnect();
      this.leftOscillator = null;
    }
    
    if (this.rightOscillator) {
      this.rightOscillator.stop();
      this.rightOscillator.disconnect();
      this.rightOscillator = null;
    }
    
    this.isPlaying = false;
  }

  public setVolume(volume: number) {
    if (this.gainNode) {
      this.gainNode.gain.value = volume;
    }
  }

  public isActive() {
    return this.isPlaying;
  }
}

// Singleton instance for the whole app
const binauralPlayer = new BinauralBeatGenerator();

export default binauralPlayer;
