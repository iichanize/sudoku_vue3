<template>
  <div class="about">
    <h1>Sudoku</h1>
  </div>
  <div>
    <p v-if="completeFlag">Complete!</p>
  </div>
  <div
    class="container mx-auto"
    id="id_container"
    style="text-align: center; width: 95%; height: 70%; margin: 0 auto"
  >
    <Sudoku :key="renderKey" />
  </div>
  <div class="fieldFooter">
    <button @click="check" class="checkButton">CHECK</button>
    <LevelSwitch />
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, watch } from "vue";
  import Sudoku from "@/components/Sudoku.vue";
  import LevelSwitch from "@/components/LevelSwitch.vue";
  import { correctFieldStore } from "@/store/CorrectFieldStore";
  import { fieldStore } from "@/store/FieldStore";
  import { ResetStore } from "@/store/LevelStore";

  export default defineComponent({
    name: "AboutView",
    components: {
      Sudoku,
      LevelSwitch,
    },
    setup() {
      let completeFlag = ref(false);
      const correct = correctFieldStore();
      const now = fieldStore();
      const resetStore = ResetStore();
      const renderKey = ref(0);
      const check = () => {
        if (JSON.stringify(correct.getField) === JSON.stringify(now.getField)) {
          console.log("CORRECT!!");
          completeFlag.value = true;
        } else {
          console.log("NOT CORRECT...");
          completeFlag.value = false;
        }
      };
      resetStore.$subscribe((mutation, state) => {
        console.log(mutation.events, state);
        renderKey.value += 1;
      });
      return {
        completeFlag,
        correct,
        now,
        check,
        gameLevel: "",
        renderKey,
      };
    },
  });
</script>

<style>
  .fieldFooter {
    margin: 10px;
    display: flex;
    justify-content: center;
  }
  .checkButton {
    margin: 10px 20px;
  }
</style>
