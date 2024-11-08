<template>
	<div class="custom-radio-wrap">
        <input
            type="radio"
            :id="randomId"
			:checked="isChecked"
			:value="value"
			@change="$emit('update:modelValue', $event.target.value)"
        >
        <label class="custom-radio-label" :for="randomId">
            <div class="rectangle" :class="[isChecked?'active':'']" />
            <div>
                {{ label }}
            </div>
        </label>
    </div>
</template>

<script>
export default {
	name: "form_radio",
	props: {
		label: { 
			type: String,
			default: "",
			required:true
		},
		modelValue: { 
			default: ''
		},
		value: {
			type: String,
			default: undefined
		}
	},
	computed: {
        randomId () {
            const length = 10
            let rnd = '';
            while (rnd.length < length) 
                rnd += Math.random().toString(36).substring(2);
            return rnd.substring(0, length);
        },
		isChecked() {
			return this.modelValue == this.value
		}
	}
};
</script>
<style lang="scss" scoped>
@import '../../css/variables.scss';
.custom-radio-wrap{
    margin: 6px 0;
    input{
        display: none;
    }
}
.custom-radio-label{
	font-size: 14px;
	margin-bottom: 2px;
    display: flex;
    gap: 4px;
    align-items: center;
    .rectangle{
        width: 12px;
        height: 12px;
        border-radius: 8px;
        border: solid 2px $blue-color;
        position: relative;
        &.active{
            background-color: $blue-color;
            &:after{
                content: '';
                position: absolute;
                width: 10px;
                height: 10px;
                display: block;
                border-radius: 6px;
                border: solid 1px $white-color;
            }
        }
    }
}

</style>