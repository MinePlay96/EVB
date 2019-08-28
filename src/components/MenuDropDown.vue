<template>
  <b-nav-item-dropdown v-if="nav" :no-caret="!SubMenu" :dropright="SubMenu" size="sm" :class="classes" :text="menu.label">
    <div v-for="( menuEntry, key ) in menu.submenu.items" :key="key">
      <div v-if="menuEntry.type === 'separator'" class="dropdown-divider"></div>
      <MenuDropDown SubMenu v-on:MenuAction="callMenuAction" v-else-if="menuEntry.type === 'submenu'" :menu="menuEntry"></MenuDropDown>
      <b-dropdown-item v-else @click=" menuEntry.role ? callMenuAction(menuEntry.role) : menuEntry.click()">
        {{ menuEntry.label }}
      </b-dropdown-item>
    </div>
  </b-nav-item-dropdown>
  <b-dropdown v-else :no-caret="!SubMenu" :dropright="SubMenu" size="sm" :class="classes" :text="menu.label">
    <div v-for="( menuEntry, key ) in menu.submenu.items" :key="key">
      <div v-if="menuEntry.type === 'separator'" class="dropdown-divider"></div>
      <MenuDropDown SubMenu v-on:MenuAction="callMenuAction" v-else-if="menuEntry.type === 'submenu'" :menu="menuEntry"></MenuDropDown>
      <b-dropdown-item v-else @click=" menuEntry.role ? callMenuAction(menuEntry.role) : menuEntry.click()">
        {{ menuEntry.label }}
      </b-dropdown-item>
    </div>
  </b-dropdown>
</template>

<script>

  export default {
    name: "MenuDropDown",
    props: {
      menu: Object,
      SubMenu: Boolean,
      nav: Boolean
      },
    computed: {
      classes: function() {
        return this.SubMenu ? 'dropdown-item sub-menu' : 'top-menu'
      },
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

<style scoped>

</style>
