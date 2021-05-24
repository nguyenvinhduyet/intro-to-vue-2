<template>
    <div>
        <h1>Events Listing</h1>
        <router-link :to="{ name: 'event-show', params: { id: '1' } }">Show Event #1</router-link>
        <EventCard v-for="event in events" :key="event.id" :event="event"/>
        <BaseIcon/>
    </div>
</template>



<script>
import EventCard from '@/components/EventCard.vue';
import EventService from '@/services/EventService.js'
export default {
    components: {
        EventCard
    },
    data() {
        return {
            events: []
        }
    },
    created() {
        EventService.getEvents()
            .then(response => {
                this.events = response.data
            })
            .catch(error => {
                console.log('there was an error: ' + error.response)
            })
    },
    
}
</script>
