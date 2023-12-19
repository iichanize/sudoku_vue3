<template>
  <table id="table">
    <tr v-for="(lines, index1) in field" v-bind:key="index1">
      <td v-for="(num, index2) in lines" v-bind:key="index2">
        <button id="eachButton" name="box" @click="countUp(index1, index2)">
          {{ num }}
        </button>
      </td>
    </tr>
  </table>
</template>
<script lang="ts">
  import { defineComponent, ref } from "vue";

  export default defineComponent({
    name: "HelloWorld",
    props: {
      msg: String,
    },
    setup(props, ctx) {
      let field = ref([
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
      ]);
      const countUp = (index1: number, index2: number) => {
        console.log("push");
        let num = field.value[index1][index2] + 1;
        field.value[index1][index2] = num > 9 ? num % 10 : num;
        return;
      };
      return {
        countUp,
        field,
      };
    },
  });
</script>
<style>
  #table {
    margin: 0 auto;
    border-collapse: collapse;
    border: 3px solid #ccc;
  }

  #table td {
    border: 1px solid #ccc;
    height: 40px;
    width: 40px;
    text-align: center;
    vertical-align: middle;
  }

  #eachButton {
    border: none;
    height: 40px;
    width: 40px;
    font-size: 32px;
    background-color: white;
    cursor: pointer;
  }
  #eachButton:hover {
    background-color: #ccc;
  }
  #eachButton:active {
    background-color: #aaa;
  }
</style>
