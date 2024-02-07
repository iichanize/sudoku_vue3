<template>
  <div class="levelSelect">
    <span>難易度選択</span>
    <br />
    <input
      type="radio"
      id="level1"
      value="EASY"
      name="level"
      v-model="gameLevel"
    />
    <label for="level1">EASY</label>
    <br />
    <input
      type="radio"
      id="level2"
      value="NORMAL"
      name="level"
      v-model="gameLevel"
    />
    <label for="level2">NORMAL</label>
    <br />
    <input
      type="radio"
      id="level3"
      value="HARD"
      name="level"
      v-model="gameLevel"
    />
    <label for="level3">HARD</label>
    <br />
    <button @click="restart">RESTART</button>
  </div>
</template>

<script setup lang="ts">
  import { LevelStore, ResetStore } from "@/store/LevelStore";
  import { ref, watch } from "vue";

  const levelStore = LevelStore();
  const resetStore = ResetStore();
  const gameLevel = ref("NORMAL");
  const restart = () => {
    resetStore.update();
  };
  watch(gameLevel, () => {
    levelStore.update(gameLevel.value);
  });
</script>

<style>
  .levelSelect {
    text-align-last: start;
  }
</style>
