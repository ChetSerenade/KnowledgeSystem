

<template>
  <ul class="pagination">
      <!-- 在vue组件中只写v-for会提示错误 需要添加一个唯一标识key -->
    <li v-for="p in pages" :key='p'>
      <a href>
          {{p}}
      </a>
    </li>
  </ul>
</template>


<script>
export default {
  props:['pages'],
    data:function(){
        return{
            // pages:5
        }
    }
}
</script>