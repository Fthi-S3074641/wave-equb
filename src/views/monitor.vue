<template>
    <v-app>
    <Header :head="false"/>
    <Calnd />
    </v-app>
</template>

<script>
import Header from './../components/header'
import Calnd from './../components/monitor'

export default {
    data() {
        return {

        }
    },
    components: {
        Header,
        Calnd
    }
}
</script>