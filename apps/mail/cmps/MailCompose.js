import { mailService } from '../services/mail.service.js'

export default {
    template: `
        <section v-if="mail" class="mail-compose">
            <form  @submit.prevent="sand">
                <header class="compose-header"> 
                    <h2>New Massage</h2>
                    <button class="btn-close" @click="close">X</button>
                </header>
               
             <input required type="text" v-model="mail.to" placeholder="To: (Email address)" />
              <input required type="text" v-model="mail.subject" placeholder="Subject" />
              <textarea required v-model="mail.body" cols="50" rows="18"></textarea>
              <button class="btn-sand">Send</button>
            </form>
        </section>
    `,
    data() {
        return {
            mail: null
        }
    },
    created() {
        this.mail = mailService.getEmptyMail()

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
        mailService,
    }
}