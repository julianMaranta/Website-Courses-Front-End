<template>
    <div class="vimeo-dimension">
      <div :id="elementId"></div>
    </div>
  </template>

  <script setup>
  import { ref, onMounted, defineProps } from 'vue';
//  import Vimeo from "@vimeo/player"

  const elementId = ref(`vimeo-player-${Math.random().toString(36).substring(7)}`);
  const playerOptions = defineProps(['videoId', 'width', 'loop']);

  onMounted(() => {
    // Load the Vimeo Player API script
    const script = document.createElement('script');
    script.src = 'https://player.vimeo.com/api/player.js';
    script.onload = () => {
      createVimeoPlayer();
    };
    document.head.appendChild(script);
  });

  function createVimeoPlayer() {
    const options = {
      id: playerOptions.videoId,
      width: playerOptions.width,
      loop: playerOptions.loop,
      controls: true,
      byline: false,
      background: false,
      pip: false,
      title: false
    };

    const player = new Vimeo.Player(elementId.value, options);

    // You can add more event listeners and interact with the player as needed
    player.setVolume(0.1)
    player.on('play', () => {
      console.log('Video played! Video ID:', playerOptions.videoId);
    });
  }
  </script>

  <style scoped>
  .vimeo-dimension{
    width: 100%;
    height: 100%;
  }
</style>