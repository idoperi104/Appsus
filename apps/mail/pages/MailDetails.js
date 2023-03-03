import { mailService } from "../services/mail.service.js"
import { eventBus } from "../../../services/event-bus.service.js"

export default {
    template: `
        <section v-if="currMail" class="mail-details">
            <RouterLink class="back-to-mail fa-solid fa-arrow-left" data-title="back to mail" :to="'/mail'"></RouterLink> 
                <h1>{{currMail.subject}}</h1>
            <article>
                <h4>from: {{currMail.from}}</h4>

                <button class="currMail-btn-remove fa-regular fa-trash-can" :data-title="!!currMail.removedAt ? 'Delete for good' : 'Move To trash'" @click="remove"></button>
                <h4>received at: {{receivedAt}}</h4> 
            </article>
            <main >
                <p>{{currMail.body}}</p>
            </main>
          
        </section>
    `,
    data() {
        return {
            currMail: null
        }
    },
    created() {
        this.getMail()
            .then(this.setRead)

    },
    methods: {
        getMail() {
            return mailService.get(this.mailId)
                .then(mail => this.currMail = mail)
        },
        setRead() {
            eventBus.emit('setToRead', this.currMail.id)
        },
        remove(){
            eventBus.emit('removeMail', this.currMail.id)
            this.$router.push('/mail')
        }
    },
    computed: {
        mailId() {
            return this.$route.params.mailId
        },
        receivedAt() {
            return new Date(this.currMail.sentAt).toLocaleDateString()
        }
    },
    watch: {
        mailId() {
            this.getMail()
        }
    },

}