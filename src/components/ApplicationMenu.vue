<template>
    <div class="applicationMenu">
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