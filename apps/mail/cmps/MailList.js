import MailPreview from './MailPreview.js'

export default {
    props: ['mails'],
    template: `
        <section class="mail-list">
            <ul class="clean-list">
                <li v-for="mail in mails" :key="mail.id">
                    <MailPreview :mail="mail"/>
                    <RouterLink :to="{name:'MailDetails', params:{mailId:mail.id}}">details</RouterLink> 
                   <!-- <pre>{{mail}}</pre>  -->
                    <!-- <button @click="remove(car.id)">x</button> -->
                </li>
            </ul>
        </section>
    `,
    methods: {
        // remove(carId) {
        //     this.$emit('remove', carId)
        // },
        // showDetails(carId){
        //     this.$emit('show-details', carId)
        // },
    },
    components: {
        MailPreview,
    }
}