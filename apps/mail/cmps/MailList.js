import MailPreview from './MailPreview.js'

export default {
    props: ['mails'],
    template: `
        <section class="mail-list">
            <ul class="clean-list">
                <li v-for="mail in mails" :key="mail.id">
                    <RouterLink :to="{name:'MailDetails', params:{mailId:mail.id}}">
                        <MailPreview :mail="mail"/>
                    </RouterLink> 
                    <button class="mail-btn-remove" @click="remove(mail.id)">x</button>
                </li>
            </ul>
        </section>
    `,
    methods: {
        remove(mailId) {
            this.$emit('remove', mailId)
        }

    },
    components: {
        MailPreview,
    }
}