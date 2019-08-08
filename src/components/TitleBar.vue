<template>
    <div>
        <b-navbar type="dark" variant="dark">
            <b-navbar-brand small>{{ title }}</b-navbar-brand>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">

                <b-nav-item @click="windowAction('minimize')">
                    <svg name="TitleBarMinimize" aria-hidden="false" width="12" height="12" viewBox="0 0 12 12">
                        <rect fill="#ffffff" width="10" height="1" x="1" y="6"></rect>
                    </svg>
                </b-nav-item>
                <b-nav-item @click="windowAction('toggleMaximize')">
                    <svg name="TitleBarMaximize" aria-hidden="false" width="12" height="12" viewBox="0 0 12 12">
                        <rect width="9" height="9" x="1.5" y="1.5" fill="none" stroke="#ffffff"></rect>
                    </svg>
                </b-nav-item>
                <b-nav-item @click="windowAction('close')">
                    <svg name="TitleBarClose" aria-hidden="false" width="12" height="12" viewBox="0 0 12 12">
                        <polygon fill="#ffffff" fill-rule="evenodd"
                                 points="11 1.576 6.583 6 11 10.424 10.424 11 6 6.583 1.576 11 1 10.424 5.417 6 1 1.576 1.576 1 6 5.417 10.424 1"></polygon>
                    </svg>
                </b-nav-item>
            </b-navbar-nav>
        </b-navbar>
    </div>
</template>

<script>
    const {remote} = require('electron');
    const BrowserWindow = remote.getCurrentWindow();
    export default {
        name: "TitleBar",
        props: ['title'],
        methods: {
            windowAction(method) {
                switch (method) {
                    case 'toggleMaximize':
                        if (BrowserWindow.isMaximized()) {
                            BrowserWindow.unmaximize()
                        } else {
                            BrowserWindow.maximize()
                        }
                        break;

                    default:
                        if (typeof BrowserWindow[method] === 'function') {
                            BrowserWindow[method]()
                        }
                        break;
                }
            }
        }
    }
</script>

<style scoped>
    .navbar {
        -webkit-app-region: drag;
    }

    .navbar-nav {
        -webkit-app-region: no-drag;
    }

    .nav-item a {
        -webkit-user-drag: none;
        user-select: none;
    }

    .nav-item:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }

</style>