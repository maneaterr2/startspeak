<template>
	<div>
		<div class="custom-input-wrap">
			<label :for="name">
				{{ label }}
			</label>
			<input
				:value="modelValue"
				:type="type"
				:placeholder="placeholder"
				:maxlength="maxlength"
				:required="required"
				:disabled="disabled"
				:name="name"
				:id="name"
				@input="$emit('update:model-value', $event.target.value)"
				@change="$emit('update:model-value', $event.target.value)"
				@focus="$emit('focus', $event)"
			>
			<div v-if="maxlength !== ''" class="counter" :class="[(lenghtDiff == 0) ? 'red-counter' : '']">
				{{ lenghtDiff }}
			</div>
		</div>
	</div>
	
</template>

<script>
export default {
    name: 'form_input',
	props: {
		name: {
			type: String,
			default: ''
		},
		type: {
			type: String,
			default: 'text'
		},
        modelValue: {
            type: [String, Number],
			default: ''
        },
		maxlength: {
			type: [String, Number],
			default: ''
		},
		label: {
			type: String,
			default: ''
		},
		placeholder: {
			type: String,
			default: ''
		},
		required: {
			type: Boolean,
			default: false
		},
		disabled: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		lenghtDiff () {
            if (this.maxlength !== '') {
                return this.maxlength - this.modelValue.length
            } else {
                return ''
            }
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../../css/variables.scss';
.custom-input-wrap{
    position: relative;
	text-align: left;
	label{
		color: $blue-color;
	}
    input{
        border: 1px solid $gray-color;
        display: block;
		border-radius: 6px;
		background-color: #151515;
		color: #7B7B7B;
        padding: 10px 20px;
        width: calc(100% - 42px);
        height: 16px;
		&:focus, &:active, &:focus-visible{
			border: 1px solid $blue-color;
			outline: none;
		}
    }
    .counter{
        position: absolute;
        bottom: 2px;
        right: 5px;
        color: $gray-color;
        font-size: 10px;
    }
	.red-counter{
		color: $red-color;
	}
}

</style>