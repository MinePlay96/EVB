<template>
    <div id="nav">
        <span v-for="(item, key) in this.$router.options.routes" :key="key">
            <router-link :to="item.path">{{item.name}}</router-link>
            <span v-if="key !== items.length - 1" > | </span>
        </span>
    </div>
</template>

<script>
    export default {
        name: "MainMenu",
        created() {
            this.$router.options.routes.forEach(route => {
                this.items.push({
                    name: route.name
                    , path: route.path
                })
            })
        }
        , data() {
            return {
                items: []
            }
        }
    }
</script>

<style scoped>

</style>