<template>
		<div class="action__wrapper" :style="styles.wrapper">
			<div class="action__info" :style="styles.info" @click="start">
				<p class="action__env" :style="styles.env">{{ env || '---' }}</p>
				<h4 class="action__action">{{ action || '---' }}</h4>
				<p v-if="footer" class="action__footer">{{ footer }}</p>
			</div>
			<button class="action__stop" v-if="active" @click="stop">Stop</button>
		</div>
</template>


<script>
export default {
	name: 'project-action',
	props: [
		'env',
		'action',
		'footer',
	],
	components: {},
	data () {
		return {
			colors: {
				prod: 'lightgreen',
				dev: 'orange'
			},
			active: false 
			
		}
	},
	methods: {
		start () {
			if (this.active) return
			this.active = true
		},
		stop () {
			console.log('stop!!!')
			this.active = false
		}
	},
	computed: {
		styles () {
			return {
				env: {
					color: this.colors[this.env]
				},
				wrapper: {
					background: this.active ? 'rgba(0,0,0, 0.05)' : 'rgba(255,255,255, 0.05)',
				},
				info: {
					cursor: this.active ? 'default' : 'copy',
					gridRow: `1 / ${this.active ? 2 : -1}`
				}
			}
		}
	},
}


</script>


<style scoped lang="sass">
@import ../../styleguide/index


.action
	&__wrapper
		display: grid
		grid-template-rows: 100px 50px
		grid-row-gap: 10px
		border: solid 1px rgba(white, 0.1)
		border-radius: 4px
		padding: 10px
	&__info
		padding-bottom: 100px
		border: solid 1px gold
	&__env
		text-transform: uppercase
		margin-bottom: 10px
		font-weight: 600
	&__action
		paddding-bottom: 80px
	&__stop
		background: rgba(darkred, 0.6)
		width: 100%
		text-align: left
		margin: 0



</style>
