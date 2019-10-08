<template>
    <v-app>
    <Header :head="false"/>
    <Calnd />
    </v-app>
</template>

<script>
import Header from './../components/header'
import Calnd from './../components/cal'

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