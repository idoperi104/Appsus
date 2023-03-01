import { MailService } from '../services/mail.service.js'

export default {
    template: `
        <section v-if="mail" class="mail-compose">
            <form>
                <input type="text" v-model="mail.subject" placeholder="address" />
            </form>
            {{mail}}
        </section>
    `,
    data() {
        return {
            mail: null
        }
    },
    created() {
        MailService.getEmptyMail()
            .then(mail => this.mail = mail)
    },
    methods: {

    },
    components: {
        MailService,
    }
}