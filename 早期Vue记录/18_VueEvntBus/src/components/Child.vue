<template>
  <div>
    <h5>这是child组件</h5>
    <div>
      <h6>count == {{count}}</h6>
    </div>
    <button @click.prevent="inc">+</button>
    <button @click.prevent="dec">-</button>
  </div>
</template>

<script>
export default {
  name: "child",
  props: ["count"],
  data: function () {
    return {
      newcount: this.count,
    };
  },
  methods: {
    inc: function () {
      this.newcount += 1;
      this.$emit("changedata", this.newcount);
    },
    dec: function () {
      this.newcount -= 1;
      this.$emit("changedata", this.newcount);
    },
  },
};
</script>

