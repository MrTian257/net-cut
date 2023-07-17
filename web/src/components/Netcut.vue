<template>
		<div class="net-cut">
				<div class="net-cut__header">
						<div class="menu">文本</div>
						<div class="menu">文件</div>
						<div class="menu">设置</div>
				</div>

				<div class="net-cut__content">
						<div class="text-sync-content">
								<textarea
										v-model="textarea"
										@input="handleInput"
										@change="handleChange"
										@focus="handleFocus"
										@focusin="handleFocusin"
										@blur="handleBlur"
										@focusout="handleFocusout"
										@mousedown="handleMouseDown"
										:readonly="readonly"
										placeholder="这里输入的内容会同步给其他终端"
								>
								</textarea>
						</div>
						<div class="more-sync">
								<div class="title">文件同步</div>
								<div class="file-sync-content">
										<div class="file-sync-scroll scroll">
												<div class="file-item" v-for="item in 30" :key="item">文件同步{{ item }}</div>
										</div>
								</div>
								<div class="title">同步消息</div>
								<div class="note-list">
										<div ref="note-list-scroll" class="note-list-scroll scroll">
												<div class="note-item" v-for="(item) in noteList" :key="item.timestamp">
														<!-- <div class="note-time"></div> -->
														<div>
																{{ formatDate(item.timestamp) }} &lt;=: {{ item.message }}
														</div>
												</div>
										</div>

								</div>
						</div>
				</div>
		</div>
</template>

<script setup>
import {onMounted, reactive, ref, watch, inject, computed} from "vue";

/**
	*
	* @type {SocketService}
	*/
const socket = inject('$socket')

const textarea = ref("")

const state = reactive({
		serverState: {
				input: '',
				text: '',
		},
})

const noteList = ref([])

const readonly = computed(()=> {
		console.log('readonly[input]:', state.serverState.input)
		console.log('readonly[id]:', socket.socket.id)
		console.log('readonly:', (state.serverState.input !== '' ? (state.serverState.input !== socket.socket.id) : false))

		return state.serverState.input !== '' ? (state.serverState.input !== socket.socket.id) : false
})

// 关注来自服务器的更新
watch(() => state.serverState.text, (val) => {
		textarea.value = val
})

onMounted(() => {
		// Join netcut group
		socket.joinNetcutGroup()
		socket.onTextSync(({data, message, timestamp}) => {
				state.serverState = data
				noteList.value.push({
						message,
						timestamp,
				})

				if(noteList.value.length > 500) {
						noteList.value = noteList.value.slice(-500)
				}

				document.querySelector('.note-list-scroll').scrollTo({behavior: "smooth", top: document.querySelector('.note-list-scroll').scrollHeight})
		})
})

const formatDate = (timestamp)=> {
		const date = new Date(timestamp)
		return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
}

const handleFocus = (e) => {
		socket.emitFocusInput()
}

const handleMouseDown = (e) => {
		console.log('handleMouseDown')
		if (readonly.value) {
				// 有其他人在输入的时候禁用本地的输入
				e.preventDefault()
		}
}

const handleBlur = (e) => {
		socket.emitBlurInput()
}

const handleInput = ({data, target: {value}}) => {
		socket.emitTextSync(value)
}

const handleChange = ({target: { value }}) => {
		socket.emitTextSync(value)
}

</script>

<style scoped lang="less">
.net-cut {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		padding: 10px;

		&__header {
				display: flex;
				align-items: center;
				justify-content: center;
				gap: 10px;
				padding: 10px 0;
				border-bottom: 1px dotted;

				.menu {
						cursor: pointer;
				}
		}

		&__content {
				flex: 1;
				display: flex;
				width: 80%;
				margin: 10px auto 0;
				background-color: #eee;

				.text-sync-content {
						flex: 1;
						padding: 10px;

						textarea {
								min-width: 100%;
								min-height: 100%;
								border: unset;
								padding: 10px;
								box-sizing: border-box;
								outline: 1px double;
								border-radius: 2px;

								&[readonly] {
										color: darkred;
								}
						}
				}

				.more-sync {
						width: 30%;
						height: 100%;
						border-left: 1px dotted;
						display: flex;
						flex-direction: column;
						padding: 10px;
						position: relative;
						box-sizing: border-box;

						.title {
								margin: 10px 0;
								padding: 5px 10px;
								background-color: #ddd;
						}


						.file-sync-content {
								width: 100%;
								flex: 1;
								overflow: hidden;
								position: relative;

								.file-sync-scroll {
										position: absolute;
										width: 100%;
										height: 100%;
										overflow-x: hidden;
										overflow-y: auto;
								}

						}

						.note-list {
								width: 100%;
								height: 25%;
								overflow: hidden;
								position: relative;

								.note-list-scroll {
										position: absolute;
										width: 100%;
										height: 100%;
										overflow-x: hidden;
										overflow-y: auto;


								}
						}
				}
		}
}

.scroll {
		&::-webkit-scrollbar {
				width: 2px;
				height: 2px;
				background-color: #ccc;

				&-thumb {
						width: 2px;
						height: 2px;
						background-color: #fff;
				}
		}
}
</style>
