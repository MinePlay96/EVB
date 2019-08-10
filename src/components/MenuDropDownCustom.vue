<template>
  <div class="dropdown" @mouseover="mouseover">
    <button 
    class="btn btn-primary dropdown-toggle" 
    type="button" 
    id="dropdownMenuButton" 
    data-toggle="dropdown" 
    aria-haspopup="true" 
    aria-expanded="false"
    @click="ToggleMenu">
      Dropdown button
    </button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <a class="dropdown-item" href="#">Action</a>
      <a class="dropdown-item" href="#">Another action</a>
      <a class="dropdown-item" href="#">Something else here</a>
    </div>
  </div>
</template>

<script>

  export default {
    name: "MenuDropDownCustom",
    props: ['menu', 'mouseover'],
    methods: {
      ToggleMenu: function(event) {
        this.$emit('ToggleMenu', event)
      },

      log:(data) => {
        console.log(data);
      }
    }
  }
</script>

<style>
  .isExpandet > .dropdown:hover > .dropdown-menu,
  .isExpandet > .dropdown > .dropdown-menu:hover {
    display: block;
    margin: 0;
    
  } 
</style>
