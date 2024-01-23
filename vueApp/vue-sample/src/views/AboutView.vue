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
    <Sudoku />
  </div>
  <button @click="check">CHECK</button>
  <p>TODO:</p>
  <li>最初の盤面で穴じゃないボタンをDisabledにする</li>
  <li>成否判定ボタン+機能 OK</li>
  <li>難易度選択</li>
  <li>リスタートボタン</li>
  <li>Homeページを消す</li>
</template>

<script lang="ts">
  import { defineComponent, ref } from "vue";
  import Sudoku from "@/components/Sudoku.vue";
  import { correctFieldStore } from "@/store/CorrectFieldStore";
  import { fieldStore } from "@/store/FieldStore";

  export default defineComponent({
    name: "AboutView",
    components: {
      Sudoku,
    },
    setup() {
      let completeFlag = ref(false);
      const correct = correctFieldStore();
      const now = fieldStore();
      const check = () => {
        if (JSON.stringify(correct.getField) === JSON.stringify(now.getField)) {
          console.log("CORRECT!!");
          completeFlag.value = true;
        } else {
          console.log("NOT CORRECT...");
          completeFlag.value = false;
        }
      };
      return {
        completeFlag,
        correct,
        now,
        check,
      };
    },
  });
</script>
