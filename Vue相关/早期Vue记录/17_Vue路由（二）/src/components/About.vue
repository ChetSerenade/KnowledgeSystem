<template>
    <div>
        关于我们
        <h6>
           我接收到的query参数id=={{$route.query.id}}
        </h6>
        <a href="" @click.prevent.stop="$router.go(-1)">返回上一页</a>
    </div>
</template>

<script>
export default {
    name:'About'
}
</script>