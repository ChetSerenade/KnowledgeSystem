<template>
  <ul>
    <li>FOO</li>
    <li>foo-1</li>
    <li>foo-2</li>
  </ul>
</template>

<script>
export default {
  name: "Foo",
  mounted: function () {
    console.log("foo 生命周期调用");
  },
};
</script>