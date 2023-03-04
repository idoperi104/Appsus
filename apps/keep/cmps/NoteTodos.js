export default {
    props: ['note'],
    template: `
        <article :style="styleObject" class="todos-preview">
            <h2>{{note.info.title}}</h2>
            <div v-for="(todo, idx) in note.info.todos" key="todo" class="todo-task">
                <span @click="toggleMark(todo)" :style="getTodoStyle(todo)">{{todo.todo}}</span>
                <button class="btn-remove-todo" @click.prevent="remove(idx)">x</button>
            </div>
        </article>
    `,
    computed: {
        styleObject() {
            return this.note.style
        },
    },
    methods:{
        remove(idx){
            this.note.info.todos.splice(idx, 1)
            this.$emit('save', this.note)
        },
        getTodoStyle(todo){
            return todo.isMarked
            ? {textDecoration: 'line-through'} : {textDecoration: 'none'}
        },
        toggleMark(todo){
            todo.isMarked = !todo.isMarked
            this.$emit('save', this.note)
        }
        
    },
    watch: { 
            
        note: {
            handler() {
                console.log('www');
                if (this.note.info.todos.length === 0) this.$emit('remove', this.note.id)
            },
            deep: true
          }
    }
}