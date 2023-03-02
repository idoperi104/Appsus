import { MailService } from '../services/mail.service.js'

export default {
    template: `
        <section v-if="mail" class="mail-compose">
            <form  @submit.prevent="sand">
                <header class="compose-header"> 
                    <h2>New Massage</h2>
                    <button class="btn-close" @click="close">X</button>
                </header>
               
             <input required type="text" v-model="mail.to" placeholder="to: (Email address)" />
              <input required type="text" v-model="mail.subject" placeholder="subject" />
              <textarea required v-model="mail.body" cols="50" rows="18"></textarea>
              <button class="btn-sand">Sand</button>
            </form>
        </section>
    `,
    data() {
        return {
            mail: null
        }
    },
    created() {
        this.mail = MailService.getEmptyMail()

    },
    methods: {
        sand() {
            this.mail.sentAt = Date.now()
            this.$emit('sand', this.mail)
        },
        close(){
            this.$emit('close')
        }
    },
    components: {
        MailService,
    }
}