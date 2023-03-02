import MailPreview from './MailPreview.js'

export default {
    props: ['mails'],
    template: `
        <section class="mail-list">
            <ul class="clean-list">
                <li  v-for="mail in mails" :key="mail.id">
                    <RouterLink :to="{name:'MailDetails', params:{mailId:mail.id}}">
                        <MailPreview :mail="mail"/>
                    </RouterLink> 
                    <button class="mail-btn-remove fa-regular fa-trash-can" :data-title="!!mail.removedAt ? 'Delete for good' : 'Move To trash'" @click="remove(mail.id)"></button>
                    <button class="mail-btn-unRead fa-solid fa-eye" data-title="Un Read" @click="unRead(mail)"></button>
                </li>
            </ul>
        </section>
    `,
    methods: {
        remove(mailId) {
            this.$emit('remove', mailId)
        },
        unRead(mail) {
            this.$emit('unRead', mail)
        },

    },
    computed: {

    },
    components: {
        MailPreview,
    }
}