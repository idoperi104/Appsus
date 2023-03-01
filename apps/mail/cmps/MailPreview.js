export default {
    props: ['mail'],
    template: `
        <article :class="mail.isRead ? 'isRead': ''" class="mail-preview">
            <h2 :data-title="mail.subject">{{ subjectCut }}</h2>
            <h3>{{ bodyCut }}</h3>
            <h3>{{ daysAgo }}</h3>
        </article>
    `,
    computed: {
        subjectCut() {
            if (this.mail.subject.length < 17) return this.mail.subject
            return this.mail.subject.slice(0, 17) + '...';
        },
        bodyCut() {
            if (this.mail.body.length < 70) return this.mail.body
            return this.mail.body.slice(0, 70) + '...';
        },
        
        daysAgo() {
            const date = new Date(this.mail.sentAt)
            const today = new Date()

            const diffTime = today.getTime() - date.getTime()
            const diffDays = Math.floor(diffTime / (1000 * 3600 * 24))
            if (diffDays === 0) return  date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0')
            if (diffDays === 1) return 'yesterday'
            if (diffDays > 5) return date.toLocaleDateString()
            return `${diffDays} days ago`
        }

    }
}