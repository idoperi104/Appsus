import { MailService } from "../services/mail.service.js"

export default {
    template: `
        <section v-if="currMail" class="mail-details">
            <h1>{{currMail.subject}}</h1>
            <h4>from: {{currMail.from}}</h4>
            <h4>received at: {{receivedAt}}</h4>
            <p>{{currMail.body}}</p>
            <RouterLink :to="'/mail'">back to list</RouterLink> 
          
        </section>
    `,
    data() {
        return {
            currMail: null
        }
    },
    created() {
        this.getMail()
    },
    methods: {
        getMail() {
            MailService.get(this.mailId)
                .then(mail => this.currMail = mail)
        }
    },
    computed: {
        mailId() {
            return this.$route.params.mailId
        },
        receivedAt(){
            return  new Date(this.currMail.sentAt).toLocaleDateString()
        }
    },
    watch: {
        mailId() {
            this.getMail()
        }
    }
}