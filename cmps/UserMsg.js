import { eventBus } from '../services/event-bus.service.js'

// export default {
// 	template: `
//         <section :class="msg.type" v-if="msg.txt" class="user-msg">
//             {{ msg.txt }}
//         </section>
//     `,
// 	data() {
// 		return {
// 			msg: { txt: '', type: 'success' },
// 		}
// 	},
// 	created() {
// 		eventBus.on('show-msg', this.showMsg)
// 	},
// 	methods: {
// 		showMsg(msg) {
// 			this.msg = msg
// 			setTimeout(() => (this.msg.txt = ''), this.msg.timeout || 1500)
// 		},
// 	},
// }


export default {
    template: `
        <div class="user-msg" :class="[msg.type, isShown ? 'show' : '']" v-if="msg">
			<p>
				{{msg.txt}}
            </p>
			<button @click="msg=null">x</button>
        </div>
    `,
    data() {
        return {
            msg: null,
            isShown: false
        }
    },
    created() {
        this.unsubscribe = eventBus.on('show-msg', (msg) => {
            console.log('Msg:', msg)
            this.msg = msg
            setTimeout(this.setClass , 300)
            setTimeout(this.setClass , 2100)
            setTimeout(() => {
                this.msg = null
            }, 3000)
        })
    },
    methods: {
        setClass() {
            this.isShown = !this.isShown
        },
    },
}