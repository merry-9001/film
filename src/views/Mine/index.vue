<template>
    <div id="main">
        <Header title="我的"></Header>
        <div id="content">
            <router-view></router-view>
        </div>
        <TabBar></TabBar>
    </div>
    
</template>

<script>
import  Header from '@/components/Header';
import  Login from '@/components/Login';
import  TabBar from '@/components/TabBar';
export default {
    components:{
        Header,
        TabBar,
        Login
    },
    name:'mine'
}
</script>
<style scoped>

</style>