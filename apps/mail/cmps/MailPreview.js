export default {
    props: ['mail'],
    template: `
        <article :class="mail.isRead ? 'isRead': ''" class="mail-preview">
            <h2>{{ mail.subject }}</h2>
            <!-- <h3>{{ mail.body }}</h3> -->
        </article>
    `,
}