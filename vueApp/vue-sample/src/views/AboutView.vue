<template>
  <div class="about">
    <h1>Sudoku</h1>
  </div>
  <div
    class="container mx-auto"
    id="id_container"
    style="text-align: center; width: 95%; height: 70%; margin: 0 auto"
  >
    <Sudoku />
  </div>
  <p>TODO:</p>
  <li>最初の盤面で穴じゃないボタンをDisabledにする</li>
  <li>成否判定ボタン+機能</li>
  <li>難易度選択</li>
  <li>リスタートボタン</li>
  <li>Homeページを消す</li>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import Sudoku from "@/components/Sudoku.vue";

  export default defineComponent({
    name: "AboutView",
    components: {
      Sudoku,
    },
  });
</script>
