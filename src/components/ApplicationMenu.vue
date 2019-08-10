<template>
    <div class="applicationMenu">
        <MenuDropDown
        v-for="( menu, key ) in applicationMenu.items" 
        :key="key" 
        :menu="menu"
        v-on:MenuAction="callMenuAction">
        </MenuDropDown>
    </div>
</template>

<script>

    import MenuDropDown from './MenuDropDown'

    export default {
        name: "ApplicationMenu",
        props: ['applicationMenu'],
        components: {
            MenuDropDown
        },
        methods: {
            callMenuAction: function(Action) {
                this.$emit('MenuAction', Action)
            }
        }
    }
</script>


<style scoped>
    .applicationMenu {
        background-color: gray;
    }
</style>