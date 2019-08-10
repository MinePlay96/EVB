<template>
  <ApplicationMenu :menu="menu"></ApplicationMenu>
</template>

<script>
  
  import MenuDropDown from './MenuDropDown'
  import MenuDropDownCustom from './MenuDropDownCustom'
  import ApplicationMenu from './ApplicationMenu'

  export default {
    name: "MenuFromMenuObject",
    props: ['menu'],
    components: {
      MenuDropDown,
      MenuDropDownCustom,
      ApplicationMenu 
    },
    methods: {
        callMenuAction: function(Action) {
        console.log('FromMenuObject Action Call', Action)
        this.$emit('MenuAction', Action)
      },
    }
  }
</script> 

<style scoped>
  
</style>
