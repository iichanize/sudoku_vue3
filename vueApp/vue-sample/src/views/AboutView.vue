<template>
  <div class="about">
    <h1>Sudoku</h1>
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
    <div class="result">
      <span>判定結果</span>
      <img
        class="resultImg"
        v-if="completeFlag === 1"
        src="@/assets/circle.png"
      />
      <img
        class="resultImg"
        v-else-if="completeFlag === 2"
        src="@/assets/cross.png"
      />
      <div v-else class="resultImg"></div>
    </div>
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
      let completeFlag = ref(0);
      const correct = correctFieldStore();
      const now = fieldStore();
      const resetStore = ResetStore();
      const renderKey = ref(0);
      const check = () => {
        if (JSON.stringify(correct.getField) === JSON.stringify(now.getField)) {
          console.log("CORRECT!!");
          completeFlag.value = 1;
        } else {
          console.log("NOT CORRECT...");
          completeFlag.value = 2;
        }
      };
      resetStore.$subscribe((mutation, state) => {
        console.log(mutation.events, state);
        renderKey.value = state.value;
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
  .result {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-right: 20px;
  }
  .resultImg {
    width: 100px;
    height: 100px;
  }
</style>
