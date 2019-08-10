<template>
  <b-dropdown :no-caret="!isSubMenu" :dropright="isSubMenu" size="sm" :class="classes" :text="menu.label">
    <div v-for="( menuEntry, key ) in menu.submenu.items" :key="key">
      <div v-if="menuEntry.type === 'separator'" class="dropdown-divider"></div>
      <MenuDropDown :SubMenu="true" v-on:MenuAction="callMenuAction" v-else-if="menuEntry.type === 'submenu'" :menu="menuEntry"></MenuDropDown>
      <b-dropdown-item v-else @click=" menuEntry.role ? callMenuAction(menuEntry.role) : menuEntry.click()">
        {{ menuEntry.label }}
      </b-dropdown-item>
    </div>
  </b-dropdown>
</template>

<script>

  export default {
    name: "MenuDropDown",
    props: ['menu', 'SubMenu'],
    computed: {
      isSubMenu: function() {
        return this.SubMenu ? true : false
      },
      classes: function() {
        return this.isSubMenu ? 'dropdown-item sub-menu' : 'top-menu'
      }
    },
    methods: {
      callMenuAction: function(Action) {
        console.log('Dropdown Action Call', Action)
        this.$emit('MenuAction', Action)
      },
      log:(data) => {
        console.log(data);
      }
    }
  }
</script>

<style>

.sub-menu:hover > ul.dropdown-menu {
  display: block;
} 	

.sub-menu > ul.dropdown-menu:hover {
  display: block;
}

.sub-menu > ul.dropdown-menu {
  left: calc(100% - 2px);
  top: calc(-0.5rem - 1px)
}

.top-menu {
  color: #fff;
  padding: 0.5rem;
}

.dropdown > button, 
.dropdown > button:hover,
.dropdown > button:active,
.dropdown > button:focus,
.dropdown.show > button {
  border: none;
  background: transparent!important;
  color: inherit;
  text-align: left;
  padding: 0;
  font: inherit;
  box-shadow: none!important;
}

.dropdown > button::after {
  position: absolute;
  top: calc(50% - .3rem);
  right: 0;
}
</style>
